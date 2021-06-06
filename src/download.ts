import fs from "fs";
import path from "path";
import {QueueEntry, SftpFile} from "./interfaces";
import prettyBytes from "pretty-bytes";
import sftp from "ssh2-sftp-client";

const queue = [] as QueueEntry[];

export async function compare(sftp: sftp, source: string, destination: string, byYear: {[key: number]: string}) {
	let root = await sftp.list(source) as SftpFile[];
	console.log(root.map(x => x.name));

	root = root.filter(x => x.name.match(/\d{4}-\d{2}/));
	for (let yearMonth of root) {
		const year = yearMonth.name.split('-')[0];
		console.log('== ', yearMonth.name, year);

		const finalDestination = join(join(destination, byYear[year]), yearMonth.name);
		if (!fs.existsSync(finalDestination)) {
			fs.mkdirSync(finalDestination);
		}
		await compareOneMonth(sftp,
			join(source, yearMonth.name),
			finalDestination);
	}
}

function join(a: string, b: string) {
	return path.join(a, b).replaceAll('\\', '/');
}

async function compareOneMonth(sftp: sftp, source: string, destination: string) {
	console.log('listing', source);
	let root = await sftp.list(source) as SftpFile[];
	console.log(root.length);

	const smbFiles = await listShare(destination);
	console.log(smbFiles.length);

	const diff = root.filter(x => {
		if (!smbFiles.includes(x.name)) {
			return true;
		}
		const path = join(destination, x.name);
		return fs.statSync(path).size !== x.size;
	});
	const diffNames = diff.map(x => x.name);
	console.log({diffNames});
	if (!diffNames.length) {
		console.warn('rm ', source);
	}

	const sourceSize = root.reduce((a: number, x: SftpFile) => a + x.size, 0);
	await copyFiles(sftp, source, destination, root.length, smbFiles.length, sourceSize, diff);
}

async function copyFiles(sftp: sftp, source: string, destination: string, sourceFiles: number, destFiles: number, sourceSize: number, diff: SftpFile[]) {
	// if (!diff.length) {
	// 	return;
	// }
	queue.push({sftp, source, destination, sourceFiles, destFiles, sourceSize, files: diff});
	const qFiles = queue.reduce((a: number, x: QueueEntry) => a + x.files.length, 0);
	console.log('queue', queue.length, qFiles);
}

export async function processQueue() {
	const qFiles = queue.reduce((a: number, x: QueueEntry) => a + x.files.length, 0);
	let i = qFiles;
	for (let pack of queue) {
		console.log('==', pack.source, pack.sourceFiles, prettyBytes(pack.sourceSize));
		console.log('=>', pack.destination);
		for (let file of pack.files) {
			const source = join(pack.source, file.name);
			const destination = join(pack.destination, file.name);
			console.log(i--, file.name);
			await pack.sftp.fastGet(source, destination);
		}
	}
}

async function listShare(destination: string) {
	//return networkDrive.list()
	return await fs.readdirSync(destination);
}


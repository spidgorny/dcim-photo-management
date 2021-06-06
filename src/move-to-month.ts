import sftp from "ssh2-sftp-client";
import { join } from "./helper";
import { SftpFile } from "./interfaces";
import { dirname } from "path";

export async function moveToMonth(sftp: sftp, source: string) {
  let root = (await sftp.list(source)) as SftpFile[];
  console.log(root[0]);
  let files = root.filter((x) => x.type);
  console.log(root.map((x) => x.type + " " + x.name));

  for (let file of files) {
    if (file.type !== "-") {
      continue;
    }
  }
}

async function moveOneFiles(sftp: sftp, file: SftpFile) {
  try {
    const match = file.name.match(/(20\d\d)(\d\d)(\d\d)/); // YMD
    if (!match) {
      return;
    }
    await moveOneFile(sftp, file);
  const yearMonth = match[1] + "-" + match[2];
  const finalDestination = join(join(source, yearMonth), file.name);
  console.log(finalDestination);
  if (!root.map((x) => x.name).includes(yearMonth)) {
    const dir = dirname(finalDestination);
    console.log("mkdir", dir);
    await sftp.mkdir(dir);
    root.push({name: yearMonth} as SftpFile);
  }
  await sftp.posixRename(join(source, file.name), finalDestination);
} catch (e) {
  console.error(e);
}

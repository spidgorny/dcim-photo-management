import { config } from "./config";
import { compare, processQueue } from "./src/download";
import { moveToMonth } from "./src/move-to-month";

let Client = require("ssh2-sftp-client");
// const SambaClient = require('samba-client');
// let networkDrive = require('windows-network-drive');

async function main() {
  try {
    let client = new Client();
    for (let server of config) {
      console.log("connecting", server.sftp.host);
      await client.connect(server.sftp);
      await moveToMonth(client, server.source);
      await compare(client, server.source, server.destination.address, server.destination.paths);
      await processQueue();
      await client.end();
    }
  } catch (err) {
    console.error(err);
  }
}

main();

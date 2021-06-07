import { SambaConfig, SFTPConfig } from "./src/interfaces";

require("dotenv").config();

export const config = [
  {
    enable: false,
    sftp: {
      host: "192.168.1.112",
      port: "2222",
      username: "slawa",
      password: process.env.ONEPLUS5T_PASSWORD,
    } as SFTPConfig,
    source: "/DCIM/Camera",
    destination: {
      address: "//192.168.1.189/photo", // required
      username: "depidsvy", // not required, defaults to guest
      password: process.env.DISKSTATION_PASSWORD, // not required
      domain: "WORKGROUP", // not required
      maxProtocol: "SMB3", // not required
      maskCmd: true, // not required, defaults to false
      paths: {
        2020: "Photos/2020/Marina 5T",
        2021: "Photos/2021/Marina 5T",
      },
    } as SambaConfig,
  },
  {
    enable: true,
    sftp: {
      host: "192.168.1.18",
      port: "2222",
      username: "slawa",
      password: process.env.ONEPLUS5T_PASSWORD,
    } as SFTPConfig,
    source: "/DCIM/Camera",
    destination: {
      address: "//192.168.1.189/photo", // required
      username: "depidsvy", // not required, defaults to guest
      password: process.env.DISKSTATION_PASSWORD, // not required
      domain: "WORKGROUP", // not required
      maxProtocol: "SMB3", // not required
      maskCmd: true, // not required, defaults to false
      paths: {
        2020: "Photos/2020/SlawaOnePlusNord",
        2021: "Photos/2021/SlawaNord",
      },
    } as SambaConfig,
  },
];

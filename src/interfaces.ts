import sftp from "ssh2-sftp-client";

export interface SambaConfig {
  address: string; // required
  username: string; // not required, defaults to guest
  password: string; // not required
  domain: string; // not required
  maxProtocol: string; // not required
  maskCmd: boolean; // not required, defaults to false
  paths: {
    [key: number]: string;
  };
}

export interface SFTPConfig {
  host: string;
  port: string;
  username: string;
  password: string;
}

export interface SftpFile extends sftp.FileInfo {
  name: string;
  size: number;
  modifyTime: number;
  accessTime: number;
  rights: {
    user: string;
    group: string;
    other: string;
  };
  owner: number;
  group: number;
}

export interface QueueEntry {
  sftp: sftp;
  source: string;
  destination: string;
  sourceFiles: number;
  destFiles: number;
  sourceSize: number;
  files: SftpFile[];
}

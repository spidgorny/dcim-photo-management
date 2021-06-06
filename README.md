# Auto Organize /DCIM/Camera files into subfolders and download to local machine or server for a backup.

Before: thousands of photo files in /DCIM/Camera that are very hard to work with.

After:

![](2021-06-06 21_52_15-Clipboard.png)

## Usage:

1. Install SFTP server on Android phone(s).

2. Configure one or more Android phones IP addresses and the folder for backups in the config.ts file. You may need to put some passwords into .env file or just type them as is.

> npm run main

## What happens?

1. The app connects to each Android phone one by one and moves the files from /DCIM/Camera to subfolders corresponding to the month the photo/video was taken. For example: /DCIM/Camera/2021-01.

2. It goes into each of the year-month folders and compares the files on the SFTP and on the destination. All files that are different or missing are added to the queue.

3. It processes the queue and downloads each file (if not exist already) to the destination specified in the config.ts file.

Done. No more manual processing with Filezilla.

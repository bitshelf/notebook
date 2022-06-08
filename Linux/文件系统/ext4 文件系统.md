---
tags: linux/Filesystem
---

# ext4文件系统
## 基本结构
* 超级块
	* `df` 命令
* 超级块副本
* **i**节点（inode: index node）
	* `du` 命令
	* 用于描述文件系统对象（包括文件、目录、设备文件、socket、管道等）
	* 每个 inode 保存了文件系统对象数据的属性和磁盘块位置[1]。文件系统对象属性包含了各种元数据（如：最后修改时间[2]） ，也包含用户组（owner ）和权限数据
* 数据块（datablock）

# 文件系统的功能
* **Data storage:** The primary function of any filesystem is to be a structured place to store and retrieve data.
* **Namespace:** A naming and organizational methodology that provides rules for naming and structuring data.
* **Security model:** A scheme for defining access rights.
* **API:** System function calls to manipulate filesystem objects like directories and files.
* **Implementation:** The software to implement the above.

## 文件系统结构
-   A [**boot sector**](https://en.wikipedia.org/wiki/Boot_sector) in the first sector of the hard drive on which it is installed. The boot block includes a very small boot record and a partition table.
-   The first block in each partition is a **superblock** that contains the metadata that defines the other filesystem structures and locates them on the physical disk assigned to the partition.
-   An **inode bitmap block**, which determines which inodes are used and which are free.
-   The **inodes**, which have their own space on the disk. Each inode contains information about one file, including the locations of the data blocks, i.e., zones belonging to the file.
-   A **zone bitmap** to keep track of the used and free data zones.
-   A **data zone**, in which the data is actually stored.

# Link & References
* https://ext4.wiki.kernel.org/index.php/Ext4_Disk_Layout
* https://www.kernel.org/doc/html/v4.19/filesystems/ext4/index.html
#!/bin/bash


mkrootfs(){
	TARGET_FILE=$1
	FILE_SIZE=$2
	SOURCE_FILE=$3	

	if [ -e $TARGET_FILE  ];then
		rm -rf $TARGET_FILE
		echo "-------remove file $TARGET_FILE !--------"
	fi

	dd of=$TARGET_FILE bs=1M seek=$FILE_SIZE count=0 2>&1 || fatal "Failed to dd image!"
	mke2fs -t ext4 $TARGET_FILE

	if [ -e /tmp_ext2 ];then
		rm /tmp_ext2 -rf
		echo "---------remove dir emp_ext2!------------"
	fi
	mkdir /tmp_ext2
        echo "-------make dir tmp_ext2 for mount !-----"

	mount $TARGET_FILE /tmp_ext2

	cp -rp $SOURCE_FILE/*  /tmp_ext2

	umount /tmp_ext2

	tune2fs -c 0 -i 0 $TARGET_FILE

	echo "-------build compilete,remove tmp dir!-----"
        rm /tmp_ext2 -rf
	
}

usage(){
	echo "usage: sh mkext4.sh <target> <size> <sourcefile>"
	echo "example: sh mkext4.sh  ./rootfs.ext4 2048 ./ubuntu16.04"
}


if [ $# -eq 3 ];then
	mkrootfs $1 $2 $3
else
	usage
fi

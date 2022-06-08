#!/bin/bash

#ubuntu(ubuntu-core) build already annotation
#not Often compiled      .......too slow and need root
MAKE_THEARD=`cat /proc/cpuinfo| grep "processor"| wc -l`
RESULT="Image-rk3288-ubuntu"

function creat_result_dir()
{
	if [ ! -d $RESULT ];
		then
		{
			mkdir Image-rk3288-ubuntu
		}
	fi
}

function ubuntu_core_build() 
{
	dd if=/dev/zero of=linux-rootfs-core.img bs=1M count=1000
	sudo mkfs.ext4 -F -L linuxroot linux-rootfs-core.img
	
	if [ ! -d mount ];
		then
		{
			mkdir mount
		}
	fi
	sudo mount linux-rootfs-core.img mount
	sudo cp -a ubuntu_core/* mount
	sudo umount mount
	e2fsck -p -f linux-rootfs-core.img
	resize2fs -M linux-rootfs-core.img
	rm -rf mount
	mv linux-rootfs-core.img $RESULT
}
function ubuntu_build() 
{
	dd if=/dev/zero of=linux-rootfs.img bs=1M count=5000
	sudo mkfs.ext4 -F -L linuxroot linux-rootfs.img
	
	if [ ! -d mount ];
		then
		{
			mkdir mount
		}
	fi
	sudo mount linux-rootfs.img mount
	sudo cp -a ubuntu/* mount
	sudo umount mount
	e2fsck -p -f linux-rootfs.img
	resize2fs -M linux-rootfs.img
	rm -rf mount
	mv linux-rootfs.img $RESULT
}

function ubuntu_clean() 
{
	rm $RESULT/linux-rootfs.img
}
function ubuntu_core_clean() 
{
	rm $RESULT/linux-rootfs-core.img
}
function result_clean() 
{
	rm -rf $RESULT
}

creat_result_dir
if [ $1 == "clean" ]
	then
	{
		if [ ! -n $2 ]
			then
			{
				ubuntu_core_clean
				ubuntu_clean
				result_clean
				echo clean Img oK
			}
		elif [ $2 == "ubuntu" -o $2 == "ubuntu/" ]
			then
			{
				ubuntu_clean
			}
		elif [ $2 == "ubuntu_core" -o $2 == "ubuntu_core/" -o $2 == "ubuntu-core" -o $2 == "ubuntu-core/" ]
			then
			{
				ubuntu_core_clean
			}
		else
			{
				ubuntu_core_clean
				ubuntu_clean
				result_clean
				echo clean Img oK
			}
		fi
	}
elif [ $1 == "ubuntu_core" -o $1 == "ubuntu_core/" -o $1 == "ubuntu-core" -o $1 == "ubuntu-core/" ]
	then
	{
		ubuntu_core_build
	}
elif [ $1 == "ubuntu" -o $1 == "ubuntu/" ]
	then
	{
		ubuntu_build
	}
else
	{
		ubuntu_core_build
		ubuntu_build
	}
fi



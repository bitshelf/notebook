#!/bin/sh

read line < /proc/cmdline

for arg in $file;do 
	if [ "5" -le "$(expr length $arg)" ];then
		
		if [ "root=" "$(expr substr $arg 1 5)" ];then
			{
				*debug_arg=$(expr $arg : 'root=\(.\*\)')
				resize2fs $debug_arg
			}
		fi
	fi
done


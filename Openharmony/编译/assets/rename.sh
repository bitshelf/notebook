#!/bin/bash

for file in `fd dayu210`
do
     newFile=`echo $file | sed 's/dayu210/evb3588/'`
	 #echo $newFile
     mv $file $newFile
done

fd --type file --exec sd  'hihope' 'industio'
fd --type file --exec sd "dayu210" "evb3588"

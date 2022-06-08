#!/bin/sh
SOC=`cat /sys/kernel/debug/dri/0/state  | grep Cluster3`
if  [ "$SOC" != "" ]; then
	SOC="rk3588"
	BASE=$(printf "%u" 0xFDD90000)
else
	SOC="rk356x"
	BASE=$(printf "%u" 0xFE040000)
fi
echo $SOC $BASE
DSC=`expr $BASE + $(printf "%u" 0x200)`
OVL=`expr $BASE + $(printf "%u" 0x600)`
VP0=`expr $BASE + $(printf "%u" 0xC00)`
VP1=`expr $BASE + $(printf "%u" 0xD00)`
VP2=`expr $BASE + $(printf "%u" 0xE00)`
VP3=`expr $BASE + $(printf "%u" 0xF00)`
C0=`expr $BASE + $(printf "%u" 0x1000)`
C1=`expr $BASE + $(printf "%u" 0x1200)`
C2=`expr $BASE + $(printf "%u" 0x1400)`
C3=`expr $BASE + $(printf "%u" 0x1600)`
E0=`expr $BASE + $(printf "%u" 0x1800)`
E1=`expr $BASE + $(printf "%u" 0x1A00)`
S0=`expr $BASE + $(printf "%u" 0x1C00)`
S1=`expr $BASE + $(printf "%u" 0x1E00)`
HDR=`expr $BASE + $(printf "%u" 0x2000)`

echo "SYS:"
io -r -4 -l 0x100 $BASE
print
echo "OVL:"
io -r -4 -l 0x100 $OVL
print
echo "HDR:"
io -r -4 -l 0x40 $HDR
print

STAT=`cat /sys/kernel/debug/dri/0/state  | grep " video_port0"  -A 2 | grep "active=1"`
if [ "$1" = "a" ]; then
	STAT="ACTIVE"
fi
if  [ "$STAT" != "" ]; then
	echo "VP0:"
	io -r -4 -l 0x100 $VP0
	print
fi

STAT=`cat /sys/kernel/debug/dri/0/state  | grep " video_port1" -A 2 | grep "active=1"`
if [ "$1" = "a" ]; then
	STAT="ACTIVE"
fi
if  [ "$STAT" != "" ]; then
	echo "VP1:"
	io -r -4 -l 0x100 $VP1
	print
fi

STAT=`cat /sys/kernel/debug/dri/0/state  | grep " video_port2" -A 2 | grep "active=1"`
if [ "$1" = "a" ]; then
	STAT="ACTIVE"
fi
if  [ "$STAT" != "" ]; then
	echo "VP2:"
	io -r -4 -l 0x100 $VP2
	print
fi

STAT=`cat /sys/kernel/debug/dri/0/state  | grep " video_port3" -A 2 | grep "active=1"`
if [ "$1" = "a" ]; then
	STAT="ACTIVE"
fi
if  [ "$STAT" != "" ]; then
	echo "VP3:"
	io -r -4 -l 0x100 $VP3
	print
fi

STAT=`cat /sys/kernel/debug/dri/0/state  | grep " Cluster0-win0" -A 2 | grep "fb=[1-9]"`
if [ "$1" = "a" ]; then
	STAT="ACTIVE"
fi
if  [ "$STAT" != "" ]; then
	echo "Cluster0: "
	io -r -4 -l 0x130 $C0
	print
fi

STAT=`cat /sys/kernel/debug/dri/0/state  | grep " Cluster1-win0" -A 2 | grep "fb=[1-9]"`
if [ "$1" = "a" ]; then
	STAT="ACTIVE"
fi
if  [ "$STAT" != "" ]; then
	echo "Cluster1: "
	io -r -4 -l 0x130 $C1
	print
fi

STAT=`cat /sys/kernel/debug/dri/0/state  | grep " Cluster2-win0" -A 2 | grep "fb=[1-9]"`
if [ "$1" = "a" ]; then
	STAT="ACTIVE"
fi
if  [ "$STAT" != "" ]; then
	echo "Cluster2: "
	io -r -4 -l 0x130 $C2
	print
fi

STAT=`cat /sys/kernel/debug/dri/0/state  | grep " Cluster3-win0" -A 2 | grep "fb=[1-9]"`
if [ "$1" = "a" ]; then
	STAT="ACTIVE"
fi
if  [ "$STAT" != "" ]; then
	echo "Cluster3: "
	io -r -4 -l 0x130 $C3
	print
fi

STAT=`cat /sys/kernel/debug/dri/0/state  | grep " Esmart0-win0" -A 2 | grep "fb=[1-9]"`
if [ "$1" = "a" ]; then
	STAT="ACTIVE"
fi
if  [ "$STAT" != "" ]; then
	echo "Esmart0: "
	io -r -4 -l 0x100 $E0
	print
fi

STAT=`cat /sys/kernel/debug/dri/0/state  | grep " Esmart1-win0" -A 2 | grep "fb=[1-9]"`
if [ "$1" = "a" ]; then
	STAT="ACTIVE"
fi
if  [ "$STAT" != "" ]; then
	echo "Esmart1: "
	io -r -4 -l 0x100 $E1
	print
fi

STAT=`cat /sys/kernel/debug/dri/0/state  | grep -E " Smart0-win0| Esmart2-win0" -A 2 | grep "fb=[1-9]"`
if [ "$1" = "a" ]; then
	STAT="ACTIVE"
fi
if  [ "$STAT" != "" ]; then
	if [ "$SOC" = "rk356x" ]; then
		echo "Smart0: "
	else

		echo "Esmart2: "
	fi
	io -r -4 -l 0x100 $S0
	print
fi

STAT=`cat /sys/kernel/debug/dri/0/state  | grep -E " Smart1-win0| Esmart3-win0" -A 2 | grep "fb=[1-9]"`
if [ "$1" = "a" ]; then
	STAT="ACTIVE"
fi
if  [ "$STAT" != "" ]; then
	if [ "$SOC" = "rk356x" ]; then
		echo "Smart1: "
	else

		echo "Esmart3: "
	fi

	io -r -4 -l 0x100 $S1
	print
fi

cat /sys/kernel/debug/dri/0/summary
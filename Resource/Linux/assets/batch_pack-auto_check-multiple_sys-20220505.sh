#!/bin/bash

##
# rpdzkj batch pack image script
# EXAMPLE
# 1. pack nano-box-rk3568 of buildroot debian ubuntu: batch_pack-auto_check-multiple_sys-20220505.sh pcck_all nano-box-rk3568
# 2. pack rk356x all board:batch_pack-auto_check-multiple_sys-20220505.sh  pack_all
# 3. pack nano-box-rk3568 of buildroot system all screen: batch_pack-auto_check-multiple_sys-20220505.sh
##

function usage(){
    echo -e "======> \e[34mwellcome to batch pack script."
    echo -e "usage: ./batch.sh {usage|check(check env)|pack_all(package all board and system)|*(begin pack)}\e[0m"
    pr_info "check:     check enviroment and variable"
    pr_info "test:      try to print info of batch process, but donot real pack"
    pr_info "pack_all:  package all board and system, special, \"pack_all rp-rk3568\" mean just package all system of rp-rk3568"
}

function pr_info() {
        echo -e "========> $* <========"
}

function pr_error() {
        echo -e "======> \e[31m ERROR: $* \e[0m"
}

function test_pack(){
    echo -e "\e[34m will process pack test...\e[0m"
    rp_test_flag=1
}


function prepare_environment(){
    #############
    #init variable
    #############
    ARCH=`find device/ -name .Board* | xargs grep ARCH | sed 's/^.*=//g'`
	#PLATFORAM=`grep PLATFORM device/amlogic/common/common_config.mk | sed 's/.*=//g'`
		# echo $PLATFORAM	#debug//////
	RK_KERNEL_DTS=`find device/ -name .Board* | xargs grep dt -i | grep -v "#" | sed 's/.*=//g' | sed 's/\s*$//g'`
	#RP_BOARD=`grep RP_BOARD device/rockchip/.BoardConfig.mk | sed 's/.*=//g' | sed 's/\s*$//g'`
	RP_BOARD=$RK_KERNEL_DTS
	RP_SYSTEM=`find device/ -name .Board* | xargs grep -E "RK_TARGET_ROOTFS|RP_SYSTEM" | sed 's/^.*=//g'`
	#RP_SYSTEM=android11

		echo "RP_BOARD: $RP_BOARD"	#debug//////
		echo "RK_KERNEL_DTS: $RK_KERNEL_DTS"	#debug//////
		echo "RP_SYSTEM: $RP_SYSTEM"

	if [ "xarm64" == "x$ARCH" ];then
		DTS_PATH=kernel/arch/$ARCH/boot/dts/rockchip/		#dts path arm64
	else
		DTS_PATH=kernel/arch/$ARCH/boot/dts/			#dts path arm
	fi
	MAIN_DTS=$DTS_PATH$RK_KERNEL_DTS.dts				#main dts
		 echo "MAIN_DTS: $MAIN_DTS"	#debug//////
}

function get_lcd_dtsi_array(){
    ##
    # get all screen dtsi
    ##
	i=0
	IFS=$'\n'
	for line in `grep -r "rp-lcd" $MAIN_DTS | sed 's/\///g'`
	do
		DTSI_ARRAY[${i}]=$line
		let i=${i}+1
	done
	unset IFS

	# print lcd.dtsi
	echo -n "------------ ready build image num is "
	echo -n ${#DTSI_ARRAY[@]}
	echo " -------------"
	for ((i=0; i<${#DTSI_ARRAY[@]}; i++))
	do
		echo ${DTSI_ARRAY[$i]} #| sed 's/include/& /'
	done

    DTSI_LENGTH=${#DTSI_ARRAY[*]}				#compute length of dtsi array

	# create null line in dts
	DTS_LINE=`grep -rn "rp-lcd" $MAIN_DTS | awk 'END {print}' | cut -d ":" -f 1`
    sed -i "${DTS_LINE}a //null" $MAIN_DTS
	NULL_LINE=`expr $DTS_LINE + 1`

	sed -i '/^#include "rp-lcd/ s/^/\/\//' $MAIN_DTS
}

function check_files(){
	MyDay=`date +%Y%m%d`
	#Image_path=rockdev/update-$RP_BOARD-$RP_SYSTEM-$MyDay*.img
    if [[ "x$RP_BOARD" =~ "xandroid" ]];then
        MY_BOARD=${RK_KERNEL_DTS#*-}
        Image_path=rockdev/Image-${MY_BOARD}_r/update-*$MyDay*.img
    else
        Image_path=rockdev/update-*$MyDay*.img
    fi
		echo "Image_path: $Image_path"	#debug//////

    ######
    #verify eviroment
    ######
	ls ${Image_path} > /dev/null 2>&1 && \
        echo -e "\n\t\e[31m====>exist image of today, please check whether you want!\e[0m" && \
        ls ${Image_path} && \
        exit -5


	if [ ! -e $MAIN_DTS ];then
		echo -e "\n\t\e[31m====>verify dtsi :$MAIN_DTS error, please check board type!\n\e[0m"
		exit -1
	else
		echo -e "\n\t====> now, board is $RP_BOARD\n"
		[ ${NULL_LINE} ] && sed -i -e "${NULL_LINE}c //null" ${MAIN_DTS} && \
            grep  "^#inclu.*rp-lcd-[^h]" ${MAIN_DTS} && echo -e "\n\t\e[31m====>main dts have lcd config, please check main dts\n\e[0m" && exit -2		#check whether have include screen dtsi
	fi

    return 0    #must need, if "grep" above find nothing, will return non-zero
}

function batch_main(){
    ##########
    #batch pack
    ##########
    for((i=0;i<$DTSI_LENGTH;i++));
    do
        #######check dtsi whether exit
        SCREEN_DTS==${DTSI_ARRAY[$i]}
        SCREEN_DTS=${SCREEN_DTS#*clude \"} && SCREEN_DTS=${SCREEN_DTS%\"*} && SCREEN_DTS=$DTS_PATH$SCREEN_DTS
        echo "SCREEN_DTS； $SCREEN_DTS"
        if [ -e $SCREEN_DTS ];then
            echo -e "\n\t\e[32m====> now, board and dtsi is ***$RP_BOARD: ${SCREEN_DTS}***\n\e[0m"
                #sed -i -e "${NULL_LINE}s/.*$/${DTSI_ARRAY[$i]}/" ${MAIN_DTS}		#modify main dts!!!!!!
                sed -i -e "${NULL_LINE}c ${DTSI_ARRAY[$i]}" ${MAIN_DTS}		#modify dts by line change
            else
                echo -e "\n\t\e[31m====> no that dts： $SCREEN_DTS\n\e[0m"
                exit -3
        fi

        [ $rp_test_flag ] || ./build.sh		#######main compile script, must need!!!!!!!!!!!!!

        if [ $? -ne 0 ];then
            echo -e "\n\t\e[31m====> build.sh fail!\n\e[0m"
            exit -4
        else
            if [ ! -d image_back ];then
                mkdir image_back
            fi
            boardName=$RP_BOARD		#...${RP_BOARD#*-}
            screen=${DTSI_ARRAY[$i]}
            screen=${screen#*cd-} && screen=${screen%.*}
            mytime=`date +%Y%m%d-%H%M%S`
                echo $boardName-$RP_SYSTEM-$screen-$mytime	#debug //////
            [ $rp_test_flag ] || mv $Image_path image_back/update-$boardName-$RP_SYSTEM-$screen-$mytime.img	#backup image, need!!!!!!!!
            if [ $? != 0 ];then
                echo -e "\n\t\e[31mmove image fail\e[0m"
                exit -1
            fi
        fi
    done
    echo -e "\n\t\e[32m*o* batch pack finished!\e[0m"
    sed -i -e "${NULL_LINE}d" ${MAIN_DTS}	# pack finished, remove null line
    unset DTSI_ARRAY 	# clean lcd array
}

function pack_all_board() {
    pr_info "Begin pack all! and board want: $1"
    for rp_board in `find device/rockchip/${RP_TARGET_PRODUCT}/*.mk  | grep -v 'multi' | grep "$1"`; do
        ln -sf ${RP_TOP_DIR}/${rp_board} ${RP_TARGET_BOARD}

        prepare_environment
        get_lcd_dtsi_array
        check_files
        batch_main

        [ $? -ne 0 ] && pr_error "Fail to package all board/system!" && exit -1

        pr_info "Package all board/system finished!"

    done
}

RP_TOP_DIR=$(pwd)
RP_TARGET_BOARD=$(find device/ -name .Board*)
RP_TARGET_PRODUCT=$(find device/ -name .Board* | xargs grep RK_TARGET_PRODUCT | sed 's/^.*=//g')

echo -e "\e[34mEXAMPLE\e[0m"
echo -e "\e[31m- pack nano-box-rk3568 of buildroot debian ubuntu:\e[0m"
echo -e "\t\e[32m ./batch_pack-auto_check-multiple_sys-20220505.sh pcck_all nano-box-rk3568 \e[0m"
echo -e "\e[31m- pack rk356x all board of all screen:\e[0m"
echo -e "\t\e[32m ./batch_pack-auto_check-multiple_sys-20220505.sh  pack_all \e[0m"
echo -e "\e[31m- pack sigle board nano-box-rk3568 of buildroot system all screen:\e[0m"
echo -e "\t\e[32m ./batch_pack-auto_check-multiple_sys-20220505.sh \e[0m"

pr_info "RP_TOP_DIR: $RP_TOP_DIR"
pr_info "RP_TARGET_BOARD: $RP_TARGET_BOARD"
pr_info "RP_TARGET_PRODUCT: $RP_TARGET_PRODUCT"

rp_par=$@
echo -e "\n\e[34m======> par: $rp_par\e[0m"

# if [ "x$1" != "xpack_all" ]; then
# if [ `echo "$rp_par" | grep -q "pack_all"` ]; then
    # pr_info "Has pack_all!"
# else
    # ./build.sh init		#init board type
# fi
echo "$rp_par" | egrep -q "usage|pack_all" || ./build.sh init

for RP_OPTION in ${rp_par}; do
    case $RP_OPTION in
        usage)
            usage
            ;;
        check)
            echo -e "\n\e[34mcheck process...\e[0m"
            prepare_environment
            check_files
            ;;
        pack_all)
            pack_all_board $2
            exit $?
            ;;
        "test")
            test_pack
            shift 1
            ;&
        *)                      # package ona board and system, deceide
            prepare_environment
            get_lcd_dtsi_array
            check_files
            batch_main
            ;;
    esac
done

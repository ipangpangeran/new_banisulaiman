#!/bin/bash

#######################################
# Bash script to install SmartRepair system.

#######################################

#COLORS
# Reset
Color_Off='\033[0m'       # Text Reset

# Regular Colors
Red='\033[0;31m'          # Red
Green='\033[0;32m'        # Green
Yellow='\033[0;33m'       # Yellow
Purple='\033[0;35m'       # Purple
Cyan='\033[0;36m'         # Cyan

#Location of the script
COMMAND_DIR=$(dirname ${0});
#Name of script
SCRIPT_NAME=$(basename ${0});
# LOG_FILE
LOG_FILE="${COMMAND_DIR}/${SCRIPT_NAME}.log";
COMMAND_NAME=`basename $0`;

SCRIPT_PID_FILE="$COMMAND_DIR/$COMMAND_NAME.pid"
trap "rm -f $SCRIPT_PID_FILE" SIGSEGV
trap "rm -f $SCRIPT_PID_FILE" SIGINT

NUM_ARGS=1
PUBLIC_IP=$1
DIR_CONF="/etc/apache2/mods-enabled/dir.conf"
DIR_INDEX="DirectoryIndex index.php index.html index.cgi index.pl index.xhtml index.htm"
MPM_WORKER_CONF_TEMP="${COMMAND_DIR}/conf/mpm_worker.conf"
MPM_WORKER_CONF="/etc/apache2/mods-available/mpm_worker.conf"
APACHE_CONF="/etc/apache2/apache2.conf"
SERVER_NAME="ServerName $PUBLIC_IP"
PHP_MODULE="php libapache2-mod-php php-mcrypt php-mysql"
SR_LOCAL="${COMMAND_DIR}/smartrepairweb"
WWW_PATH="/var/www"
SR_SERVER="${WWW_PATH}/mobile_shop"
BRANCH_NAME="master"
GIT_HUB_URL="https://github.com/smartrepair2018/smartrepairweb.git"
#  Prints usage to the screen
print_usage() {
    echo -e "Usage: $COMMAND_NAME PUBLIC_IP\n";
    exit -1;
}

if [ "$#" -lt $NUM_ARGS ]; then
    echo "Illegal number of parameters, Number of Arguments : " $#
    print_usage
fi

print_error(){
    echo -e "$(date +'%F %T'): ${SCRIPT_NAME}: ERROR: ${*} \n";
    echo -n -e "$(date +'%F %T'): ${SCRIPT_NAME}: ERROR: ${*} \n" >> ${LOG_FILE};
}

print_info(){
    echo -e "$(date +'%F %T'): ${SCRIPT_NAME}: INFO: ${*} \n";
    echo -n -e "$(date +'%F %T'): ${SCRIPT_NAME}: INFO: ${*} \n" >> ${LOG_FILE};
}

#Check the user type, run script as root

## Install apache
echo -e "$Cyan \n Installing Apache2 $Color_Off"
print_info " Installing Apache2"
sudo apt-get install apache2 -y

##Update apache with pulic IP
echo -e "$Cyan \n Updating apache with pulic IP $Color_Off"
print_info " Updating apache with pulic IP : $PUBLIC_IP"
sed -i -e "s/ServerName.*/$SERVER_NAME/" $APACHE_CONF

## update dir.conf
print_info " Updating $DIR_CONF"
sed -i -e "s/DirectoryIndex.*/$DIR_INDEX/" $DIR_CONF

#Replace mpm_worker.conf
print_info " Replacing $MPM_WORKER_CONF with $MPM_WORKER_CONF_TEMP"
mv $MPM_WORKER_CONF_TEMP $MPM_WORKER_CONF

## Check config
echo -e "$Cyan \n Check config apache2 $Color_Off"
print_info " Checking config apache2"
sudo apache2ctl configtest -y

echo -e "$Cyan \n Installing PHP module $Color_Off"
print_info " Installing PHP module : $PHP_MODULE"
sudo apt-get install $PHP_MODULE -y

# Permission settings
print_info " Setting Permissions"
echo -e "$Cyan \n Permissions for $WWW_PATH $Color_Off"
sudo chown -R root:root $WWW_PATH
echo -e "$Green \n Permissions have been set $Color_Off"

# Enabling Mod Rewrite
echo -e "$Cyan \n Enabling Modules $Color_Off"
print_info " Enabling Modules  Mod Rewrite"
sudo a2enmod rewrite
sudo php5enmod mcrypt

#Place the code in directory
print_info " Cloning code from GitHub : $GIT_HUB_URL"
sudo git clone $GIT_HUB_URL
cd $SR_LOCAL
print_info "Setting branch to $BRANCH_NAME"
sudo git checkout $BRANCH_NAME

print_info " Placing SR into directory : $SR_SERVER"
sudo cp -rf * $SR_SERVER/.
cd -

# Restart Apache
echo -e "$Cyan \n Restarting Apache $Color_Off"

print_info " Restarting Apache"
sudo service apache2 restart
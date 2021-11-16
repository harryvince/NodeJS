#!/bin/bash

# Getting File Directory
location=$(pwd)

IpNetworkEnvVariables() {
    echo "Setting Network Environment Variables..."
    IFS=' '
    address=$(cat settings.yml | grep 'Static IP')
    gateway=$(cat settings.yml | grep 'Gateway')
    read -a strarr <<< "$address"
    read -a strarr1 <<< "$gateway"
    address=${strarr[2]}
    gateway=${strarr1[1]}
    # Exporting Environment Variables
    export ADDRESS=$address
    export GATEWAY=$gateway
    echo "Set the Network Environment Variables."
}

SetStaticIP() {
    echo "Configuring Static IP for the Instance..."
    rm -r -f /etc/netplan
    mkdir /etc/netplan
    echo "# This file is generated from information provided by the datasource.  Changes
# to it will not persist across an instance reboot.  To disable cloud-init's
# network configuration capabilities, write a file
# /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg with the following:
# network: {config: disabled}
network:
    ethernets:
        eth0:
            dhcp4: no
            addresses:
                - $ADDRESS/24
            gateway4: $GATEWAY
            nameservers:
                addresses: [8.8.8.8, 1.1.1.1]
    version: 2
    " > /etc/netplan/50-cloud-init.yaml
    echo "network: {config: disabled}" > /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg
    netplan apply
    echo "Configured Static IP."
}

InstallDependencies() {
    echo "Installing System Updates..."
    apt update -y
    echo "Installed System Updates."
    echo "Installing Node..."
    apt install nodejs -y
    echo "Installed Node."
    echo "Installing NPM..."
    apt install npm -y
    echo "Installed NPM."
    echo "Installing Nginx..."
    apt install nginx -y
    echo "Installed Nginx."
    echo "Configuring Nginx..."
    systemctlctl enable nginx
    echo "server {
        listen 0.0.0.0:80;
        server_name localhost;

        location / {
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_set_header X-NginX-Proxy true;

                proxy_pass http://localhost:8000/;
                proxy_redirect off;
        }

        location /about {
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_set_header X-NginX-Proxy true;

                proxy_pass http://localhost:8000/about;
                proxy_redirect off;
        }

        location /holidays {
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_set_header X-NginX-Proxy true;

                proxy_pass http://localhost:8000/holidays;
                proxy_redirect off;
        }
}"
    echo "Configured Nginx."
    echo "Installing SSH..."
    apt install openssh-server
    systemctl enable ssh
    echo "Installed SSH."
}

ConfigureCrontab() {
    echo "Adding Start Process to Crontab..."
    apt install crontab -y
    crontab -l > file; echo "@reboot $location/config/server/StartServer.sh" >> file; crontab file; rm file
    echo "Process Added to Crontab."
}

InstallNodeModules() {
    echo "Installing Node Modules..."
    cd $location/src
    npm install
    echo "Node Modules Installed."
}

echo "Starting Script"
IpNetworkEnvVariables
SetStaticIP
InstallDependencies
ConfigureCrontab
InstallNodeModules
echo "Script Ended."
echo "Rebooting..."
reboot
#!/bin/bash

# Getting File Directory
cd ../..
location=$(pwd)

InstallDependencies() {
    echo "Installing System Updates..."
    apt update -y
    apt upgrade -y
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
    systemctl enable nginx
    echo "server {
        listen 0.0.0.0:80;
        server_name localhost;

        location / {
                proxy_set_header X-Real-IP \$remote_addr;
                proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
                proxy_set_header Host \$http_host;
                proxy_set_header X-NginX-Proxy true;

                proxy_pass http://localhost:8000/;
                proxy_redirect off;
        }

        location /about {
                proxy_set_header X-Real-IP \$remote_addr;
                proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
                proxy_set_header Host \$http_host;
                proxy_set_header X-NginX-Proxy true;

                proxy_pass http://localhost:8000/about;
                proxy_redirect off;
        }

        location /holidays {
                proxy_set_header X-Real-IP \$remote_addr;
                proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
                proxy_set_header Host \$http_host;
                proxy_set_header X-NginX-Proxy true;

                proxy_pass http://localhost:8000/holidays;
                proxy_redirect off;
        }
}" > /etc/nginx/sites-enabled/default
    echo "Configured Nginx."
    echo "Installing SSH..."
    systemctl enable ssh
    echo "Installed SSH."
    echo "Installing & Configuring MongoDB..."
    wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
    apt-get update
    apt-get install -y mongodb-org
    sudo systemctl enable mongod
    echo "Installed & Configured MongoDB."
}

ConfigureNodeServer() {
    echo "Adding Server to Services..."
    addgroup webserver
    adduser ubuntu webserver
    echo "[Unit]
Description= Node Web Server

[Install]
WantedBy=multi-user.target

[Service]
ExecStart=/bin/bash $location/config/server/StartServer.sh
Type=simple
User=ubuntu
Group=webserver
WorkingDirectory=$location
Restart=on-failure" > /etc/systemd/system/webserver.service
    chmod 755 /etc/systemd/system/webserver.service
    systemctl daemon-reload
    systemctl enable webserver.service
}

InstallNodeModules() {
    echo "Installing Node Modules..."
    cd $location/src
    npm install
    echo "Node Modules Installed."
}

allowScripts(){
  echo "Making All Scripts Executable..."
  chmod +x $location/config/server/StartServer.sh
  chmod +x $location/config/server/UpdateServer.sh
}

echo "Starting Script"
InstallDependencies
ConfigureNodeServer
InstallNodeModules
allowScripts
echo "Script Ended."
echo "Rebooting..."
reboot

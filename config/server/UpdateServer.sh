#!/bin/bash
echo "Stopping Server..."
systemctl stop webserver.service
systemctl stop nginx.service
echo "Stopped Server."
cd ../..
location=$(pwd)
cd $location/src
echo "Updating Web Repository"
git pull
echo "Updated."
echo "Checking & Installing new Dependencies"
npm install
echo "Checked & Installed."
echo "Intializing Server..."
systemctl start webserver.service
systemctl start nginx.service
echo "Intialized."

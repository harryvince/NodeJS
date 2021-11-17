#!/bin/bash
echo "Killing Process..."
kill -9 `cat ../log/pid.txt`
echo "Killed Process."
rm -f ../log/pid.txt
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
nohup node index.js > $location/config/log/log.txt 2>&1 &
echo "Intialized."
cd $location/config/log
echo $! > pid.txt

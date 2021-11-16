#!/bin/bash
echo "Starting Server..."
cd ../..
location=$(pwd)
cd $location/src
nohup node index.js > $location/config/log/serverlog.log 2>&1 &
echo $! > /home/webserver/update/pid.txt
echo "Server Started."
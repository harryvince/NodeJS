#!/bin/bash
echo "Starting Server..."
cd ../..
location=$(pwd)
cd $location/src
nohup node index.js > $location/config/log/serverlog.log 2>&1 &
echo $! > $location/config/log/pid.txt
echo "Server Started."
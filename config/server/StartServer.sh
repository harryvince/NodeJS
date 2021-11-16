#!/bin/bash
echo "Starting Server..."
cd ../..
location=$(pwd)
nohup node $location/src/index.js > $location/config/log/serverlog.log 2>&1 &
echo $! > $location/config/log/pid.txt
echo "Server Started."

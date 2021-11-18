#!/bin/bash
echo "Starting Server..."
location=$(find / -type d -name 'NodeJS')
node $location/src/index.js
echo "Server Started."

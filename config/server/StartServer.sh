#!/bin/bash
echo "Starting Server..."
location=$(find / -type f -name 'StartServer.sh')
node $location
echo "Server Started."

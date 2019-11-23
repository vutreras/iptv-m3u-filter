#!/usr/bin/env bash

export SERVER_PORT=3002
if [ "$1" != "" ];then
  SERVER_PORT=$1
fi
echo "SERVER_PORT: $SERVER_PORT"

export PROFILE="local"
if [ "$2" != "" ];then
  PROFILE=$2
fi
echo "PROFILE: $PROFILE"

npm run server

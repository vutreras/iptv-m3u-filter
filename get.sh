#!/usr/bin/env bash

URL="http://localhost:3002/filter?inc=$1&exc=$2&url=$3"

echo $URL

curl $URL -o file.m3u


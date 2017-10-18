#!/usr/bin/env bash

STARTING_DIR=$(pwd)

cd $2/$1

echo whereami: `pwd`

cp package.json dist/package.json

cd dist && npm

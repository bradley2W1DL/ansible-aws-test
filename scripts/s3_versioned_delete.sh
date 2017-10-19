#!/usr/bin/env bash

#
# script pulled from https://gist.github.com/weavenet/f40b09847ac17dd99d16
#

bucket=$1

set -e

versions=$( aws s3api list-object-versions --bucket $bucket | jq '.Versions' )
markers=$( aws s3api list-object-versions --bucket $bucket | jq '.DeleteMarkers' )

let "count=`echo $versions | jq 'length'`-1"

if [ $count -gt -1 ]; then
    echo "removing files"
    for i in $(seq 0 $count); do
        key=$(echo $versions | jq .[$i].Key |sed -e 's/\"//g')
        versionId=$(echo $versions | jq .[$i].VersionId |sed -e 's/\"//g')
        cmd="aws s3api delete-object --bucket $bucket --key $key --version-id $versionId"
        echo $cmd
        $cmd
    done
fi

let "count=`echo $markers |jq 'length'` - 1"

if [ $count -gt -1 ]; then
    for i in $(seq 0 $count); do
        key=`echo $markers | jq .[$i].Key |sed -e 's/\"//g'`
        versionId=`echo $markers | jq .[$i].VersionId |sed -e 's/\"//g'`
        cmd="aws s3api delete-object --bucket $bucket --key $key --version-id $versionId"
        echo $cmd
        $cmd
    done
fi

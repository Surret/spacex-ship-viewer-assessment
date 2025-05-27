#!/usr/bin/env bash
# https://stackoverflow.com/a/58490732/723108
set -x
awslocal s3 mb s3://spacex-upload-dev
set +x

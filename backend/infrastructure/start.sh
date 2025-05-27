#!/bin/bash

docker compose -p spacex -f common.yml up --build --remove-orphans 

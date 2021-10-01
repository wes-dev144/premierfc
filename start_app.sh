#!/bin/bash
BASE_DIR=$(git rev-parse --show-toplevel)

cd ${BASE_DIR}/Client
npx react-native run-android &
npx react-native start

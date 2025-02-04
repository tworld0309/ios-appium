#!/bin/bash

echo "🔹 Node.js 18 환경 적용 중..."
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use 18

echo "🔹 Appium 테스트 실행 중..."
cd "$(dirname "$0")"  # 현재 스크립트가 위치한 디렉터리로 이동

echo "📌 IP_APP: $IP_APP"
echo "📌 IP_PLATFORM: $IP_PLATFORM"
echo "📌 IP_DEVICE_NAME: $IP_DEVICE_NAME"
echo "📌 IP_OS_NAME: $IP_OS_NAME"

node test-gitlab-runner.js --platform "$IP_PLATFORM" --device "$IP_DEVICE_NAME" --app "$IP_APP" --os "$IP_OS_NAME"
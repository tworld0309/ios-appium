#!/bin/bash

echo "🔹 Node.js 18 환경 적용 중..."
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use 18

echo "🔹 Appium 테스트 실행 중..."
node appium-test.js
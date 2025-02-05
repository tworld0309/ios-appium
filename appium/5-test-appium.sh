#!/bin/bash

echo "🔹 Node.js 18 환경 적용 중..."
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use 18

echo "🔹 Appium 테스트 실행 중..."
cd "$(dirname "$0")"  # 현재 스크립트가 위치한 디렉터리로 이동
node test-runner.js 2>&1 | tee results.log
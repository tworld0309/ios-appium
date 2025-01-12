#!/bin/bash

set -e  # 오류 발생 시 즉시 종료

echo "===== nvm 설치 확인 및 설정 ====="
if ! command -v nvm &> /dev/null; then
  echo "nvm이 설치되어 있지 않습니다. 설치를 진행합니다..."
  brew install nvm
  export NVM_DIR="$HOME/.nvm"
  [ -s "$(brew --prefix nvm)/nvm.sh" ] && \. "$(brew --prefix nvm)/nvm.sh"
else
  echo "nvm이 이미 설치되어 있습니다."
fi

echo "===== Node.js 22.12.0 설치 및 활성화 ====="
nvm install 22.12.0
nvm use 22.12.0

echo "===== Appium 및 WebdriverIO 설치 ====="
sudo npm install -g appium
npm install webdriverio @wdio/appium-service @wdio/mocha-framework

echo "===== Appium Driver 설치 확인 ====="
#if ! appium driver list --installed --json | jq -e '.drivers | has("xcuitest")'; then
if ! appium driver list --installed --json | grep xcuitest ; then
  echo "XCUITest 드라이버가 설치되어 있지 않습니다. 설치를 진행합니다..."
  appium driver install xcuitest
else
  echo "XCUITest 드라이버가 이미 설치되어 있습니다."
fi

echo "===== Xcode Command Line Tools 설치 ====="
if ! xcode-select --print-path &> /dev/null; then
  xcode-select --install
else
  echo "Xcode Command Line Tools가 이미 설치되어 있습니다."
fi

echo "===== Xcode 라이선스 동의 ====="
sudo xcodebuild -license accept

echo "===== iOS 관련 도구 설치 ====="
brew install carthage ios-deploy libimobiledevice cocoapods

echo "===== iOS 시뮬레이터 디바이스 확인 ====="
if ! xcrun simctl list devices | grep -q "Booted"; then
  echo "iOS 시뮬레이터가 실행 중이지 않습니다. Xcode에서 시뮬레이터를 실행하고 다시 시도하세요."
  exit 1
else
  echo "iOS 시뮬레이터가 실행 중입니다."
fi

echo "===== Appium 서버 실행 ====="
appium &> appium.log &
APPIUM_PID=$!  # Appium 서버 프로세스 ID 저장

echo "===== 5초 대기 후 테스트 시작 ====="
sleep 5  # Appium 서버가 완전히 시작될 때까지 대기

echo "===== Appium 테스트 실행 ====="
node appium-test.js

echo "===== 테스트 완료, Appium 서버 종료 ====="
kill $APPIUM_PID
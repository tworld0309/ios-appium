#!/bin/bash

DEVICE_NAME=${1:-"iPhone 16 Pro"}  # 첫 번째 파라미터로 디바이스 이름을 받고, 없으면 기본값은 "iPhone 14"
APP_PATH=${2:-"/Users/totohyojuntak/Library/Developer/Xcode/DerivedData/CounterApp-fqmaeslnbhwyflgnlmccxezzwapo/Build/Products/Debug-iphonesimulator/CounterApp.app"}
  # 첫 번째 파라미터로 디바이스 이름을 받고, 없으면 기본값은 "iPhone 14"
TESTING_FILE=${3:-"appium-test.js"}
OS_VER=${4:-"18.2"}

set -e  # 오류 발생 시 즉시 종료

echo "===== nvm 설치 확인 및 설정 ====="
if ! command -v nvm --version --json &> /dev/null; then
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


echo "===== iOS 시뮬레이터 디바이스 확인 및 자동 실행 ====="
if ! xcrun simctl list devices | grep -q "Booted"; then
  echo "iOS 시뮬레이터가 실행 중이지 않습니다. 시뮬레이터를 자동으로 실행합니다..."
  
  # 실행할 시뮬레이터 선택 (디바이스 이름과 OS 버전으로 필터링)
  DEVICE_ID=$(xcrun simctl list devices | grep -A10 "iOS $OS_VER" | grep "$DEVICE_NAME" | awk -F'[()]' '{print $2}' | head -n 1)
  
  if [ -z "$DEVICE_ID" ]; then
    echo "실행 가능한 시뮬레이터가 없습니다. Xcode에서 시뮬레이터를 설정하세요."
  fi
  echo "$OS_VER" "$DEVICE_NAME"
  echo "시뮬레이터를 시작합니다: $DEVICE_NAME (iOS $OS_VER, $DEVICE_ID)"
  xcrun simctl boot "$DEVICE_ID"
  open -a Simulator
  sleep 30  # 시뮬레이터가 완전히 부팅될 때까지 대기
else
  echo "iOS 시뮬레이터가 실행 중입니다."
fi

echo "===== Appium 서버 실행 ====="
appium &> appium.log &
APPIUM_PID=$!  # Appium 서버 프로세스 ID 저장

echo "===== 5초 대기 후 테스트 시작 ====="
sleep 5  # Appium 서버가 완전히 시작될 때까지 대기

echo "===== Appium 테스트 실행 ====="
node "$TESTING_FILE" "$APP_PATH" "$OS_VER" "$DEVICE_NAME"

echo "===== 테스트 완료, Appium 서버 종료 ====="
kill $APPIUM_PID

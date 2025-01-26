#!/bin/bash

echo "🔹 Appium 및 필수 도구 설치 시작..."

# Homebrew 및 Node.js 설치
if ! command -v brew &>/dev/null; then
    echo "🔹 Homebrew 설치 중..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

echo "🔹 Node.js 및 Appium 설치"
brew install node
npm install -g appium
npm install -g appium-doctor
npm install -g appium-xcuitest-driver
npm install dotenv

# Xcode Command Line Tools 확인
echo "🔹 Xcode Command Line Tools 확인"
xcode-select --install || echo "Xcode Command Line Tools가 이미 설치됨"

echo "✅ Appium 설치 완료! 환경을 확인하려면 'appium-doctor'를 실행하세요."
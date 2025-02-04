#!/bin/bash

# 스크립트 실행 중 오류가 발생하면 즉시 종료
set -e

echo "===== Appium 설치 시작 ====="

# 1. Node.js와 npm 설치 확인
if ! command -v node &> /dev/null; then
  echo "Node.js가 설치되어 있지 않습니다. 설치를 진행합니다..."
  brew install node
else
  echo "Node.js가 이미 설치되어 있습니다."
fi

# 2. Appium 설치
echo "Appium을 설치합니다..."
npm install -g appium

# 3. Appium-doctor 설치 (iOS/Android 환경 확인 도구)
echo "Appium-doctor를 설치합니다..."
npm install -g appium-doctor

# 4. iOS 환경 준비
echo "iOS 환경을 설정합니다..."
brew install carthage  # iOS 프로젝트 의존성 관리 도구
brew install libimobiledevice  # iOS 디바이스 연결 관리 도구
brew install ios-deploy  # iOS 앱을 디바이스에 배포하는 도구
brew install cocoapods  # iOS 의존성 관리 도구

# 5. Appium-doctor로 환경 검사
echo "Appium-doctor로 환경을 검사합니다..."
appium-doctor --ios

echo "===== Appium 설치 완료 ====="
echo "iOS 환경이 올바르게 구성되었는지 확인하려면 위의 Appium-doctor 결과를 확인하세요."
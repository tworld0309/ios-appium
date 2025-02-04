#!/bin/bash

echo "🔹 iOS 시뮬레이터 실행 시작..."

DEVICE="iPhone 16 Pro"
IOS_VERSION="18.2"

# iOS 18.2 섹션에서 iPhone 16 Pro의 UUID 추출
DEVICE_UUID=$(xcrun simctl list devices | sed -n "/-- iOS $IOS_VERSION --/,/-- iOS /p" | grep "$DEVICE" | awk -F '[()]' '{print $2}' | head -n 1)

# UUID 확인
if [ -z "$DEVICE_UUID" ]; then
    echo "❌ iOS $IOS_VERSION의 $DEVICE UUID를 찾을 수 없습니다."
    echo "🔹 사용 가능한 시뮬레이터 목록:"
    xcrun simctl list devices
    exit 1
fi

echo "🔹 선택된 디바이스: $DEVICE ($IOS_VERSION) - UUID: $DEVICE_UUID"

# 기존 시뮬레이터 종료 및 초기화
echo "🔹 기존 시뮬레이터 종료 및 초기화"
xcrun simctl shutdown all
xcrun simctl erase all

# 선택한 디바이스 부팅
echo "🔹 $DEVICE ($IOS_VERSION) 시뮬레이터 부팅 중..."
xcrun simctl boot "$DEVICE_UUID"

# 시뮬레이터 UI 강제 실행 (중요)
echo "🔹 시뮬레이터 앱 실행 중..."
open -a Simulator

echo "✅ iOS 시뮬레이터 실행 완료!"
#!/bin/bash

if [ -f "appium.pid" ]; then
    APP_PID=$(cat appium.pid)
    echo "🔹 Appium 서버 종료 중... (PID: $APP_PID)"
    kill $APP_PID && rm appium.pid
    echo "✅ Appium 서버 종료 완료!"
else
    echo "❌ 실행 중인 Appium 서버를 찾을 수 없습니다."
fi

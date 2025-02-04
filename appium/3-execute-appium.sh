#!/bin/bash

echo "🔹 Appium 서버 실행 중..."
appium --address 127.0.0.1 --port 4723 & echo $! > appium.pid

echo "✅ Appium 서버가 백그라운드에서 실행 중! (PID: $(cat appium.pid))"
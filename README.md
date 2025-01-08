//
//  README.md
//  CounterApp
//
//  Created by Toto Hyojun Tak on 1/8/25.
//

# Local 환경에서 ios(SwiftUI) - Appium 실행하기

appium 관련 라이브러리 설치
npm install webdriverio


appium 서버 띄우기
npm install -g appium-xcuitest-driver
appium --default-capabilities '{"platformName": "iOS"}'
// 기본 capabilites 지정은 필수는 아님

appium
sudo xcode-select --switch /Applications/Xcode.app


appium test 실행하기
node appium-test.js


참고) 테스트 가능한 디바이스, OS 있는지 확인
xcrun simctl list device


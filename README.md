//
// README.md
// CounterApp
//
// Created by Toto on 1/8/25.
//

# Local 환경에서 iOS(SwiftUI) - Appium 실행하기

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


주의) appium-test.js 파일에 app 의 파일 위치는 변경 필요



# Fastlane을 로컬 환경에서 구성하는 방법

## 로컬에서 Fastlane을 구성하여 앱 빌드, 테스트, 배포를 자동화할 수 있습니다. 아래는 iOS와 Android 앱 각각에 대한 기본 설정 및 실행 방법입니다.

```
sudo gem install fastlane
bundle init
bundle add fastlane
bundle exec fastlane --version

fastlane init
```

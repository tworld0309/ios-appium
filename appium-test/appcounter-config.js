require("dotenv").config(); // .env 파일을 로드할 경우 사용

module.exports = {
  APPIUM_HOST: process.env.APPIUM_HOST || "127.0.0.1",
  APPIUM_PORT: process.env.APPIUM_PORT || 4723,

  PLATFORM_NAME: process.env.PLATFORM_NAME || "iOS",
  PLATFORM_VERSION: process.env.PLATFORM_VERSION || "18.2",
  DEVICE_NAME: process.env.DEVICE_NAME || "iPhone 16 Pro",
  APP_PATH:
    process.env.APP_PATH || "/Users/hyojuntak/dev/test/ios-appium/build/CounterApp.xcarchive/Products/Applications/CounterApp.app",
    //"/Users/totohyojuntak/Library/Developer/Xcode/DerivedData/CounterApp-fqmaeslnbhwyflgnlmccxezzwapo/Build/Products/Debug-iphonesimulator/CounterApp.app",

  AUTOMATION_NAME: process.env.AUTOMATION_NAME || "XCUITest",
  MAX_RETRIES: process.env.MAX_RETRIES || 2,
};

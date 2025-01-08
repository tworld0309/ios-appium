const { remote } = require('webdriverio');

let driver;

(async () => {
  driver = await remote({
    path: '/',
    port: 4723,
    capabilities: {
      platformName: 'iOS',
      'appium:platformVersion': '18.2', // iOS 버전
      'appium:deviceName': 'iPhone 16 Pro', // 시뮬레이터 이름
      'appium:app': '/Users/totohyojuntak/Library/Developer/Xcode/DerivedData/CounterApp-fqmaeslnbhwyflgnlmccxezzwapo/Build/Products/Debug-iphonesimulator/CounterApp.app', // .app 파일 경로
      'appium:automationName': 'XCUITest'
    }
  });

  // Counter 초기 상태 확인
  const counterLabel = await driver.$('~CounterLabel');
  console.log(await counterLabel.getText()); // "Counter: 0"

  // Increment 버튼 클릭
  const incrementButton = await driver.$('~Increment');
  await incrementButton.click();

  // Counter 값 확인
  console.log(await counterLabel.getText()); // "Counter: 1"

  // Decrement 버튼 클릭
  const decrementButton = await driver.$('~Decrement');
  await decrementButton.click();
  console.log(await counterLabel.getText()); // "Counter: 0"

  await driver.deleteSession();
})();

const { remote } = require("webdriverio");
const fs = require("fs");

(async () => {
  const scenarios = [
    {
      name: "Increment Button Test",
      action: async (driver) => {
        const incrementButton = await driver.$("~Increment");
        await incrementButton.click();
        const counterLabel = await driver.$("~CounterLabel");
        const counterText = await counterLabel.getText();
        return { actual: counterText, expected: "1" };
      },
    },
    {
      name: "Decrement Button Test",
      action: async (driver) => {
        const decrementButton = await driver.$("~Decrement");
        await decrementButton.click();
        const counterLabel = await driver.$("~CounterLabel");
        const counterText = await counterLabel.getText();
        return { actual: counterText, expected: "-1" };
      },
    },
    {
      name: "Initial Button Test",
      action: async (driver) => {
        const initialButton = await driver.$("~Initial");
        await initialButton.click();
        const counterLabel = await driver.$("~CounterLabel");
        const counterText = await counterLabel.getText();
        return { actual: counterText, expected: "0" };
      },
    },
    {
      name: "failed Button Test 1 (incrementButton)",
      action: async (driver) => {
        // 의도적으로 테스트함
        const decrementButton = await driver.$("~Decrement");
        await decrementButton.click();
        const counterLabel = await driver.$("~CounterLabel");
        const counterText = await counterLabel.getText();
        return { actual: counterText, expected: "1" };
      },
    },
    {
      name: "Failing Test Case 1",
      action: async (driver) => {
        // 없는 버튼을 선택하려고 시도 (의도적으로 실패)
        const nonExistentButton = await driver.$("~NonExistent");
        await nonExistentButton.click();
        return { actual: null, expected: "N/A" };
      },
    },
  ];

  let results = [];

  for (let scenario of scenarios) {
    let result = {
      testName: scenario.name,
      status: "passed",
      startTime: new Date().toISOString(),
      endTime: null,
      steps: [],
      error: null,
    };

    try {
      const driver = await remote({
        path: "/",
        port: 4723,
        capabilities: {
          platformName: "iOS",
          "appium:platformVersion": "18.2", // iOS 버전
          "appium:deviceName": "iPhone 16 Pro", // 시뮬레이터 이름
          "appium:app":
            "/Users/hyojuntak/Library/Developer/Xcode/DerivedData/CounterApp-fnpulawmnvnbcoexorwmeuzodckc/Build/Products/Debug-iphonesimulator/CounterApp.app", // .app 파일 경로
          "appium:automationName": "XCUITest",
        },
      });

      result.steps.push("App launched successfully");

      // 각 시나리오 실행
      const { actual, expected } = await scenario.action(driver);
      result.steps.push(`Actual: ${actual}, Expected: ${expected}`);

      // 결과 값 비교
      console.log(`$$$$$$$$$ Expected '${expected}' but got '${actual}'`);
      if (actual !== expected) {
        result.status = "failed";
        result.error = `Expected '${expected}' but got '${actual}'`;
      }

      await driver.deleteSession();
    } catch (error) {
      result.status = "failed";
      result.error = error.message;
    } finally {
      result.endTime = new Date().toISOString();
      // if (result.status === "passed") {
      //   result.error = null; // 성공 시 error 필드를 null로 설정
      // }
      results.push(result);
    }
  }

  // 결과 파일에 저장
  console.log("##### result ######");
  fs.writeFileSync("result-json", JSON.stringify(results, null, 2));
  // console.log("##### test-result.json :", JSON.stringify(results, null, 2));
})();

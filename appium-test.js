const fs = require("fs");
const path = require("path");
const { remote } = require("webdriverio");

// 📌 실행 시간 기반으로 결과 파일 이름 생성
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const resultsFileName = `results_${timestamp}.json`;
const resultsFilePath = path.join(
  process.cwd(),
  "test-results",
  resultsFileName
);

// 📌 결과 저장 함수
function saveResultsToFile(results) {
  if (!fs.existsSync("test-results")) {
    fs.mkdirSync("test-results"); // test-results 디렉토리 없으면 생성
  }
  fs.writeFileSync(resultsFilePath, JSON.stringify(results, null, 2));
  console.log(`✅ 테스트 결과 저장 완료: ${resultsFilePath}`);
}

(async () => {
  console.log("🔹 WebdriverIO 모듈 로드 완료!");

  // 📌 실행할 테스트 시나리오 정의
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
      name: "Failed Button Test 1 (Increment Button)",
      action: async (driver) => {
        // 📌 의도적으로 실패하는 테스트
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
        // 📌 존재하지 않는 버튼을 클릭하려고 시도 (의도적 실패)
        const nonExistentButton = await driver.$("~NonExistent");
        await nonExistentButton.click();
        return { actual: null, expected: "N/A" };
      },
    },
  ];

  let results = [];

  // 📌 각 시나리오 실행
  for (let scenario of scenarios) {
    if (!scenario || !scenario.name) {
      console.error("❌ 오류: scenario가 정의되지 않음", scenario);
      continue; // 문제가 있는 시나리오는 건너뛰기
    }

    let result = {
      testName: scenario.name,
      status: "passed",
      startTime: new Date().toISOString(),
      endTime: null,
      steps: [],
      error: null,
    };

    try {
      console.log(`🔹 ${scenario.name} 실행 중...`);
      console.log("🔹 Appium 서버에 연결 시도...");

      const driver = await remote({
        path: "/",
        port: 4723,
        capabilities: {
          platformName: "iOS",
          "appium:platformVersion": "18.2",
          "appium:deviceName": "iPhone 16 Pro",
          "appium:app":
            "/Users/totohyojuntak/Library/Developer/Xcode/DerivedData/CounterApp-fqmaeslnbhwyflgnlmccxezzwapo/Build/Products/Debug-iphonesimulator/CounterApp.app",
          "appium:automationName": "XCUITest",
        },
      });

      console.log("✅ Appium 세션 생성 성공!");
      result.steps.push("App launched successfully");

      // 📌 각 시나리오 실행
      const { actual, expected } = await scenario.action(driver);
      result.steps.push(`Actual: ${actual}, Expected: ${expected}`);

      console.log(`✅ Expected '${expected}' but got '${actual}'`);
      if (actual !== expected) {
        result.status = "failed";
        result.error = `Expected '${expected}' but got '${actual}'`;
      }

      await driver.deleteSession();
      console.log(`✅ ${scenario.name} 완료!`);
    } catch (error) {
      result.status = "failed";
      result.error = error.message;
      console.error(`❌ ${scenario.name} 실행 중 오류 발생:`, error.stack);
    } finally {
      result.endTime = new Date().toISOString();
      results.push(result);
    }
  }

  // 📌 최종 결과 저장
  saveResultsToFile(results);
})();

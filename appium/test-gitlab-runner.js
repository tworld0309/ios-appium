const fs = require("fs");
const path = require("path");
const { remote } = require("webdriverio");
const scenarios = require("./appcounter-scenarios.js"); // 테스트 시나리오 가져오기
const args = require("minimist")(process.argv.slice(2));

const IP_PLATFORM = args.platform;
const IP_DEVICE_NAME = args.device;
const IP_APP = args.app;
const IP_PLATFORM_VERSION = args.platformVersion;
const IP_APPIUM_HOST = args.appiumHost;
const IP_APPIUM_PORT = args.appiumPort;
const IP_AUTOMATION_NAME = args.automationName;
const IP_MAX_RETRIES = args.maxTries;

console.log("📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌");
console.log("📌 Appium Test 시작...");
console.log(`📌 IP_PLATFORM: ${IP_PLATFORM}`);
console.log(`📌 IP_DEVICE_NAME: ${IP_DEVICE_NAME}`);
console.log(`📌 IP_APP: ${IP_APP}`);
console.log(`📌 IP_PLATFORM_VERSION: ${IP_PLATFORM_VERSION}`);

console.log(`📌 IP_APPIUM_HOST: ${IP_APPIUM_HOST}`);
console.log(`📌 IP_APPIUM_PORT: ${IP_APPIUM_PORT}`);
console.log(`📌 IP_AUTOMATION_NAME: ${IP_AUTOMATION_NAME}`);
console.log(`📌 IP_MAX_RETRIES: ${IP_MAX_RETRIES}`);
console.log("📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌");

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

// 📌 테스트 실행 함수
async function runTests() {
  console.log("🔹 WebdriverIO 모듈 로드 완료!");
  let results = [];

  for (let scenario of scenarios) {
    if (!scenario || !scenario.name) {
      console.error("❌ 오류: scenario가 정의되지 않음", scenario);
      continue;
    }

    let retryCount = 0;
    let isTestPassed = false;

    console.log("IP_MAX_RETRIES :", IP_MAX_RETRIES);

    while (retryCount <= IP_MAX_RETRIES && !isTestPassed) {
      let result = {
        testName: scenario.name,
        status: "passed",
        startTime: new Date().toISOString(),
        endTime: null,
        testDuration: null,
        steps: [],
        error: null,
        errorType: null,
        errorStack: null,
        retryCount,
        timestamp: null,
      };

      try {
        console.log(`🔹 ${scenario.name} 실행 중... (재시도: ${retryCount})`);
        console.log("🔹 Appium 서버에 연결 시도...");

        const startTime = Date.now();

        const driver = await remote({
          path: "/",
          port: IP_APPIUM_PORT,
          hostname: IP_APPIUM_HOST,
          capabilities: {
            platformName: IP_PLATFORM,
            "appium:platformVersion": String(IP_PLATFORM_VERSION),
            "appium:deviceName": IP_DEVICE_NAME,
            "appium:app": IP_APP,
            "appium:automationName": IP_AUTOMATION_NAME,
          },
        });

        console.log("✅ Appium 세션 생성 성공!");
        result.steps.push("App launched successfully");

        // 📌 시나리오 실행
        const { actual, expected } = await scenario.action(driver);
        result.steps.push(`Actual: ${actual}, Expected: ${expected}`);

        console.log(`✅ Expected '${expected}' but got '${actual}'`);
        if (actual !== expected) {
          throw new Error(`Expected '${expected}' but got '${actual}'`);
        }

        await driver.deleteSession();
        console.log(`✅ ${scenario.name} 완료!`);
        isTestPassed = true;
      } catch (error) {
        result.status = "failed";
        result.error = error.message;
        result.errorType = error.name || "UnknownError";
        result.errorStack = error.stack || null;
        console.error(`❌ ${scenario.name} 실행 중 오류 발생:`, error.stack);

        if (retryCount < IP_MAX_RETRIES) {
          console.log(
            `🔁 ${scenario.name} 재시도 중... (${
              retryCount + 1
            }/${IP_MAX_RETRIES})`
          );
        } else {
          console.log(`🚨 ${scenario.name} 최대 재시도 횟수 초과!`);
        }
      } finally {
        result.endTime = new Date().toISOString();
        result.testDuration = Date.now() - Date.parse(result.startTime);
        result.timestamp = new Date().toISOString();
        results.push(result);
      }

      retryCount++;
    }
  }

  // 📌 최종 결과 저장
  saveResultsToFile(results);
}

// 📌 테스트 실행
runTests();

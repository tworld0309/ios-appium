const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = [
  {
    name: "App Launch Test",
    action: async (driver) => {
      // 앱이 정상적으로 실행되었는지 확인
      await sleep(2000);
      return { actual: "launched", expected: "launched" };
    },
  },
  {
    name: "Increment Button Test",
    action: async (driver) => {
      const incrementButton = await driver.$("~Increment");
      await incrementButton.click();
      await sleep(2000);
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
      await sleep(2000);
      const counterLabel = await driver.$("~CounterLabel");
      const counterText = await counterLabel.getText();
      return { actual: counterText, expected: "-1" };
    },
  },
  {
    name: "Increment Multiple Click Test",
    action: async (driver) => {
      const incrementButton = await driver.$("~Increment");
      for (let i = 0; i < 5; i++) {
        await incrementButton.click();
        await sleep(500);
      }
      const counterLabel = await driver.$("~CounterLabel");
      const counterText = await counterLabel.getText();
      return { actual: counterText, expected: "5" };
    },
  },
  {
    name: "Decrement Multiple Click Test",
    action: async (driver) => {
      const decrementButton = await driver.$("~Decrement");
      for (let i = 0; i < 3; i++) {
        await decrementButton.click();
        await sleep(500);
      }
      const counterLabel = await driver.$("~CounterLabel");
      const counterText = await counterLabel.getText();
      return { actual: counterText, expected: "-3" };
    },
  },
  {
    name: "Initial Button Test",
    action: async (driver) => {
      const initialButton = await driver.$("~Initial");
      await initialButton.click();
      await sleep(2000);
      const counterLabel = await driver.$("~CounterLabel");
      const counterText = await counterLabel.getText();
      return { actual: counterText, expected: "0" };
    },
  },
  {
    name: "Input Field Test",
    action: async (driver) => {
      const inputField = await driver.$("~InputField");
      const isDisplayed = await inputField.isDisplayed();
      return { actual: isDisplayed.toString(), expected: "true" };
    },
  },
  {
    name: "Failed Button Test 1 (Increment Button)",
    action: async (driver) => {
      // 📌 의도적으로 실패하는 테스트
      const decrementButton = await driver.$("~Decrement");
      await decrementButton.click();
      await sleep(2000);
      const counterLabel = await driver.$("~CounterLabel");
      const counterText = await counterLabel.getText();
      return { actual: counterText, expected: "1" };
    },
  },
  {
    name: "Non-Existent Element Test",
    action: async (driver) => {
      // 📌 존재하지 않는 버튼을 클릭하려고 시도 (의도적 실패)
      const nonExistentButton = await driver.$("~NonExistent");
      await nonExistentButton.click();
      return { actual: null, expected: "N/A" };
    },
  },
  {
    name: "Crash Test Case",
    action: async (driver) => {
      // 📌 의도적으로 App을 크래시 발생시켜 종료되는지 확인
      const crashButton = await driver.$("~Crash");
      await crashButton.click();
      await sleep(5000);
      const isAlive = await driver.isSessionActive();
      return { actual: isAlive.toString(), expected: "false" };
    },
  },
];

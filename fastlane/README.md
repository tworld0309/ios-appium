fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios xcode_build

```sh
[bundle exec] fastlane ios xcode_build
```

Build iOS app without signing

### ios build

```sh
[bundle exec] fastlane ios build
```



### ios move_app

```sh
[bundle exec] fastlane ios move_app
```

Move CounterApp.app to ./build

### ios local_appium

```sh
[bundle exec] fastlane ios local_appium
```

Run Appium tests on iOS Simulator

### ios gitlab_appium

```sh
[bundle exec] fastlane ios gitlab_appium
```



### ios full_pipeline

```sh
[bundle exec] fastlane ios full_pipeline
```

Run full build pipeline (Build → Move → Upload)

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).

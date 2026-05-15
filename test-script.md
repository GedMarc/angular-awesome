
Test assertions are specific to selected language frameworks. BrowserStack requires explicit instruction to determine whether your tests have passed or failed based on the assertions in your test script.

Mark session name
You can use the sessionName capability to give your session a name (usually describing the test case) so that it is easy for you to debug later.
  ```typescript
const executorConfig = {
  "action": "setSessionName",
  "arguments": {
    "name": "<test-name>"
  }
};
await driver.executeScript('browserstack_executor: ' + JSON.stringify(executorConfig), []);
```

Mark test as passed or failed
To mark whether your test has passed or failed on BrowserStack, use the following Javascript executor in your test script.

The arguments passed in the Javascript method for setting the status and the corresponding reason of the test are status and reason

status accepts either passed or failed as the value
reason accepts a value in string datatype
test-script.js

```typescript
const executorConfig = {
      "action": "setSessionStatus",
      "arguments": {
        "status": "<passed/failed>",
        "reason": "<reason>"
      }
    };
    await driver.executeScript('browserstack_executor: ' + JSON.stringify(executorConfig), []);
```

Run your test suite on BrowserStack
Your test suite is now ready to run on BrowserStack! Run/Add the commands added under the scripts property section in the package.json file. Here is an example command:

```
npm run [your-test-script-name]-browserstack
```

The projectName and buildName config must be static and not change across different runs of the same build. This is a deviation in approach as specified by BrowserStack Automate or App Automate as Test Reporting & Analytics will automatically identify different build runs.

Restrict the characters in your projectName and buildName to alphanumeric characters (A-Z, a-z, 0-9), underscores (_), colons (:), square brackets ([, ]), and hyphens (-). Any other character will be replaced with an underscore (_).

Build Name is - `angular-awesome`
Project Name is `Angular Awesome`


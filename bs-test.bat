@echo off
REM Convenience script to run Karma tests on BrowserStack (Windows)
REM Uses the provided credentials and BS flag, then calls the existing npm script.

SET BS=true
SET BROWSERSTACK_USERNAME=marcmagon1
SET BROWSERSTACK_ACCESS_KEY=P7pnVbL7JBJ732Spjr39

REM Optional: allow overriding BUILD_TAG via first argument
IF NOT "%1"=="" (
  SET BUILD_TAG=%1
)

ECHO Running tests on BrowserStack...
ECHO   BROWSERSTACK_USERNAME=%BROWSERSTACK_USERNAME%
ECHO   BUILD_TAG=%BUILD_TAG%

npm run test:bs

EXIT /B %ERRORLEVEL%

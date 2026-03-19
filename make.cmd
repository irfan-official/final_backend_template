@echo off

REM Get current directory (where command is run)
set PROJECT_DIR=%cd%

REM Call your TypeScript script
ts-node "%PROJECT_DIR%\scripts\makeModule.ts" %*
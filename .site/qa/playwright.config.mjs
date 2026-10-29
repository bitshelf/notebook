import { fileURLToPath } from "node:url";
import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: ".",
  testMatch: "acceptance.spec.mjs",
  timeout: 45000,
  expect: { timeout: 15000 },
  workers: 2,
  retries: 0,
  outputDir: "../.dsh-tmp/qa/results",
  reporter: [
    ["list"],
    ["html", { outputFolder: ".dsh-tmp/qa/report", open: "never" }],
  ],
  use: {
    headless: true,
    baseURL: process.env.QA_URL || "http://127.0.0.1:8777/notebook/",
    screenshot: "on",
    trace: "retain-on-failure",
  },
  webServer: process.env.QA_URL
    ? undefined
    : {
        command: "node scripts/qa-server.mjs",
        cwd: fileURLToPath(new URL("..", import.meta.url)),
        url: "http://127.0.0.1:8777/notebook/home",
        reuseExistingServer: true,
        timeout: 10000,
      },
  projects: [
    {
      name: "phone-firefox-light",
      use: {
        browserName: "firefox",
        channel: undefined,
        viewport: { width: 390, height: 844 },
        hasTouch: true,
        colorScheme: "light",
      },
    },
    {
      name: "phone-firefox-dark",
      use: {
        browserName: "firefox",
        channel: undefined,
        viewport: { width: 390, height: 844 },
        hasTouch: true,
        colorScheme: "dark",
      },
    },
    {
      name: "phone-light",
      use: {
        channel: process.platform === "win32" ? "msedge" : undefined,
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
        colorScheme: "light",
      },
    },
    {
      name: "phone-dark",
      use: {
        channel: process.platform === "win32" ? "msedge" : undefined,
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
        colorScheme: "dark",
      },
    },
    {
      name: "pc-light",
      use: {
        channel: process.platform === "win32" ? "msedge" : undefined,
        viewport: { width: 1440, height: 1000 },
        colorScheme: "light",
      },
    },
    {
      name: "pc-dark",
      use: {
        channel: process.platform === "win32" ? "msedge" : undefined,
        viewport: { width: 1440, height: 1000 },
        colorScheme: "dark",
      },
    },
  ],
});

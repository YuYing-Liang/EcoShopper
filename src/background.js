import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    alert("Welcome to Carbon Score!");
  }
});
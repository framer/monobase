"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// var chalk = require("chalk");
// var execSync = require("child_process").execSync;
// var spawn = require("cross-spawn");
// var opn = require("opn");
var opn = require("opn");
var spawn = require("cross-spawn");
var child_process_1 = require("child_process");
var chalk_1 = require("chalk");
// https://github.com/sindresorhus/opn#app
var OSX_CHROME = "google chrome";
var Actions = Object.freeze({
    NONE: 0,
    BROWSER: 1,
    SCRIPT: 2
});
function getBrowserEnv() {
    // Attempt to honor this environment variable.
    // It is specific to the operating system.
    // See https://github.com/sindresorhus/opn#app for documentation.
    var value = process.env.BROWSER;
    var action;
    if (!value) {
        // Default.
        action = Actions.BROWSER;
    }
    else if (value.toLowerCase().endsWith(".js")) {
        action = Actions.SCRIPT;
    }
    else if (value.toLowerCase() === "none") {
        action = Actions.NONE;
    }
    else {
        action = Actions.BROWSER;
    }
    return { action: action, value: value };
}
function executeNodeScript(scriptPath, url) {
    var extraArgs = process.argv.slice(2);
    var child = spawn("node", [scriptPath].concat(extraArgs, [url]), {
        stdio: "inherit"
    });
    child.on("close", function (code) {
        if (code !== 0) {
            console.log();
            console.log(chalk_1.default.red("The script specified as BROWSER environment variable failed."));
            console.log(chalk_1.default.cyan(scriptPath) + " exited with code " + code + ".");
            console.log();
            return;
        }
    });
    return true;
}
function startBrowserProcess(browser, url) {
    // If we're on OS X, the user hasn't specifically
    // requested a different browser, we can try opening
    // Chrome with AppleScript. This lets us reuse an
    // existing tab when possible instead of creating a new one.
    var shouldTryOpenChromeWithAppleScript = process.platform === "darwin" &&
        (typeof browser !== "string" || browser === OSX_CHROME);
    if (shouldTryOpenChromeWithAppleScript) {
        try {
            // Try our best to reuse existing tab
            // on OS X Google Chrome with AppleScript
            child_process_1.execSync('ps cax | grep "Google Chrome"');
            child_process_1.execSync('osascript openChrome.applescript "' + encodeURI(url) + '"', {
                cwd: __dirname,
                stdio: "ignore"
            });
            return true;
        }
        catch (err) {
            // Ignore errors.
        }
    }
    // Another special case: on OS X, check if BROWSER has been set to "open".
    // In this case, instead of passing `open` to `opn` (which won't work),
    // just ignore it (thus ensuring the intended behavior, i.e. opening the system browser):
    // https://github.com/facebookincubator/create-react-app/pull/1690#issuecomment-283518768
    if (process.platform === "darwin" && browser === "open") {
        browser = undefined;
    }
    // Fallback to opn
    // (It will always open new tab)
    try {
        var options = { app: browser };
        opn(url, options).catch(function () { }); // Prevent `unhandledRejection` error.
        return true;
    }
    catch (err) {
        return false;
    }
}
/**
 * Reads the BROWSER evironment variable and decides what to do with it. Returns
 * true if it opened a browser or ran a node.js script, otherwise false.
 */
exports.open = function (url) {
    var _a = getBrowserEnv(), action = _a.action, value = _a.value;
    switch (action) {
        case Actions.NONE:
            // Special case: BROWSER="none" will prevent opening completely.
            return false;
        case Actions.SCRIPT:
            return executeNodeScript(value, url);
        case Actions.BROWSER:
            return startBrowserProcess(value, url);
        default:
            throw new Error("Not implemented.");
    }
};

exports.config = {
    specs: [
		"./webdriver/spec/drag&drop.js"
    ],
    capabilities: [{
		browserName: "chrome"
    }],
    logLevel: "silent",
    coloredLogs: true,
    screenshotPath: "./errorShots/",
    baseUrl: "http://localhost:8080/demo/",
	// Default timeout for all waitForXXX commands.
    waitforTimeout: 1000,
    framework: "jasmine",
    reporter: "spec",
    jasmineNodeOpts: {
		// Jasmine default timeout
        defaultTimeoutInterval: 180000
    }
}

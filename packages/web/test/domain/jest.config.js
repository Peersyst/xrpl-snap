/* eslint-disable @typescript-eslint/no-var-requires */
const commonConfig = require("../../jest.config.common.js");

module.exports = {
    ...commonConfig,
    rootDir: "../../",
    displayName: {
        name: "DOMAIN",
        color: "blue",
    },
    testRegex: ".*\\.spec\\.ts$",
    testPathIgnorePatterns: ["test/ui/", "test/data-access/"],
};

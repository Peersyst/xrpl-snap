module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleDirectories: ["src", "node_modules"],
    transform: {
        "\\.[jt]sx?$": "ts-jest",
        "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
    },
    transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/__mocks__/file.mock.js",
        "\\.svg$": "<rootDir>/test/__mocks__/svg.mock.js",
        "\\.(css|less|sass)$": "identity-obj-proxy",
    },
};

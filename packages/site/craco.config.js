// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require("webpack");

module.exports = {
    plugins: [],
    babel: {
        plugins: [["babel-plugin-styled-components", { displayName: true }]],
    },
    webpack: {
        configure: (config) => {
            const scopePluginIndex = config.resolve.plugins.findIndex(
                ({ constructor }) => constructor && constructor.name === "ModuleScopePlugin",
            );

            config.resolve.plugins.splice(scopePluginIndex, 1);

            return {
                ...config,
                resolve: {
                    ...config.resolve,
                    fallback: {
                        ...config.resolve.fallback,
                        process: require.resolve("process/browser"),
                        stream: require.resolve("stream-browserify"),
                        https: require.resolve("https-browserify"),
                        crypto: require.resolve("crypto-browserify"),
                        http: require.resolve("stream-http"),
                        url: require.resolve("url/"),
                        buffer: require.resolve("buffer"),
                    },
                },
                plugins: [
                    ...config.plugins,
                    new webpack.ProvidePlugin({
                        Buffer: ["buffer", "Buffer"],
                        process: "process/browser",
                    }),
                ],
            };
        },
    },
};

module.exports = {
    babel: {
        plugins: [["babel-plugin-styled-components", { displayName: true }]],
    },
    webpack: {
        configure: (config: any) => {
            const scopePluginIndex = config.resolve.plugins.findIndex(
                ({ constructor }: any) => constructor && constructor.name === "ModuleScopePlugin",
            );

            config.resolve.plugins.splice(scopePluginIndex, 1);

            return config;
        },
    },
};
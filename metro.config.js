/*
module.exports = {
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: false,
            },
        }),
    },
    resolver: {
        sourceExts: ['jsx', 'js', 'ts', 'tsx'], //add here
    },
};
*/
const { getDefaultConfig } = require('metro-config')

module.exports = (async () => {
    const {
        resolver: { assetExts },
    } = await getDefaultConfig()
    return {
        transformer: {
            getTransformOptions: async () => ({
                transform: {
                    experimentalImportSupport: false,
                    inlineRequires: false,
                },
            }),
            // Remove all console logs in production...
            minifierConfig: {
                compress: {drop_console: true}
            }
        },
        resolver: {
            assetExts: [...assetExts],
        },
    }
})()
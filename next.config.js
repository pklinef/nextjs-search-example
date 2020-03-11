const webpack = require('webpack')

module.exports = {
    webpack(config) {
        config.devtool = 'eval-source-map';
        return config
    }
}
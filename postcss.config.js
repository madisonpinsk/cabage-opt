'use strict';

module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: ['ie >= 9', 'last 4 version']
        })
    ]
};
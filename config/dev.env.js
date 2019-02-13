'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	// BASE_API: '"http://47.75.81.230:8080"',
	BASE_API: '"http://172.16.1.7:8080"',
	// BASE_API: '"http://localhost:8080"',
})
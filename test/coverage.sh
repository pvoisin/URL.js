#!/usr/bin/env bash
node_modules/istanbul/lib/cli.js cover node_modules/mocha/bin/_mocha -- -R spec test/**/*Suite.js
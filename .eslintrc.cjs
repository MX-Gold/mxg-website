/* eslint-env node */

require('@rushstack/eslint-patch/modern-module-resolution')

const fs = require('fs')

const YAML = require('yaml')

const eslintrcYAML = YAML.parse(fs.readFileSync('.eslintrc.yaml', 'utf8'))

module.exports = {
  ...eslintrcYAML,
}

/** @type {import('next').NextConfig} */

module.exports = (_, {defaultConfig}) => {
  if ('sassOptions' in defaultConfig) {
      defaultConfig['sassOptions'] = {
          includePaths: ['./src'],
          prependData: `@import "~@/styles/variables.scss";`,
      }
  }
  return defaultConfig;
}

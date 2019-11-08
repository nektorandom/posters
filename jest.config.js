require('@babel/polyfill');
module.exports = {
  preset: 'jest-puppeteer',
  testRegex: './*\\.spec\\.js$',
  setupFilesAfterEnv: ['expect-puppeteer']
}

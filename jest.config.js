let vueJest = require.resolve(`@vue/vue2-jest`)

module.exports = {
  roots: [
    '<rootDir>/packages',
  ],
  testEnvironment: 'jsdom',
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],
  transform: {
    // process *.vue files with vue-jest
    '^.+\\.vue$': vueJest,
    '.+\\.(css|styl|less|sass|scss|jpg|jpeg|png|svg|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|avif)$':
    require.resolve('jest-transform-stub'),
    '^.+\\.jsx?$': require.resolve('babel-jest')
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
  ],
  modulePathIgnorePatterns: [
    '/dist/',
  ],
  // serializer for snapshots
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  moduleNameMapper: {
    '^@charrue/(.*)$': '<rootDir>/packages/$1/src/index.js',
  },
  testMatch: [
    '**/__tests__/**/*.+(js|ts)',
    '**/?(*.)+(spec|test).+(js|ts)',
  ],
  // https://github.com/facebook/jest/issues/6766
  testURL: 'http://localhost/'
}
const path = require('node:path')

const commitlint_config_path = path.resolve('config', 'commitlint.cjs')

// I prefer to keep the configuration for the commit linter in
// config/commitlint.cjs, so I can run npm run lint even when I am not releasing
// (I like to lint commits with a pre-push git hook).
// Since in config/commitlint.cjs I am using conventional commits, these 2
// configurations for @semantic-release/commit-analyzer are equivalent:
// 1. config: './config/commitlint.cjs'
// 2. preset: 'conventionalcommits'
// https://github.com/semantic-release/commit-analyzer
const commit_analyzer = [
  '@semantic-release/commit-analyzer',
  {
    config: commitlint_config_path
  }
]
// console.log('=== commit_analyzer ===', commit_analyzer)

// https://github.com/semantic-release/release-notes-generator
const release_notes_generator = [
  '@semantic-release/release-notes-generator',
  {
    config: commitlint_config_path
  }
]
// console.log('=== release_notes_generator ===', release_notes_generator)

// https://github.com/semantic-release/changelog
const changelog = [
  '@semantic-release/changelog',
  {
    changelogFile: 'CHANGELOG.md',
    changelogTitle: '# CHANGELOG'
  }
]

// https://github.com/semantic-release/npm
// Do not set npmPublish here. Instead, set "private": true or "private": false
// in the package.json.
const npm = ['@semantic-release/npm', { pkgRoot: '.' }]

// git commit message made by the semantic-relase bot //////////////////////////
// This commit message should be different for each package.
// The rest of the semantic-release configuration should stay the same.
// https://github.com/semantic-release/git#message
const message =
  'chore(utils): release v.${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'

// https://github.com/semantic-release/github
const github = [
  '@semantic-release/github',
  {
    assets: [
      { path: 'CHANGELOG.md' },
      { path: 'LICENSE' },
      { path: 'README.md' }
    ],
    message
  }
]

const git = [
  '@semantic-release/git',
  {
    assets: ['CHANGELOG.md', 'package.json'],
    message
  }
]

const config = {
  // https://semantic-release.gitbook.io/semantic-release/usage/configuration#branches
  branches: [
    'main',
    'next',
    { name: 'beta', prerelease: true },
    { name: 'alpha', prerelease: true }
  ],
  ci: true,
  // The git plugin must be called AFTER the npm plugin. See here:
  // https://github.com/semantic-release/git#examples
  // https://semantic-release.gitbook.io/semantic-release/support/faq#why-is-the-package.jsons-version-not-updated-in-my-repository
  plugins: [
    commit_analyzer,
    release_notes_generator,
    changelog,
    npm,
    github,
    git
  ],
  tagFormat: 'v${version}'
}

// console.log('== semantic release config ===', config)

module.exports = config

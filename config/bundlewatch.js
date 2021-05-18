// https://bundlewatch.io/#/reference/configuration
const config = {
  ci: {
    commitSha: ciEnv.commitSha,
    githubAccessToken: ciEnv.githubAccessToken,
    repoBranchBase: ciEnv.repoBranchBase || 'main', // Branch PR is being merged into
    repoCurrentBranch: ciEnv.repoCurrentBranch,
    repoName: ciEnv.repoName,
    repoOwner: ciEnv.repoOwner,
    trackBranches: ['main', 'develop']
  },
  defaultCompression: 'gzip',
  files: [
    {
      path: './dist/eleventy-plugin-embed-cloudinary.cjs.production.min.js',
      maxSize: '1.5kB'
    },
    {
      path: './dist/eleventy-plugin-embed-cloudinary.esm.js',
      maxSize: '3kB'
    }
  ]
}

module.exports = config

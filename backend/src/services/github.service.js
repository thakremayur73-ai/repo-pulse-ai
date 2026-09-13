const axios = require('axios');


function validateGithubUrl(url) {
  if (typeof url !== 'string' || url.trim() === '') {
    throw new Error('Invalid GitHub URL: URL must be a non-empty string');
  }

  const prefix = 'https://github.com/';
  if (!url.startsWith(prefix)) {
    throw new Error('Invalid GitHub URL: must start with https://github.com/');
  }

  const path = url.slice(prefix.length);
  const parts = path.split('/').filter(Boolean);

  if (parts.length < 2) {
    throw new Error('Invalid GitHub URL: missing owner or repository name');
  }

  const owner = parts[0];
  let repo = parts[1];

  if (repo.endsWith('.git')) {
    repo = repo.slice(0, -4);
  }

  if (!owner || !repo) {
    throw new Error('Invalid GitHub URL: owner or repository name is empty');
  }

  return { owner, repo };
}
const getRepository = async (owner, repo) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`
    );

    return response.data;
  } catch (error) {
    console.error('GitHub API request failed:', error.message);
    throw new Error('Failed to fetch GitHub repository');
  }
};

module.exports = {
  getRepository,
  validateGithubUrl
};
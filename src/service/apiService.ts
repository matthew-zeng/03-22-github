import { Octokit } from 'octokit';

const octokit = new Octokit({ auth: process.env.REACT_APP_TOKEN });

export default octokit
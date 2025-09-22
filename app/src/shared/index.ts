import { Octokit } from "@octokit/rest";

export const octokit = new Octokit({
  auth: import.meta.env.PUBLIC_GH_TOKEN,
});

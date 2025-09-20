import { octokit } from "../shared";

export async function getRepoMetrics(owner: string, repo: string) {
  return new Promise<{ [key: string]: string | number | Date | null }>(
    (resolve, reject) => {
      Promise.all([
        octokit.repos.get({
          owner,
          repo,
        }),
        octokit.issues.listForRepo({
          owner,
          repo,
          state: "open",
        }),
        octokit.pulls.list({
          owner,
          repo,
          state: "open",
        }),
        octokit.repos.listContributors({
          owner,
          repo,
        }),
      ])
        .then(
          ([
            { data: repoData },
            { data: issues },
            { data: pulls },
            { data: contributors },
          ]) => {
            resolve({
              "🏷 name": repoData.name,
              "🛈 description": repoData.description,
              "☆ stars": repoData.stargazers_count,
              "⑂ forks": repoData.forks_count || 1,
              "👁 subscriptores": repoData.subscribers_count,
              "⚠ issues abiertas": issues.length,
              "⚠ pull requests abiertas": pulls.length,
              "⏲ fecha de creación": repoData.created_at,
              "⏲ ultima actualización": repoData.updated_at,
              "{} lenguaje principal": repoData.language,
              "⚖ tamaño": repoData.size + " KB",
              "⇄ contribuidores": contributors.length,
              "🡥 url": repoData.html_url,
              "⌂ homePage": repoData.homepage,
            });
          }
        )
        .catch((err) => {
          console.error(`Error al obtener métricas de ${owner}/${repo}:`, err);
          reject(err);
        });
    }
  );
}

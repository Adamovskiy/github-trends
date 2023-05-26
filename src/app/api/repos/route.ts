import {NextResponse} from 'next/server';

let lastSuccessfulResponse;

export async function GET(req: Request) {
  const now = new Date();
  const lastWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
  const lastWeekStr = lastWeek.getFullYear() + '-' +
    ('0' + (lastWeek.getMonth() + 1)).slice(-2) + '-' +
    ('0' + lastWeek.getDate()).slice(-2);
  try {
    const githubResponse = await fetch(`https://api.github.com/search/repositories?q=created:>${lastWeekStr}&sort=stars&order=desc&per_page=20&page=1`);
    let responseBody = await githubResponse.json();
    lastSuccessfulResponse = responseBody.items;
  } catch (e) {
    console.error(`Failed to load repos from GitHub`, e);
  }
  if (!lastSuccessfulResponse) {
    return new NextResponse()
  }
  return NextResponse.json(lastSuccessfulResponse.map(item => ({
    id: item.id,
    name: item.name,
    html_url: item.html_url,
    description: item.description,
    stargazers_count: item.stargazers_count,
  })));
}
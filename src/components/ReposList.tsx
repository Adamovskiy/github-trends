'use client';

import {useEffect, useState} from 'react';
import Repo from '@/components/Repo';

export type Repository = {
  id: number,
  name: string,
  html_url: string,
  description: string,
  stargazers_count: number,
}

export default function ReposList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Repository[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch('https://api.github.com/search/repositories?q=created:>2017-01-10&sort=stars&order=desc&per_page=20&page=1')
      .then((res) => res.json())
      .then((data) => {
        setData(data.items.map(item => ({
          id: item.id,
          name: item.name,
          html_url: item.html_url,
          description: item.description,
          stargazers_count: item.stargazers_count,
        })));
        setLoading(false);
      });
  }, []);

  return <ol>{
    loading ? <span>Loading...</span> : data.map(item => <li key={item.id}><Repo value={item}/></li>)
  }</ol>;
}

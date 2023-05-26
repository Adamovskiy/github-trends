'use client';

import {useEffect, useState} from 'react';
import Repo from '@/components/Repo';
import {useFavouritesStorage} from '@/components/FavouritesStorage';
import styles from './ReposList.module.scss';

export type Repository = {
  id: number,
  name: string,
  html_url: string,
  description: string,
  stargazers_count: number,
}

export default function ReposList({favouritesOnly}: { favouritesOnly: boolean }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<Repository[]>([]);
  const {isFavourite} = useFavouritesStorage();

  useEffect(() => {
    setLoading(true);
    fetch('/api/repos')
      .then((res) => res.json())
      .then((data) => {
        setData(data.filter(item => !favouritesOnly || isFavourite(item.id)));
        setLoading(false);
      })
      .catch(e => {
        console.error('Failed to fetch repositories data', e);
        setLoading(false);
        setError(true);
      });
  }, [favouritesOnly]);

  return <div className={styles.container}>{
    loading ?
      <div className={styles.placeholder}>...</div> :
      error ? <div className={styles.placeholder}>Failed to load repositories data. Please try again later.</div> :
        data.length ? <ol className={styles.rows}>{ data.map(item => <li key={item.id}><Repo value={item}/></li>)}</ol> :
          <div className={styles.placeholder}>There is nothing here, yet</div>
  }</div>;
}

'use client';

import {useEffect, useMemo, useState} from 'react';
import Repo from '@/components/Repo';
import {useFavouritesStorage} from '@/components/FavouritesStorage';
import styles from './ReposList.module.scss';
import {FiltersPanel} from '@/components/FiltersPanel';

export type Repository = {
  id: number,
  name: string,
  html_url: string,
  description: string,
  stargazers_count: number,
  language?: string,
}

export default function ReposList({favouritesOnly}: { favouritesOnly: boolean }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<Repository[]>([]);
  const {isFavourite} = useFavouritesStorage();
  const [enabledLanguages, setEnabledLanguages] = useState([]);

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

  const availableLanguages = useMemo(() => Array.from(new Set(data.map(item => item.language))), [data]);
  const filteredData = useMemo(() => data.filter(item =>
    enabledLanguages.findIndex(l => l === item.language || !item.language && l === 'null') !== -1,
  ), [enabledLanguages, data]);

  return <div className={styles.container}>{
    loading ?
      <div className={styles.placeholder}>...</div> :
      error ?
        <div className={styles.placeholder}>Failed to load repositories data. Please try again later.</div> :
        data.length ?
          <div>
            <FiltersPanel availableLanguages={availableLanguages} onEnabledLanguagesChange={setEnabledLanguages}/>
            {filteredData.length ?
              <ol className={styles.rows}>{
                filteredData.map(item => <li key={item.id}><Repo value={item}/></li>)
              }</ol> :
              <div className={styles.placeholder}>There is nothing after filtering</div>
            }
          </div> :
          <div className={styles.placeholder}>There is nothing here, yet</div>
  }</div>;
}

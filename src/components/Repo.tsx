import Link from 'next/link';
import {Repository} from '@/components/ReposList';
import {useFavouritesStorage} from '@/components/FavouritesStorage';
import styles from './Repo.module.scss';
import {clsIf, clss} from '@/utils/classes';

export default function Repo({value}: { value: Repository }) {
  const {isFavourite, toggleFavourite} = useFavouritesStorage();

  return <div className={styles.repoRow}>
    <div className={styles.descriptionsCol}>
      <div>
        <h2 className={styles.title}>
          <Link href={value.html_url} target={"_blank"}>{value.name}</Link>
        </h2>
      </div>
      <div className={styles.description}>{value.description}</div>
    </div>
    <div className={styles.starsCounter}>★&nbsp;{value.stargazers_count}</div>
    <div className={clss(styles.favButton, clsIf(isFavourite(value.id), styles.active))} onClick={() => toggleFavourite(value.id)}></div>
  </div>;
}

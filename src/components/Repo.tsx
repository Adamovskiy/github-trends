import Link from 'next/link';
import {Repository} from '@/components/ReposList';
import {useFavouritesStorage} from '@/components/FavouritesStorage';

export default function Repo({value}: { value: Repository }) {
  const {isFavourite, toggleFavourite} = useFavouritesStorage();

  return <div>
    <div>
      <Link href={value.html_url} target={'_blank'}>
        {value.name}
      </Link>
    </div>
    <div>{value.description}</div>
    <div>★ {value.stargazers_count}</div>
    <button onClick={() => toggleFavourite(value.id)}>{
      isFavourite(value.id) ? 'Remove from favourite' : 'Add to favourite'
    }</button>
  </div>;
}

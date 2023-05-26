import ReposList from '@/components/ReposList';

export default function Favourites() {
  return <div>
    <ReposList favouritesOnly={true}/>
  </div>;
}

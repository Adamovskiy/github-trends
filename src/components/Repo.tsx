import Link from 'next/link';
import {Repository} from '@/components/ReposList';

export default function Repo({value}: { value: Repository }) {
  return <div>
    <div>
      <Link href={value.html_url} target={'_blank'}>
        {value.name}
      </Link>
    </div>
    <div>{value.description}</div>
    <div>★ {value.stargazers_count}</div>
  </div>;
}

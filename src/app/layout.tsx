'use client';

import './globals.css'
import styles from './layout.module.scss'

import {Roboto} from 'next/font/google';
import Link from 'next/link';
import {Metadata} from 'next';
import {usePathname} from 'next/navigation';
import {clsIf, clss} from '@/utils/classes';
import {ReactNode} from 'react';
import {FavouritesStorageProvider} from '@/components/FavouritesStorage';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'GitHub Trends',
  description: 'Discover trending repositories on GitHub',
}

export default function RootLayout({children}: { children: ReactNode }) {
  const pathname = usePathname();
  const favouritesActive = pathname.startsWith('/favourites');

  return <html lang="en">
  <body className={roboto.className}>
  <header>
    <nav className={styles.tabs}>
      <Link href="/" className={clss(styles.tab, clsIf(!favouritesActive, styles.active))}>GitHub Trends</Link>
      <Link href="/favourites/" className={clss(styles.tab, clsIf(favouritesActive, styles.active))}>My
        Favourites</Link>
    </nav>
  </header>
  <main className={styles.tabContent}>
    <FavouritesStorageProvider>
      {children}
    </FavouritesStorageProvider>
  </main>
  </body>
  </html>;
}

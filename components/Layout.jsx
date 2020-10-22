import styles from '../styles/Layout.module.sass';
import Link from 'next/link';
import Head from 'next/head';

export default function Layout({title, children}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        ></meta>
      </Head>
      <header className={styles.header}>
        <Link href='/'>
          <a>Podcast</a>
        </Link>
      </header>
      {children}
    </div>
  );
}

import styles from '../styles/Layout.module.sass';
import Link from 'next/link';
import Head from 'next/head';

export default function Layout({title, children}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <header className={styles.header}>
        <Link href='/'>
          <a>{title}</a>
        </Link>
      </header>
      {children}
    </div>
  );
}

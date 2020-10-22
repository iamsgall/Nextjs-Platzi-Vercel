import styles from '../styles/Layout.module.sass';
import Link from 'next/link';
import Head from 'next/head';
import NProgress from 'nprogress';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

export default function Layout({title, children}) {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => NProgress.start());
    router.events.on('routeChangeComplete', () => NProgress.done());
    router.events.on('routeChangeError', () => NProgress.done());
    return () => {
      router.events.off('routeChangeStart', () => NProgress.start());
      router.events.off('routeChangeComplete', () => NProgress.done());
      router.events.off('routeChangeError', () => NProgress.done());
    };
  }, []);

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

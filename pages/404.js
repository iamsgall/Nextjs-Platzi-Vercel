import Link from 'next/link';
import Layout from '../components/Layout.jsx';

export default function Custom404() {
  return (
    <Layout title='Upps :('>
      <div
        style={{
          textAlign: 'center',
          marginTop: '45vh',
        }}
      >
        <h1>404 - Page Not Found</h1>
        <Link href='/'>
          <a>Go back Home</a>
        </Link>
      </div>
    </Layout>
  );
}

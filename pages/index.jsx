import API from '../utils/API';
import 'isomorphic-fetch';
import Layout from '../components/Layout.jsx';
import ChannelGrid from '../components/ChannelGrid';

export default function Home({channels}) {
  return (
    <Layout title='Podcasts'>
      <ChannelGrid channels={channels} />
    </Layout>
  );
}

export const getServerSideProps = async ctx => {
  try {
    const res = await API.get('channels/recommended');
    const {body: channels} = await res.data;
    return {
      props: {
        channels,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

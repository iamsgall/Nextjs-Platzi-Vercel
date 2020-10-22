import API from '../utils/API';
import 'isomorphic-fetch';
import Layout from '../components/Layout.jsx';
import ChannelGrid from '../components/ChannelGrid';
import Error from './_error';

export default function Home({channels, statusCode}) {
  if (statusCode !== 200) {
    return <Error statusCode={statusCode}></Error>;
  }
  return (
    <Layout title='Podcasts'>
      <ChannelGrid channels={channels} />
    </Layout>
  );
}

export const getServerSideProps = async ({res}) => {
  try {
    const res = await API.get('channels/recommended');
    const {body: channels} = await res.data;
    return {
      props: {
        channels,
        statusCode: res.status, //200
      },
    };
  } catch (error) {
    // THIS `res` IS THE PARAMS OF FUNCTION
    res.statusCode = 503;
    console.log(error);
    return {
      props: {
        channels: null,
        statusCode: 503,
      },
    };
  }
};

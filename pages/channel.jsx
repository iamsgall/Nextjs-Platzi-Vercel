import API from '../utils/API';
import Layout from '../components/Layout.jsx';
import PodcastList from '../components/PodcastList.jsx';
import Series from '../components/Series.jsx';
import Banner from '../components/Banner.jsx';
import Error from 'next/error';

export default function Channel({channel, series, audios, statusCode}) {
  if (statusCode !== 200) {
    return <Error statusCode={statusCode}></Error>;
  }
  return (
    <Layout title={channel.title}>
      <Banner channel={channel} />
      {series.length > 0 && <Series series={series} />}
      <PodcastList audios={audios} />
    </Layout>
  );
}

export const getServerSideProps = async ({query, res}) => {
  const id = query.id;

  try {
    const [resChannel, resSeries, resAudios] = await Promise.all([
      API.get(`channels/${id}`),
      API.get(`channels/${id}/child_channels`),
      API.get(`channels/${id}/audio_clips`),
    ]);

    const dataChannel = await resChannel.data;
    const channel = await dataChannel.body.channel;

    const dataSeries = await resSeries.data;
    const series = await dataSeries.body.channels;

    const dataAudios = await resAudios.data;
    const audios = await dataAudios.body.audio_clips;

    return {
      props: {
        channel,
        series,
        audios,
        statusCode: 200, //200
      },
    };
  } catch (error) {
    res.statusCode = 503;
    return {
      props: {
        channel: null,
        series: null,
        audios: null,
        statusCode: 503,
      },
    };
  }
};

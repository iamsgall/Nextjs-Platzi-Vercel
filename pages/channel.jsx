import API from '../utils/API';
import Layout from '../components/Layout.jsx';
import PodcastList from '../components/PodcastList.jsx';
import Series from '../components/Series.jsx';
import Banner from '../components/Banner.jsx';

export default function Channel({channel, series, audios}) {
  return (
    <Layout title={channel.title}>
      <Banner channel={channel} />
      {series.length > 0 && <Series series={series} />}
      <PodcastList audios={audios} />
    </Layout>
  );
}

export const getServerSideProps = async ({query}) => {
  const idChannel = query.id;

  try {
    const [resChannel, resSeries, resAudios] = await Promise.all([
      API.get(`channels/${idChannel}`),
      API.get(`channels/${idChannel}/child_channels`),
      API.get(`channels/${idChannel}/audio_clips`),
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
      },
    };
  } catch (error) {
    console.log(error);
  }
};

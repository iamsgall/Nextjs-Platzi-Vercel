import API from '../../../utils/API';
import Layout from '../../../components/Layout.jsx';
import PodcastList from '../../../components/PodcastList.jsx';
import ChannelGrid from '../../../components/ChannelGrid.jsx';
import Banner from '../../../components/Banner.jsx';
import Error from '../../_error';
import {useState} from 'react';
import PodcastPlayer from '../../../components/PodcastPlayer.jsx';
import styles from '../../../styles/Channel.module.sass';

export default function Channel({channel, series, audios, statusCode}) {
  const [openedPodcast, setOpenedPodcast] = useState(null);

  const openPodcast = (e, podcast) => {
    e.preventDefault();
    setOpenedPodcast(podcast);
  };

  const closePodcast = e => {
    e.preventDefault();
    setOpenedPodcast(null);
  };

  if (statusCode !== 200) {
    return <Error statusCode={statusCode}></Error>;
  }
  return (
    <Layout title={channel.title}>
      <Banner channel={channel} />

      {openedPodcast && (
        <div className={styles.modal}>
          <PodcastPlayer audio={openedPodcast} onClose={closePodcast} />
        </div>
      )}

      {series.length > 0 && <ChannelGrid channels={series} />}
      <PodcastList
        audios={audios}
        channel={channel}
        onClickPodcast={openPodcast}
      />
    </Layout>
  );
}

export const getServerSideProps = async ({query, res}) => {
  // console.log(query); //{ slug: 'posta', cid: '4702115' }
  const id = query.cid;

  try {
    const [resChannel, resSeries, resAudios] = await Promise.all([
      API.get(`channels/${id}`),
      API.get(`channels/${id}/child_channels`),
      API.get(`channels/${id}/audio_clips`),
    ]);

    if (
      resChannel.status >= 400 ||
      resSeries.status >= 400 ||
      resAudios.status >= 400
    ) {
      res.statusCode =
        resChannel.status || resSeries.status || resAudios.status;
      return {
        props: {
          channel: null,
          series: null,
          audios: null,
          statusCode: resChannel.status || resSeries.status || resAudios.status,
        },
      };
    }

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

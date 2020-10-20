import API from '../utils/API';
import Link from 'next/link';
import styles from '../styles/Channel.module.sass';

export default function Channel({channel, series, audios}) {
  return (
    <>
      <header className={styles.header}>Podcasts</header>
      <div
        className={styles.banner}
        style={{backgroundImage: `url(${channel.urls.logo_image.original})`}}
      >
        <h1 className={styles.title}>{channel.title}</h1>

        {series.length > 0 && (
          <div>
            <h2 className={styles.series}>Series</h2>
            <div className={styles.channels}>
              {series.map(serie => (
                <Link href={`/channel?id=${serie.id}`}>
                  <a className={styles.channel}>
                    <img
                      className={styles.channel_img}
                      src={serie.urls.logo_image.original}
                      alt=''
                    />
                    <h2 className={styles.series}>{serie.title}</h2>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <h2 className={styles.series}>Ultimos Podcasts</h2>
      {audios.map(audio => (
        <div className={styles.podcast} key={audio.id}>
          <Link href={`/podcast?id=${audio.id}`}>
            <a>{audio.title}</a>
          </Link>
        </div>
      ))}
    </>
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

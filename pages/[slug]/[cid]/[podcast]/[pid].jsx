import API from '../../../../utils/API';
import styles from '../../../../styles/Podcast.module.sass';
import Link from 'next/link';

export default function Podcast({audio}) {
  return (
    <>
      <header className={styles.header}>Podcasts</header>
      <div className={styles.modal}>
        <div className={styles.clip}>
          <nav className={styles.nav}>
            <Link href={`/channel?id=${audio.channel.id}`}>
              <a className={styles.close}>&lt; Volver</a>
            </Link>
          </nav>
          <picture className={styles.picture}>
            <div className={styles.container_image}>
              <img
                className={styles.image}
                src={audio.urls.image || audio.channel.urls.logo_image.original}
                alt=''
              />
            </div>
          </picture>
          <div className={styles.player}>
            <h3 className={styles.title}>{audio.title}</h3>
            <h6 className={styles.channel_title}>{audio.channel.title}</h6>
            <audio className={styles.audio} controls autoPlay>
              <source src={audio.urls.high_mp3} type='audio/mpeg' />
            </audio>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async ({query}) => {
  console.log(query);
  const id = query.pid;

  try {
    const res = await API.get(`audio_clips/${id}.mp3`);
    // https: api.audioboom.com/audio_clips/4635940.mp3
    const dataAudio = await res.data;
    const audio = await dataAudio.body.audio_clip;
    return {
      props: {
        audio,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

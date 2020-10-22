import slug from '../helpers/slug';
import styles from '../styles/PodcastPlayer.module.sass';
import Layout from './Layout.jsx';

export default function PodcastPlayer({audio, onClose}) {
  return (
    <Layout title={audio.title}>
      <div className={styles.modal}>
        <div className={styles.audio}>
          <nav>
            {onClose ? (
              <a onClick={onClose}>&lt; Volver</a>
            ) : (
              <Link
                route='channel'
                params={{slug: slug(audio.channel.title), id: audio.channel.id}}
              >
                <a className={styles.close}>&lt; Volver</a>
              </Link>
            )}
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
    </Layout>
  );
}

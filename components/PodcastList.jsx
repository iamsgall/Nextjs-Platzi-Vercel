import styles from '../styles/PodcastList.module.sass';
import Link from 'next/link';
import slug from '../helpers/slug';

export default function PodcastList({audios, channel, onClickPodcast}) {
  return (
    <div>
      <h2 className={styles.series}>Ultimos Podcasts</h2>
      {audios.map(audio => (
        <div className={styles.podcast} key={audio.id}>
          <Link
            href={`/${slug(channel.title)}/${channel.id}/podcast/${audio.id}`}
          >
            {/* /podcast?id=${audio.id} */}
            <a onClick={e => onClickPodcast(e, audio)}>{audio.title}</a>
          </Link>
        </div>
      ))}
    </div>
  );
}

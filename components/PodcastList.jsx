import styles from '../styles/PodcastList.module.sass';
import Link from 'next/link';

export default function PodcastList({audios}) {
  return (
    <div>
      <h2 className={styles.series}>Ultimos Podcasts</h2>
      {audios.map(audio => (
        <div className={styles.podcast} key={audio.id}>
          <Link href={`/podcast?id=${audio.id}`}>
            <a>{audio.title}</a>
          </Link>
        </div>
      ))}
    </div>
  );
}

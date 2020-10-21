import styles from '../styles/Series.module.sass';
import Link from 'next/link';

export default function Series({series}) {
  return (
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
  );
}

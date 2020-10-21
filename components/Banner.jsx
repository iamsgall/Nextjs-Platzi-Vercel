import styles from '../styles/Banner.module.sass';

export default function Banner({channel}) {
  return (
    <div
      className={styles.banner}
      style={{backgroundImage: `url(${channel.urls.logo_image.original})`}}
    >
      <h1 className={styles.title}>{channel.title}</h1>
    </div>
  );
}

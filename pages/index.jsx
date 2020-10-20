import styles from '../styles/Home.module.sass';
import API from '../utils/API';
import 'isomorphic-fetch';

export default function Home({channels}) {
  return (
    <>
      <header className={styles.header}>Podcasts</header>
      <div className={styles.channels}>
        {channels.map(channel => (
          <div className={styles.channel}>
            <img
              className={styles.img}
              src={channel.urls.logo_image.original}
              alt=''
            />
            <h2 className={styles.title}>{channel.title}</h2>
          </div>
        ))}
      </div>
      div
      <style jsx>{``}</style>
    </>
  );
}

// export const getServerSideProps = async ctx => {
//   const res = await fetch('https://api.audioboom.com/channels/recommended');
//   const {body: channels} = await res.json();
//   return {
//     props: {
//       channels,
//     },
//   };
// };

export const getServerSideProps = async ctx => {
  const res = await API.get('channels/recommended');
  const {body: channels} = await res.data;

  return {
    props: {
      channels,
    },
  };
};

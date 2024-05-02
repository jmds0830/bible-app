import Banner from './Banner';
import styles from '/src/styles/Layout.module.css';

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <Banner />
      </header>
      <main className={styles.main}>{children}</main>
      <footer></footer>
    </>
  );
}

export default Layout;

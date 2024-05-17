import Banner from './Banner';
import styles from '/src/styles/Layout.module.css';

function Layout({ children, showButton }) {
  return (
    <>
      <header className={styles.header}>
        <Banner showButton={showButton} />
      </header>
      <main className={styles.main}>{children}</main>
      <footer></footer>
    </>
  );
}

export default Layout;

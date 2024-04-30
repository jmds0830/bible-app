import NavBar from './NavBar';
import styles from '/src/styles/Layout.module.css';

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <NavBar />
      </header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}

export default Layout;

import { IoSearch } from 'react-icons/io5';
import { RxFontSize } from 'react-icons/rx';
import styles from '/src/styles/Banner.module.css';

function Banner({ showButton }) {
  return (
    <div className={styles.banner}>
      <h2>Bible App</h2>
      <div className={styles.buttonContainer}>
        {showButton && (
          <button className={styles.fontButton}>
            <RxFontSize className={styles.icon} />
          </button>
        )}
        <button className={styles.iconButton}>
          <IoSearch className={styles.icon} />
        </button>
      </div>
    </div>
  );
}

export default Banner;

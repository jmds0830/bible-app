import { useParams } from 'react-router-dom';
import styles from '/src/styles/TitleBar.module.css';

function TitleBar() {
  const { abbreviation, bookName, chapterId } = useParams();

  let bookTitle = '';

  if (abbreviation && bookName && !chapterId) {
    bookTitle = `${bookName}`;
  }

  if (abbreviation && bookName && chapterId) {
    bookTitle = `${bookName} ${chapterId}`;
  }

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.titleBar}>
          <button></button>
          <h3>{bookTitle}</h3>
          <button></button>
        </div>
      </div>
    </>
  );
}

export default TitleBar;

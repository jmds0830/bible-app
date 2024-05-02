import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import TitleBar from '../components/TitleBar';
import styles from '/src/styles/VersesPage.module.css';

function VersesPage() {
  const [data, setData] = useState();
  const { abbreviation, bookName, chapterId } = useParams();

  const fetchVerses = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/${abbreviation}/${bookName}/${chapterId}`
      );
      const result = await response.json();
      setData(result.verses);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchVerses();
  }, [abbreviation, bookName, chapterId]);

  return (
    <>
      <NavBar />
      <TitleBar />
      {data?.length > 0 ? (
        <div className={styles.mainContainer}>
          <div className={styles.verseContainer}>
            {data?.map((verse) => (
              <p key={verse.id} className={styles.verse}>
                <span className={styles.verseNumber}>{verse.verseId} </span>
                <span>{verse.verse}</span>
              </p>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.loading}>Loading Verses...</div>
      )}
    </>
  );
}

export default VersesPage;

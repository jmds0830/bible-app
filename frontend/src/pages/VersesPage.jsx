import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '/src/styles/VersesPage.module.css';
import SubBar from '../components/SubBar';

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
      <SubBar />
      {data?.length > 0 ? (
        <div className={styles.mainContainer}>
          <h3>
            {bookName} {chapterId}
          </h3>
          <div className={styles.verseContainer}>
            {data?.map((verse) => (
              <p key={verse.id}>
                <span>{verse.verseId} </span>
                <span>{verse.verse}</span>
              </p>
            ))}
          </div>
        </div>
      ) : (
        <p className={styles.loading}>Loading Verses...</p>
      )}
    </>
  );
}

export default VersesPage;

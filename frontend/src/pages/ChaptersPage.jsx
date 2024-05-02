import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import TitleBar from '../components/TitleBar';
import styles from '/src/styles/ChaptersPage.module.css';

function ChaptersPage() {
  const [data, setData] = useState([]);
  const { abbreviation, bookName } = useParams();
  const navigate = useNavigate();

  const handleNavigate = (chapterId) => {
    navigate(`/${abbreviation}/${bookName}/${chapterId}`);
  };

  const fetchChapters = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/${abbreviation}/${bookName}`
      );
      const result = await response.json();
      setData(result.chapters);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchChapters();
  }, [abbreviation, bookName]);

  return (
    <>
      <NavBar />
      <TitleBar />
      {data.length > 0 ? (
        <div className={styles.mainContainer}>
          <div className={styles.chapterContainer}>
            {data?.map((chapter) => (
              <div
                key={chapter.id}
                className={styles.chapter}
                onClick={() => handleNavigate(chapter.id)}
              >
                {chapter.id}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.loading}>Loading Chapters...</div>
      )}
    </>
  );
}

export default ChaptersPage;

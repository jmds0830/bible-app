import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import BookTitleBar from '../components/BookTitleBar';
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
      <BookTitleBar />
      {data?.length > 0 ? (
        <div className={styles.mainContainer}>
          <div className={styles.chapterContainer}>
            {data?.map((chapter) => (
              <button
                key={chapter.id}
                className={styles.chapter}
                onClick={() => handleNavigate(chapter.id)}
              >
                {chapter.id}
              </button>
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

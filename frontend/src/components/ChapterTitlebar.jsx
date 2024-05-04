import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from '/src/styles/TitleBar.module.css';
import { BookToIdMap } from './BookToIdMap';

function ChapterTitleBar() {
  const [bookData, setBookData] = useState(null);
  const [chapterData, setChapterData] = useState(null);
  const { abbreviation, bookName, chapterId } = useParams();
  const navigate = useNavigate();

  const bookTitle = chapterId ? `${bookName} ${chapterId}` : bookName;

  const fetchChapters = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/${abbreviation}/${bookName}`
      );
      const result = await response.json();
      setChapterData(result.chapters);
    } catch (error) {
      console.error('Error fetching chapters:', error.message);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch(`http://localhost:3000/${abbreviation}`);
      const result = await response.json();
      setBookData(result.books);
    } catch (error) {
      console.error('Error fetching books:', error.message);
    }
  };

  useEffect(() => {
    fetchChapters();
    fetchBooks();
  }, [abbreviation, bookName]);

  const handleNext = () => {
    const currentIndex = Object.values(BookToIdMap).indexOf(
      BookToIdMap[bookName]
    );
    const nextBookName = bookData && bookData[currentIndex + 1]?.name;

    const nextChapterId = parseInt(chapterId) + 1;
    if (chapterData && nextChapterId <= chapterData.length) {
      navigate(
        `/${abbreviation}/${bookName.replace(/\s+/g, '-')}/${nextChapterId}`
      );
    } else {
      navigate(`/${abbreviation}/${nextBookName.replace(/\s+/g, '-')}/1`);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleBar}>
        <button>
          <FaArrowLeft />
        </button>
        <h3>{bookTitle.replace(/-/g, ' ')}</h3>
        {bookName !== 'Revelation' || chapterId < 22 ? (
          <button className={styles.nextButton} onClick={handleNext}>
            <FaArrowRight />
          </button>
        ) : (
          <div className={styles.nextButton}></div>
        )}
      </div>
    </div>
  );
}

export default ChapterTitleBar;

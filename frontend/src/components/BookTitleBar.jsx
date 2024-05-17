import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from '/src/styles/TitleBar.module.css';
import { BookToIdMap } from './BookToIdMap';

function BookTitleBar() {
  const [bookData, setBookData] = useState(null);
  const { abbreviation, bookName } = useParams();
  const navigate = useNavigate();

  const fetchBooks = async (abbreviation) => {
    try {
      const response = await fetch(`http://localhost:3000/${abbreviation}`);
      const result = await response.json();
      setBookData(result.books);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [abbreviation]);

  const handlePrevious = () => {
    const currentIndex = Object.values(BookToIdMap).indexOf(
      BookToIdMap[bookName]
    );
    const previousBookName = bookData[currentIndex - 1].name;
    navigate(`/${abbreviation}/${previousBookName.replace(/\s+/g, '-')}`);
  };

  const handleNext = () => {
    const currentIndex = Object.values(BookToIdMap).indexOf(
      BookToIdMap[bookName]
    );
    const nextBookName = bookData[currentIndex + 1].name;
    navigate(`/${abbreviation}/${nextBookName.replace(/\s+/g, '-')}`);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleBar}>
        {bookName !== 'Genesis' ? (
          <button className={styles.nextButton} onClick={handlePrevious}>
            <FaArrowLeft />
          </button>
        ) : (
          <div className={styles.nullButton}></div>
        )}
        <h3>{bookName.replace(/-/g, ' ')}</h3>
        {bookName !== 'Revelation' ? (
          <button className={styles.nextButton} onClick={handleNext}>
            <FaArrowRight />
          </button>
        ) : (
          <div className={styles.nullButton}></div>
        )}
      </div>
    </div>
  );
}

export default BookTitleBar;

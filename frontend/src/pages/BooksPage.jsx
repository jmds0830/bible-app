import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '/src/styles/BooksPage.module.css';
import NavBar from '../components/NavBar';

function BooksPage() {
  const [data, setData] = useState();
  const { abbreviation } = useParams();
  const navigate = useNavigate();

  const handleNavigate = (bookName) => {
    navigate(`/${abbreviation}/${bookName}`);
  };

  const fetchBooks = async (abbreviation) => {
    try {
      const response = await fetch(`http://localhost:3000/${abbreviation}`);
      const result = await response.json();
      setData(result.books);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [abbreviation]);

  const index = data?.findIndex((book) => book.id === 39);
  const oldTestament = index !== -1 ? data?.slice(0, index + 1) : [];
  const newTestament = index !== -1 ? data?.slice(index + 1) : [];

  return (
    <>
      <NavBar />
      {oldTestament?.length > 0 && newTestament?.length > 0 ? (
        <div className={styles.mainContainer}>
          <div className={styles.booksContainer}>
            <div className={styles.oldTestament}>
              <h3>Old Testament</h3>
              {oldTestament?.map((book) => (
                <button
                  key={book.id}
                  className={styles.book}
                  onClick={() => handleNavigate(book.name.replace(/\s+/g, '-'))}
                >
                  {book.name}
                </button>
              ))}
            </div>
            <div className={styles.newTestament}>
              <h3>New Testament</h3>
              {newTestament?.map((book) => (
                <button
                  key={book.id}
                  className={styles.book}
                  onClick={() => handleNavigate(book.name.replace(/\s+/g, '-'))}
                >
                  {book.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.loading}>Loading Books...</div>
      )}
    </>
  );
}

export default BooksPage;

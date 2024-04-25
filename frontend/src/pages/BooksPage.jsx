import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '/src/styles/BooksPage.module.css';

function BooksPage() {
  const [books, setBooks] = useState();
  const navigate = useNavigate();
  const { abbreviation } = useParams();

  const fetchBooks = async (abbreviation) => {
    try {
      const response = await fetch(`http://localhost:3000/${abbreviation}`);
      const result = await response.json();
      setBooks(result.books);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [abbreviation]);

  const index = books?.findIndex((book) => book.id === 39);
  const oldTestament = index !== -1 ? books?.slice(0, index + 1) : [];
  const newTestament = index !== -1 ? books?.slice(index + 1) : [];

  return (
    <>
      <div className={styles.mainContainer}>
        {oldTestament?.length > 0 && newTestament?.length > 0 ? (
          <div className={styles.booksContainer}>
            <div className={styles.oldTestament}>
              <h3>Old Testament</h3>
              {oldTestament?.map((book) => (
                <div key={book.id} className={styles.book}>
                  {book.name}
                </div>
              ))}
            </div>
            <div className={styles.newTestament}>
              <h3>New Testament</h3>
              {newTestament?.map((book) => (
                <div key={book.id} className={styles.book}>
                  {book.name}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Loading Books...</p>
        )}
      </div>
    </>
  );
}

export default BooksPage;

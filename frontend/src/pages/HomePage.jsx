import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '/src/styles/HomePage.module.css';
import Navbar from '../components/NavBar';

function HomePage() {
  const [data, setData] = useState();
  const navigate = useNavigate();

  const handleNavigate = (abbreviation) => {
    navigate(`/${abbreviation}`);
  };

  const fetchTranslations = async () => {
    try {
      const response = await fetch('http://localhost:3000/');
      const result = await response.json();
      setData(result.translations);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchTranslations();
  }, []);

  return (
    <>
      <Navbar />
      {data?.length > 0 ? (
        <div className={styles.mainContainer}>
          <div className={styles.translationsContainer}>
            {data?.map((translation) => (
              <div key={translation.id} className={styles.translation}>
                <span className={styles.title}>{translation.abbreviation}</span>
                <span className={styles.subtitle}>
                  {translation.version === 'American Standard-ASV1901'
                    ? 'American Standard'
                    : translation.version}
                </span>
                <button
                  className={styles.button}
                  onClick={() => handleNavigate(translation.abbreviation)}
                >
                  Read
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.loading}>Loading Translations...</div>
      )}
    </>
  );
}

export default HomePage;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '/src/styles/HomePage.module.css';

function HomePage() {
  const [translations, setTranslations] = useState();
  const navigate = useNavigate();

  const handleNavigate = (abbreviation) => {
    navigate(`/${abbreviation}`);
  };

  const fetchTranslations = async () => {
    try {
      const response = await fetch('http://localhost:3000/');
      const result = await response.json();
      setTranslations(result.translations);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchTranslations();
    console.log(translations);
  }, []);

  return (
    <>
      {translations?.length > 0 ? (
        <div className={styles.mainContainer}>
          <h3>Available Translations</h3>
          <div className={styles.translationsContainer}>
            {translations?.map((translation) => (
              <div key={translation.id} className={styles.translation}>
                <span className={styles.title}>{translation.abbreviation}</span>
                <span className={styles.subtitle}>{translation.version}</span>
                <button
                  onClick={() => handleNavigate(translation.abbreviation)}
                >
                  Read
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading Translations...</p>
      )}
    </>
  );
}

export default HomePage;

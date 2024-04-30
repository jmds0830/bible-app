import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '/src/styles/HomePage.module.css';
import SubBar from '../components/SubBar';

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
      <SubBar />
      {data?.length > 0 ? (
        <div className={styles.mainContainer}>
          <h3>Available Translations</h3>
          <div className={styles.translationsContainer}>
            {data?.map((translation) => (
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
        <p className={styles.loading}>Loading Translations...</p>
      )}
    </>
  );
}

export default HomePage;

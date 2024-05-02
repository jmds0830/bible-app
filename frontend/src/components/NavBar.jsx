import { useParams } from 'react-router-dom';
import { PiGreaterThan } from 'react-icons/pi';
import styles from '/src/styles/NavBar.module.css';

function NavBar() {
  const { abbreviation, bookName, chapterId } = useParams();

  const array = [];

  if (abbreviation && !bookName && !chapterId) {
    array.push('Home', abbreviation);
  } else if (abbreviation && bookName && !chapterId) {
    array.push('Home', abbreviation, bookName);
  } else if (abbreviation && bookName && chapterId) {
    array.push('Home', abbreviation, bookName, `Chapter ${chapterId}`);
  } else {
    array.push('Home');
  }

  const lastItem = array[array.length - 1];

  return (
    <>
      <div className={styles.navBar}>
        <div className={styles.navigationContainer}>
          {array.map((item, index) => (
            <span key={index} className={styles.navigation}>
              {index > 0 ? <PiGreaterThan className={styles.icon} /> : ''}
              <span className={item === lastItem ? styles.bold : ''}>
                {item}
              </span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default NavBar;

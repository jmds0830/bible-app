import { Link, useParams } from 'react-router-dom';
import { PiGreaterThan } from 'react-icons/pi';
import styles from '/src/styles/NavBar.module.css';

function NavBar() {
  const { abbreviation, bookName, chapterId } = useParams();
  const array = [];

  if (abbreviation && !bookName && !chapterId) {
    array.push({ label: 'Home', path: '/' });
    array.push({ label: abbreviation, path: `/${abbreviation}` });
  } else if (abbreviation && bookName && !chapterId) {
    array.push({ label: 'Home', path: '/' });
    array.push({ label: abbreviation, path: `/${abbreviation}` });
    array.push({
      label: `${bookName.replace(/-/g, ' ')}`,
      path: `/${abbreviation}/${bookName}`,
    });
  } else if (abbreviation && bookName && chapterId) {
    array.push({ label: 'Home', path: '/' });
    array.push({ label: abbreviation, path: `/${abbreviation}` });
    array.push({
      label: `${bookName.replace(/-/g, ' ')}`,
      path: `/${abbreviation}/${bookName}`,
    });
    array.push({
      label: `${chapterId}`,
      path: `/${abbreviation}/${bookName}/${chapterId}`,
    });
  } else {
    array.push({ label: 'Home', path: '/' });
  }

  const lastItem = array[array.length - 1];

  return (
    <>
      <div className={styles.navBar}>
        <div className={styles.navigationContainer}>
          {array.map((item, index) => (
            <span key={index} className={styles.navigation}>
              {index > 0 ? <PiGreaterThan className={styles.icon} /> : ''}
              <Link
                to={item.path}
                className={item === lastItem ? styles.bold : styles.link}
              >
                {item.label}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default NavBar;

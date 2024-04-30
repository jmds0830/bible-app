import { useParams } from 'react-router-dom';
import styles from '/src/styles/SubBar.module.css';

function SubBar() {
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
      <div>
        {array.map((item, index) => (
          <span key={index}>
            {index > 0 ? ' > ' : ''}
            <span className={item === lastItem ? styles.bold : ''}>{item}</span>
          </span>
        ))}
      </div>
    </>
  );
}

export default SubBar;

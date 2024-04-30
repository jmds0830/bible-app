import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '/src/styles/ChaptersPage.module.css';

function ChaptersPage() {
  const [data, setData] = useState([]);
  const { abbreviation, bookName } = useParams();
  const navigate = useNavigate();

  const handleNavigate = (chapterId) => {
    navigate(`/${abbreviation}/${bookName}/${chapterId}`);
  };

  const fetchChapters = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/${abbreviation}/${bookName}`
      );
      const result = await response.json();
      setData(result.chapters);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchChapters();
  }, [abbreviation, bookName]);

  return (
    <>
      {data.length > 0 ? (
        <div>
          {data?.map((chapter) => (
            <div key={chapter.id} onClick={() => handleNavigate(chapter.id)}>
              {chapter.id}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading Chapters...</p>
      )}
    </>
  );
}

export default ChaptersPage;

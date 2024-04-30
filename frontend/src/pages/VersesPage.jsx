import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function VersesPage() {
  const [data, setData] = useState();
  const { abbreviation, bookName, chapterId } = useParams();

  const fetchVerses = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/${abbreviation}/${bookName}/${chapterId}`
      );
      const result = await response.json();
      setData(result.verses);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchVerses();
  }, [abbreviation, bookName, chapterId]);

  return (
    <>
      {data?.length > 0 ? (
        <div>
          <h3>
            {bookName} {chapterId}
          </h3>
          <div>
            {data?.map((verse) => (
              <div key={verse.id}>
                <span>{verse.verseId} </span>
                <span>{verse.verse}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading Verses...</p>
      )}
    </>
  );
}

export default VersesPage;

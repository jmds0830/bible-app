import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ChaptersPage() {
  const [chapters, setChapters] = useState();
  const { abbreviation, bookName } = useParams();

  const fetchChapters = async (abbreviation, bookName) => {
    try {
      const response = await fetch(
        `http://localhost:3000/${abbreviation}/${bookName}`
      );
      const result = response.json();
      setChapters(result.chapters);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  return (
    <>
      <div></div>
    </>
  );
}

export default ChaptersPage;

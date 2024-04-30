import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import ChaptersPage from './pages/ChaptersPage';
import VersesPage from './pages/VersesPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/:abbreviation',
    element: <BooksPage />,
  },
  {
    path: '/:abbreviation/:bookName',
    element: <ChaptersPage />,
  },
  {
    path: '/:abbreviation/:bookName/:chapterId',
    element: <VersesPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;

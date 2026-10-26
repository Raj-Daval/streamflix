import React from 'react';
import { createBrowserRouter } from 'react-router';
import App from '../App';
import Home from '../pages/Home';
import Search from '../pages/Search';
import MovieDetails from '../pages/MovieDetails';
import MyList from '../pages/MyList';
import NotFound from '../pages/NotFound';
import WatchMovie from '../components/WatchMovie';
import Recent from '../pages/recent';

export const router = createBrowserRouter([
  {
    path: '/', element: <App />, children: [
      { index: true, element: <Home /> },
      { path: 'search', element: <Search /> },
      { path: 'movie/:movieId', element: <MovieDetails /> },
      { path: 'watch/:movieId', element: <WatchMovie /> },
      { path: 'my-list', element: <MyList /> },
      { path: '*', element: <NotFound /> },
      {
  path: '/recent',
  element: <Recent />,
}
    ],
  },
]);

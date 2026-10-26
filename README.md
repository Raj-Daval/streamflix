# StreamFlix — React Netflix-inspired clone

A front-end-only streaming discovery project built with React, Vite, React Router, Redux Toolkit, and plain CSS. **Movie information is stored in a local JavaScript array of objects. No movie API or backend is used.**

## Features
- Responsive Netflix-inspired home page and featured hero banner
- Static local catalogue with trending, popular, top-rated, recent, and genre rows
- Search by movie title, overview, and genre, with sorting
- Movie detail pages with genres, release date, runtime, rating, facts, and recommendations
- Trailer modal using YouTube embed links included in the local data
- Redux Toolkit store for catalogue data and watchlist actions
- My List persisted to localStorage
- React Router pages: Home, Discover/Search, Movie Details, My List, Not Found
- Context API preference for compact/comfortable cards
- Hooks: `useState`, `useMemo`, `useCallback`, `useRef`, `useEffect`, `useContext`, `useSelector`, `useDispatch`, `useParams`, `useSearchParams`
- Responsive mobile navigation, horizontal movie rows, loading-free local data, and image fallbacks

## Setup
1. Install Node.js LTS.
2. Extract this folder and open it in VS Code.
3. Open a terminal in the project folder.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open the local URL printed by Vite.
7. Run `npm run build` to check the production build.

## Project structure
```text
src/
  app/                 Redux store and React Router setup
  components/          Navbar, hero, movie cards/rows, trailer modal
  context/             Context API display preference
  data/movies.js       Local array of movie objects and genres
  features/movies/      Redux slice for the local catalogue
  features/watchlist/   Redux slice and localStorage persistence
  pages/                Home, Search, Movie Details, My List, Not Found
  services/             Artwork URL helpers (no API calls)
  styles.css            Responsive application styling
```

## Important notes
- The app uses sample movie metadata maintained in `src/data/movies.js`. Edit or add objects there to change the catalogue.
- Poster and backdrop artwork is loaded from static image URLs. This is not a movie-data API request; an internet connection is needed to load those images.
- Trailer buttons open the YouTube trailer IDs stored in the local data. Availability can change over time.
- This is a learning/portfolio project, not Netflix, and is not affiliated with Netflix. It does not provide access to Netflix's licensed catalogue or streaming service.

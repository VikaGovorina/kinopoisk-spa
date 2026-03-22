import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MoviePage from "../pages/MoviePage/MoviePage";
import FavoritesPage from "../pages/FavoritesPage";

export const router = createBrowserRouter([ 
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/movie/:id",
        element: <MoviePage />,
    },
    {
        path: "/favorites",
        element: <FavoritesPage />,
    },
]);
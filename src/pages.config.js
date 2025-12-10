import Home from './pages/Home';
import BrowseVans from './pages/BrowseVans';
import VanDetail from './pages/VanDetail';
import ListVan from './pages/ListVan';
import About from './pages/About';
import Contact from './pages/Contact';
import MyListings from './pages/MyListings';
import Blog from './pages/Blog';
import BlogArticle from './pages/BlogArticle';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "BrowseVans": BrowseVans,
    "VanDetail": VanDetail,
    "ListVan": ListVan,
    "About": About,
    "Contact": Contact,
    "MyListings": MyListings,
    "Blog": Blog,
    "BlogArticle": BlogArticle,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};
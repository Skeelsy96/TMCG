import Home from './pages/Home';
import BrowseVans from './pages/BrowseVans';
import VanDetail from './pages/VanDetail';
import ListVan from './pages/ListVan';
import About from './pages/About';
import Contact from './pages/Contact';
import MyListings from './pages/MyListings';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "BrowseVans": BrowseVans,
    "VanDetail": VanDetail,
    "ListVan": ListVan,
    "About": About,
    "Contact": Contact,
    "MyListings": MyListings,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};
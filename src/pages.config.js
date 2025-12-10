import Home from './pages/Home';
import BrowseVans from './pages/BrowseVans';
import VanDetail from './pages/VanDetail';
import ListVan from './pages/ListVan';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "BrowseVans": BrowseVans,
    "VanDetail": VanDetail,
    "ListVan": ListVan,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};
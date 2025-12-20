import Home from './pages/Home';
import BrowseVans from './pages/BrowseVans';
import VanDetail from './pages/VanDetail';
import ListVan from './pages/ListVan';
import About from './pages/About';
import Contact from './pages/Contact';
import MyListings from './pages/MyListings';
import Blog from './pages/Blog';
import BlogArticle from './pages/BlogArticle';
import TMCGHome from './pages/TMCGHome';
import BookCall from './pages/BookCall';
import NewVans from './pages/NewVans';
import CompactVan from './pages/CompactVan';
import LargeVan from './pages/LargeVan';
import WalkInVan from './pages/WalkInVan';
import CustomVan from './pages/CustomVan';
import FitOuts from './pages/FitOuts';
import SUVFitOut from './pages/SUVFitOut';
import UteFitOut from './pages/UteFitOut';
import Classifieds from './pages/Classifieds';
import EarlyBirdCoffee from './pages/EarlyBirdCoffee';
import Events from './pages/Events';
import FinanceOptions from './pages/FinanceOptions';
import ValiantFinance from './pages/ValiantFinance';
import Resources from './pages/Resources';
import TMCGAbout from './pages/TMCGAbout';
import TMCGContact from './pages/TMCGContact';
import OperatorProfile from './pages/OperatorProfile';
import BrowseOperators from './pages/BrowseOperators';
import OperatorApplication from './pages/OperatorApplication';
import AdminOperatorApplications from './pages/AdminOperatorApplications';
import VanConfigurator from './pages/VanConfigurator';
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
    "TMCGHome": TMCGHome,
    "BookCall": BookCall,
    "NewVans": NewVans,
    "CompactVan": CompactVan,
    "LargeVan": LargeVan,
    "WalkInVan": WalkInVan,
    "CustomVan": CustomVan,
    "FitOuts": FitOuts,
    "SUVFitOut": SUVFitOut,
    "UteFitOut": UteFitOut,
    "Classifieds": Classifieds,
    "EarlyBirdCoffee": EarlyBirdCoffee,
    "Events": Events,
    "FinanceOptions": FinanceOptions,
    "ValiantFinance": ValiantFinance,
    "Resources": Resources,
    "TMCGAbout": TMCGAbout,
    "TMCGContact": TMCGContact,
    "OperatorProfile": OperatorProfile,
    "BrowseOperators": BrowseOperators,
    "OperatorApplication": OperatorApplication,
    "AdminOperatorApplications": AdminOperatorApplications,
    "VanConfigurator": VanConfigurator,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};
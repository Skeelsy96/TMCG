/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import About from './pages/About';
import AdminContent from './pages/AdminContent';
import AdminDashboard from './pages/AdminDashboard';
import AdminEvents from './pages/AdminEvents';
import AdminFeedback from './pages/AdminFeedback';
import AdminOperatorApplications from './pages/AdminOperatorApplications';
import Blog from './pages/Blog';
import BlogArticle from './pages/BlogArticle';
import BookCall from './pages/BookCall';
import BrowseEvents from './pages/BrowseEvents';
import BrowseOperators from './pages/BrowseOperators';
import BrowseVans from './pages/BrowseVans';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ChooseListingPackage from './pages/ChooseListingPackage';
import Classifieds from './pages/Classifieds';
import CompactVan from './pages/CompactVan';
import Contact from './pages/Contact';
import CustomVan from './pages/CustomVan';
import EarlyBirdCoffee from './pages/EarlyBirdCoffee';
import EventDetail from './pages/EventDetail';
import Events from './pages/Events';
import FinanceOptions from './pages/FinanceOptions';
import FitOuts from './pages/FitOuts';
import Home from './pages/Home';
import LargeVan from './pages/LargeVan';
import ListVan from './pages/ListVan';
import MyListings from './pages/MyListings';
import NewVans from './pages/NewVans';
import OperatorApplication from './pages/OperatorApplication';
import OperatorProfile from './pages/OperatorProfile';
import PostEvent from './pages/PostEvent';
import ProductDetail from './pages/ProductDetail';
import Resources from './pages/Resources';
import SUVFitOut from './pages/SUVFitOut';
import TMCGAbout from './pages/TMCGAbout';
import TMCGContact from './pages/TMCGContact';
import TMCGHome from './pages/TMCGHome';
import UteFitOut from './pages/UteFitOut';
import ValiantFinance from './pages/ValiantFinance';
import VanConfigurator from './pages/VanConfigurator';
import VanDetail from './pages/VanDetail';
import WalkInVan from './pages/WalkInVan';
import Account from './pages/Account';
import MyOrders from './pages/MyOrders';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AdminContent": AdminContent,
    "AdminDashboard": AdminDashboard,
    "AdminEvents": AdminEvents,
    "AdminFeedback": AdminFeedback,
    "AdminOperatorApplications": AdminOperatorApplications,
    "Blog": Blog,
    "BlogArticle": BlogArticle,
    "BookCall": BookCall,
    "BrowseEvents": BrowseEvents,
    "BrowseOperators": BrowseOperators,
    "BrowseVans": BrowseVans,
    "Cart": Cart,
    "Checkout": Checkout,
    "ChooseListingPackage": ChooseListingPackage,
    "Classifieds": Classifieds,
    "CompactVan": CompactVan,
    "Contact": Contact,
    "CustomVan": CustomVan,
    "EarlyBirdCoffee": EarlyBirdCoffee,
    "EventDetail": EventDetail,
    "Events": Events,
    "FinanceOptions": FinanceOptions,
    "FitOuts": FitOuts,
    "Home": Home,
    "LargeVan": LargeVan,
    "ListVan": ListVan,
    "MyListings": MyListings,
    "NewVans": NewVans,
    "OperatorApplication": OperatorApplication,
    "OperatorProfile": OperatorProfile,
    "PostEvent": PostEvent,
    "ProductDetail": ProductDetail,
    "Resources": Resources,
    "SUVFitOut": SUVFitOut,
    "TMCGAbout": TMCGAbout,
    "TMCGContact": TMCGContact,
    "TMCGHome": TMCGHome,
    "UteFitOut": UteFitOut,
    "ValiantFinance": ValiantFinance,
    "VanConfigurator": VanConfigurator,
    "VanDetail": VanDetail,
    "WalkInVan": WalkInVan,
    "Account": Account,
    "MyOrders": MyOrders,
}

export const pagesConfig = {
    mainPage: "TMCGHome",
    Pages: PAGES,
    Layout: __Layout,
};
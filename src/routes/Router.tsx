import { createBrowserRouter } from 'react-router-dom';

import Routes from './Routes';

import App from '../App';

import Home from '../pages/Home';
import About from '../pages/About';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Favorites from '../pages/Favorites';
import MyCards from '../pages/MyCards';
import CreateCard from '../pages/CreateCard';
import EditCard from '../pages/EditCard';
import ShowCard from '../pages/ShowCard';
import Error404 from '../pages/Error404';
import Panel from '../pages/Panel';
import UpdateUser from '../pages/UpdateUser';

import AuthGuard from '../guard/AuthGuard';
import BuisnessGuard from '../guard/BusinessGuard';


export default createBrowserRouter([{
    path: '/',
    element: <App />,
    children: [[Routes.Home, <Home />],
    [Routes.About, <About />],
    [Routes.Register, <Register />],
    [Routes.Login, <Login />],
    [Routes.Logout, <Logout />],
    [Routes.Favorites, <Favorites />],
    [Routes.MyCards, <MyCards />],
    [Routes.CreateCard, <AuthGuard><BuisnessGuard><CreateCard /></BuisnessGuard></AuthGuard>],
    [Routes.AdminPanel, <AuthGuard><BuisnessGuard><Panel /></BuisnessGuard></AuthGuard>],
    [`${Routes.Update}/:id`, <AuthGuard><BuisnessGuard><UpdateUser /></BuisnessGuard></AuthGuard>],
    [`${Routes.EditCard}/:id`, <EditCard />],
    [`${Routes.Card}/:id`, <ShowCard />],
    ['*', <Error404 />]
    ].map(i => { return { path: String(i[0]), element: i[1] } })
}]);
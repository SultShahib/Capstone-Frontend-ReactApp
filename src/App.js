import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './App.scss';

import { BrowserRouter, Route } from 'react-router-dom';

import Catalog from './pages/Catalog';
import Detail from './pages/detail/Detail';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Routes from './config/Routes';
import Favourite from './pages/favourite/Favourite';
import AddMovie from './pages/admin/AddMovie';
import Dashboard from './pages/admin/Dashboard';
import DeleteMovie from './pages/admin/DeleteMovie';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/favourite/:userid' exact component={Favourite} />
        <Route path='/register' exact component={Register} />
        <Route path='/dashboard/:userid' exact component={Dashboard} />
        <Route path='/dashboard/addMovie/:userid' exact component={AddMovie} />
        <Route
          path='/dashboard/addMovie/:userid'
          exact
          component={DeleteMovie}
        />
        <Route path='/:category/:userid/search/:keyword' component={Catalog} />
        <Route path='/:category/:userid/:id' component={Detail} />
        <Route path='/:category/:userid' component={Catalog} />
        <Route path='/' component={Login} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

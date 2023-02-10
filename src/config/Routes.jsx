import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Favourite from '../pages/favourite/Favourite';
import Dashboard from '../pages/admin/Dashboard';
import AddMovie from '../pages/admin/AddMovie';
import DeleteMovie from '../pages/admin/DeleteMovie';
const Routes = () => {
  return (
    <Switch>
      <Route path='/favourite/:userid' exact component={Favourite} />
      <Route path='/register' exact component={Register} />
      <Route path='/dashboard/:userid' exact component={Dashboard} />
      <Route path='/dashboard/addMovie/:userid' exact component={AddMovie} />
      <Route
        path='/dashboard/deleteMovie/:userid'
        exact
        component={DeleteMovie}
      />
      <Route path='/:category/:userid/search/:keyword' component={Catalog} />
      <Route path='/:category/:userid/:id' component={Detail} />
      <Route path='/:category/:userid' component={Catalog} />
      <Route path='/' component={Login} />
    </Switch>
  );
};

export default Routes;

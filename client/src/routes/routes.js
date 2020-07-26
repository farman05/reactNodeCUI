import React from 'react';

const Dashboard = React.lazy(() => import('../views/Dashboard/index'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home',component: Dashboard },
  // { path: '/',exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/admin',exact: true, name: 'Compression', component: Dashboard },


];

export default routes;

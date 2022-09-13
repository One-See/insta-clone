import './App.css';

import { lazy, Suspense } from 'react';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import * as ROUTES from './constants/routes'
import userContext from './context/user';
import useAuthListner from './hooks/user_auth_listener';

const Dashboard = lazy(() => import('./pages/dashboard'))
const Login = lazy(() => import('./pages/login'))
const Signup = lazy(() => import('./pages/signup'))
const Profile = lazy(() => import('./pages/profile'))
const Notfound = lazy(() => import('./pages/notfound'))

function App() {

  const {user} = useAuthListner()

  return (
    <userContext.Provider value={{user}}>
      <Router>
        <Suspense fallback={<p>...loading</p>}>
          <Routes>
            <Route path={ROUTES.LOGIN_PAGE} element={<Login />} exact />
            <Route path={ROUTES.SIGN_UP_PAGE} element={<Signup />} exact />
            <Route path={ROUTES.DASHBOARD_PAGE} element={<Dashboard />} exact/>
            <Route path={ROUTES.PROFILE_PAGE} element={<Profile />} exact />
            <Route path={'*'} element={<Notfound />} exact />
          </Routes>
        </Suspense>
      </Router>
    </userContext.Provider>
  );
}

export default App;

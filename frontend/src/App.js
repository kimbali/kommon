import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import frontRoutes from './config/frontRoutes';
import MainLayout from './components/mainLayout/MainLayout';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import AdminRoute from './components/adminRoute/AdminRoute';
import RecipeDetails from './pages/RecipeDetails';
import Recipes from './pages/Recipes';
import Users from './pages/Users';
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';
import Diet from './pages/Diet';
import Workouts from './pages/Workouts';
import Meditations from './pages/Meditations';
import Progress from './pages/Progress';

function App() {
  return (
    <Router>
      <div className='main-container'>
        <Toaster />
        <ScrollToTop />

        <Routes>
          <Route path={frontRoutes.register} element={<Register />} />
          <Route path={frontRoutes.login} element={<Login />} />

          <Route element={<MainLayout />}>
            <Route path={frontRoutes.main} element={<Main />} />
            <Route path={frontRoutes.diet} element={<Diet />} />
            <Route path={frontRoutes.workouts} element={<Workouts />} />
            <Route path={frontRoutes.meditation} element={<Meditations />} />
            <Route path={frontRoutes.progress} element={<Progress />} />
          </Route>

          <Route path='' element={<AdminRoute />}>
            <Route path={frontRoutes.users} element={<Users />} />
            <Route path={frontRoutes.recipes} element={<Recipes />} />
            <Route
              path={frontRoutes.recipeDetails}
              element={<RecipeDetails />}
            />
          </Route>

          <Route path='*' element={<div>Not found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Storybook from './pages/Storybook';
import MainLayout from './components/mainLayout/MainLayout';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import RecipeDetails from './pages/RecipeDetails';
import Recipes from './pages/Recipes';
import frontRoutes from './config/frontUrls';

function App() {
  return (
    <Router>
      <div className='main-container'>
        <Toaster />
        <ScrollToTop />
        <Routes>
          <Route path='/storybook' element={<Storybook />} exact />

          <Route element={<MainLayout />}>
            <Route>
              <Route path={frontRoutes.recipes} element={<Recipes />} exact />
              <Route
                path={frontRoutes.recipeDetails}
                element={<RecipeDetails />}
                exact
              />

              <Route index element={<Navigate to={frontRoutes.recipes} />} />
              <Route path='*' element={<div>Not found</div>} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

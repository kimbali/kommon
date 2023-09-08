import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Storybook from './pages/Storybook';
import MainLayout from './components/mainLayout/MainLayout';
import ScrollToTop from './components/scrollToTop/ScrollToTop';

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
              <Route path='*' element={<dia>Not found</dia>} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from './slices/authSlice';
import toast, { Toaster } from 'react-hot-toast';
import frontRoutes from './config/frontRoutes';
import MainLayout from './components/layout/MainLayout';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import AdminLayout from './components/layout/AdminLayout';
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
import WorkoutsConfig from './pages/WorkoutsConfig';
import MeditationsConfig from './pages/MeditationsConfig';
import TasksConfig from './pages/TasksConfig';
import WorkoutDetails from './pages/WorkoutDetails';
import Planning from './pages/Planning';
import Home from './pages/Home';
import Footer from './components/footer/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import CookiesFiles from './pages/CookiesFiles';
import PlainLayout from './components/layout/PlainLayout';
import {
  useCreateLegalMutation,
  useGetLegalsQuery,
} from './slices/legalsApiSlice';

function App() {
  const dispatch = useDispatch();
  const { data: legalsData } = useGetLegalsQuery({});
  const [createLegalDoc] = useCreateLegalMutation();

  const createLegals = async () => {
    try {
      await createLegalDoc();
    } catch (err) {
      toast.error('No terms and conditions');
    }
  };

  useEffect(() => {
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > expirationTime) {
        dispatch(logout());
      }
    }
  }, [dispatch]);

  console.log('app', legalsData);

  useEffect(() => {
    if (legalsData?.legals.length === 0) {
      createLegals();
    }
  }, [legalsData]);

  return (
    <Router>
      <div className='app-container'>
        <Toaster />
        <ScrollToTop />

        <Routes>
          <Route path={frontRoutes.register} element={<Register />} />
          <Route path={frontRoutes.login} element={<Login />} />
          <Route path={frontRoutes.home} element={<Home />} />

          <Route element={<PlainLayout />}>
            <Route
              path={frontRoutes.privacyPolicy}
              element={<PrivacyPolicy />}
            />
            <Route path={frontRoutes.terms} element={<TermsAndConditions />} />
            <Route path={frontRoutes.cookies} element={<CookiesFiles />} />
          </Route>

          <Route element={<MainLayout />}>
            <Route path={frontRoutes.main} element={<Main />} />
            <Route path={frontRoutes.diet} element={<Diet />} />
            <Route path={frontRoutes.workouts} element={<Workouts />} />
            <Route path={frontRoutes.meditation} element={<Meditations />} />
            <Route path={frontRoutes.progress} element={<Progress />} />
          </Route>

          <Route path='' element={<AdminLayout />}>
            <Route path={frontRoutes.planning} element={<Planning />} />
            <Route path={frontRoutes.users} element={<Users />} />
            <Route path={frontRoutes.dietsConfig} element={<Recipes />} />
            <Route
              path={frontRoutes.recipeDetails}
              element={<RecipeDetails />}
            />
            <Route
              path={frontRoutes.workoutsConfig}
              element={<WorkoutsConfig />}
            />
            <Route
              path={frontRoutes.workoutDetails}
              element={<WorkoutDetails />}
            />
            <Route
              path={frontRoutes.meditationsConfig}
              element={<MeditationsConfig />}
            />
            <Route path={frontRoutes.tasksConfig} element={<TasksConfig />} />
          </Route>

          <Route path='*' element={<div>Not found</div>} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

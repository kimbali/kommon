import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import Footer from './components/footer/Footer';
import AdminLayout from './components/layout/AdminLayout';
import FrontofficeLayout from './components/layout/FrontofficeLayout';
import PlainLayout from './components/layout/PlainLayout';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import {
  COOKIE_DISCLAIMER,
  EXPIRATION_TIME,
  MARATHON_ID,
} from './config/constants';
import frontRoutes from './config/frontRoutes';
import { useMarathon } from './context/marathonContext';
import AvisoLegal from './pages/AvisoLegal';
import CookiesFiles from './pages/CookiesFiles';
import Diet from './pages/Diet';
import DietDetailsMain from './pages/DietDetailsMain';
import Home from './pages/Home';
import IngredientsConfig from './pages/IngredientsConfig';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Main from './pages/Main';
import MarathonsList from './pages/MarathonsList';
import MeditationDetails from './pages/MeditationDetails';
import MeditationDetailsMain from './pages/MeditationDetailsMain';
import Meditations from './pages/Meditations';
import MeditationsConfig from './pages/MeditationsConfig';
import Payment from './pages/Payment';
import Planning from './pages/Planning';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Progress from './pages/Progress';
import RecipeDetails from './pages/RecipeDetails';
import Recipes from './pages/Recipes';
import Register from './pages/Register';
import TasksConfig from './pages/TasksConfig';
import TermsAndConditions from './pages/TermsAndConditions';
import Users from './pages/Users';
import WorkoutDetails from './pages/WorkoutDetails';
import WorkoutDetailsMain from './pages/WorkoutDetailsMain';
import Workouts from './pages/Workouts';
import WorkoutsConfig from './pages/WorkoutsConfig';
import { logout } from './slices/authSlice';
import {
  useCreateLegalMutation,
  useGetLegalsQuery,
} from './slices/legalsApiSlice';
import { useGetUserProfileQuery } from './slices/usersApiSlices';
import { useUser } from './context/userContext';
import UserMarathons from './pages/UserMarathons';
import UserProfile from './pages/UserProfile';
import UserMore from './pages/UserMore';
import { useProgress } from './context/progressContext';
import Configuration from './pages/Configuration';
import { useTranslation } from 'react-i18next';
import CookiesDisclaimer from './components/cookies/CookiesDisclaimer';
import UserPayment from './pages/UserPayment';
import CaloriesCalculator from './pages/CaloriesCalculator';
import {
  useCreateConfigMutation,
  useGetConfigsQuery,
} from './slices/configApiSlice';
import { useConfig } from './context/configContext';
import ContactUs from './pages/ContactUs';
import ResetPassword from './pages/ResetPassword';

function App() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { updateConfig } = useConfig();
  const { updateUser } = useUser();
  const { setMarathonId, marathonId } = useMarathon();
  const { updateUserProgress } = useProgress();
  const [showCookies, setShowCookies] = useState(false);

  const { data: userData } = useGetUserProfileQuery();
  const { data: legalsData } = useGetLegalsQuery();
  const { data: configData } = useGetConfigsQuery();
  const [createLegalDoc] = useCreateLegalMutation();
  const [createConfigDoc] = useCreateConfigMutation();

  useEffect(() => {
    const localCookie = sessionStorage.getItem(COOKIE_DISCLAIMER);

    if (!localCookie) {
      setShowCookies(true);
    }
  }, []);

  useEffect(() => {
    if (userData) {
      updateUser(userData);
    }

    if (userData?.progresses.length > 0) {
      if (marathonId) {
        const userProgress = userData?.progresses.find(
          ele => ele.marathon._id === marathonId
        );

        if (userProgress) {
          updateUserProgress(userProgress);
        }
      }
    }
  }, [userData, marathonId]);

  const createLegals = async () => {
    try {
      await createLegalDoc();
    } catch (err) {
      toast.error(t('noTermsAndCon'));
    }
  };

  const createConfig = async () => {
    try {
      await createConfigDoc();
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (legalsData?.legals.length === 0) {
      createLegals();
    }
  }, [legalsData]);

  useEffect(() => {
    if (!configData) {
      return;
    }

    if (configData?.length === 0) {
      const config = createConfig();
      updateConfig(config);
    } else {
      updateConfig(configData[0]);
    }
  }, [configData]);

  useEffect(() => {
    const expirationTime = sessionStorage.getItem(EXPIRATION_TIME);
    if (expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > expirationTime) {
        dispatch(logout());
      }
    }
  }, []);

  const handleSearchParam = (paramKey, handleParam) => {
    const storageId = sessionStorage.getItem(paramKey);
    const urlparam = searchParams.get(paramKey);

    if (urlparam && storageId !== urlparam) {
      sessionStorage.setItem(paramKey, urlparam);
      handleParam(urlparam);
    } else {
      handleParam(storageId);
    }

    searchParams.delete(paramKey);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    handleSearchParam(MARATHON_ID, setMarathonId);
  }, [searchParams]);

  return (
    <div className='app-container'>
      <Toaster />
      <ScrollToTop />

      <Routes>
        <Route path={frontRoutes.home} element={<Home />} />
        <Route path={frontRoutes.register} element={<Register />} />
        <Route path={frontRoutes.login} element={<Login />} />
        <Route path={frontRoutes.resetPassword} element={<ResetPassword />} />
        <Route path={frontRoutes.payment} element={<Payment />} />
        <Route path={frontRoutes.logout} element={<Logout />} />

        <Route element={<PlainLayout />}>
          <Route path={frontRoutes.privacyPolicy} element={<PrivacyPolicy />} />
          <Route path={frontRoutes.terms} element={<TermsAndConditions />} />
          <Route path={frontRoutes.cookies} element={<CookiesFiles />} />
          <Route path={frontRoutes.avisoLegal} element={<AvisoLegal />} />
        </Route>

        <Route element={<FrontofficeLayout />}>
          <Route path={`${frontRoutes.main}`} element={<Main />} />
          <Route path={frontRoutes.diet} element={<Diet />} />
          <Route
            path={`${frontRoutes.diet}/:id`}
            element={<DietDetailsMain />}
          />
          <Route path={frontRoutes.workouts} element={<Workouts />} />
          <Route
            path={frontRoutes.workoutDetailsMain}
            element={<WorkoutDetailsMain />}
          />
          <Route path={frontRoutes.meditations} element={<Meditations />} />
          <Route
            path={frontRoutes.meditationDetailsMain}
            element={<MeditationDetailsMain />}
          />
          <Route path={frontRoutes.progress} element={<Progress />} />
          <Route path={frontRoutes.profile} element={<UserProfile />} />
          <Route path={frontRoutes.more} element={<UserMore />} />
          <Route
            path={frontRoutes.profileMarathons}
            element={<UserMarathons />}
          />
          <Route path={frontRoutes.userPayment} element={<UserPayment />} />
          <Route path={frontRoutes.contactUs} element={<ContactUs />} />
          <Route
            path={frontRoutes.caloriesCalculator}
            element={<CaloriesCalculator />}
          />
        </Route>

        <Route path='' element={<AdminLayout />}>
          <Route path={frontRoutes.marathonList} element={<MarathonsList />} />
          <Route path={`${frontRoutes.planning}`} element={<Planning />} />
          <Route path={frontRoutes.users} element={<Users />} />
          <Route path={frontRoutes.dietsConfig} element={<Recipes />} />
          <Route path={frontRoutes.recipeDetails} element={<RecipeDetails />} />
          <Route
            path={frontRoutes.ingredients}
            element={<IngredientsConfig />}
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
          <Route
            path={frontRoutes.meditationDetails}
            element={<MeditationDetails />}
          />
          <Route path={frontRoutes.tasksConfig} element={<TasksConfig />} />
          <Route path={frontRoutes.config} element={<Configuration />} />
        </Route>

        <Route path='*' element={<div>Not found</div>} />
      </Routes>

      <Footer />

      {showCookies && <CookiesDisclaimer setShowCookies={setShowCookies} />}
    </div>
  );
}

export default App;

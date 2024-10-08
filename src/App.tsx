import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { store } from '#stores/store';

import DashboardPage from '#/pages/dashboard/DashboardPage';
import ExercisePage from '#pages/exercise/ExercisePage';
import ExerciseListPage from '#/pages/exercise/ExerciseListPage';
import ExercisePostPage from '#/pages/exercise/ExercisePostPage';
import ExerciseDetailPage from './pages/exercise/ExerciseDetailPage';
import ExerciseUpdatePage from '#pages/exercise/ExerciseUpdatePage';
import WaterPage from '#/pages/water/WaterPage';
import LoginPage from '#/pages/login/LoginPage';
import SignUpPage from '#/pages/signup/SignUpPage';
import NotFoundPage from '#pages/NotFoundPage';

import AuthGuard from '#layout/AuthGuard';
import UserLayout from '#layout/UserLayout';
import CommonLayout from '#layout/CommonLayout';

import ROUTE from '#constants/route';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Router>
          <Routes>
            <Route element={<AuthGuard />}>
              <Route element={<UserLayout />}>
                <Route path={ROUTE.MAIN_PAGE} element={<DashboardPage />} />
                <Route path={ROUTE.EXERCISE.DEFAULT} element={<ExercisePage />}>
                  <Route
                    path={ROUTE.EXERCISE.LIST}
                    element={<ExerciseListPage />}
                  />
                  <Route
                    path={ROUTE.EXERCISE.POST}
                    element={<ExercisePostPage />}
                  />
                  <Route
                    path={ROUTE.EXERCISE.DETAIL}
                    element={<ExerciseDetailPage />}
                  />
                  <Route
                    path={ROUTE.EXERCISE.UPDATE}
                    element={<ExerciseUpdatePage />}
                  />
                </Route>
                <Route path={ROUTE.WATER} element={<WaterPage />} />
              </Route>
            </Route>
            <Route element={<CommonLayout />}>
              <Route path={ROUTE.LOGIN} element={<LoginPage />} />
              <Route path={ROUTE.SIGN_UP} element={<SignUpPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;

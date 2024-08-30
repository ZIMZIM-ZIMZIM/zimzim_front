import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '#stores/store';

import UserLayout from '#layout/UserLayout';
import CommonLayout from '#layout/CommonLayout';
import AuthGuard from '#/layout/AuthGuard';

import DashboardPage from '#pages/DashboardPage';
import LoginPage from '#pages/LoginPage';
import SignUpPage from '#pages/SignUpPage';
import ExercisePage from '#pages/ExercisePage';
import ExerciseList from '#/pages/ExerciseList';
import ExercisePost from '#/pages/ExercisePost';
import WaterPage from '#pages/WaterPage';
import NotFoundPage from '#pages/NotFoundPage';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<AuthGuard />}>
            <Route element={<UserLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/exercise" element={<ExercisePage />}>
                <Route path="" element={<ExerciseList />} />
                <Route path="post" element={<ExercisePost />} />
              </Route>
              <Route path="/water" element={<WaterPage />} />
            </Route>
          </Route>
          <Route element={<CommonLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

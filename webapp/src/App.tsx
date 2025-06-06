import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AppContextProvider } from './lib/ctx';
import * as routes from './lib/routes';
import { TRPCProvider } from './lib/trpc';
import { AllReviewsPages } from './pages/AllReviewsPages';
import { NewReviewPage } from './pages/NewReviewPage';
import { SignInPage } from './pages/SignInPage';
import { SignOutPage } from './pages/SignOutPage';
import { SignUpPage } from './pages/SignUpPage';
import { UpdateReviewPage } from './pages/UpdateReviewPage';
import { ViewReviewPage } from './pages/ViewReviewPage';
import './styles/global.scss';

export const App = () => {
  return (
    <TRPCProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
            <Route element={<Layout />}>
              <Route path={routes.getSignUpRoute()} element={<SignUpPage />}></Route>
              <Route path={routes.getSignInRoute()} element={<SignInPage />}></Route>
              <Route path={routes.getAllReviewsRoute()} element={<AllReviewsPages />} />
              <Route path={routes.getNewReviewRoute()} element={<NewReviewPage />} />
              <Route path={routes.getViewReviewRoute(routes.viewReviewRouteParams)} element={<ViewReviewPage />} />
              <Route
                path={routes.getUpdateReviewRoute(routes.updateReviewRouteParams)}
                element={<UpdateReviewPage />}
              ></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TRPCProvider>
  );
};

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import * as routes from './lib/routes';
import { TRPCProvider } from './lib/trpc';
import { AllReviewsPages } from './pages/AllReviewsPages';
import { NewReviewPage } from './pages/NewReviewPage';
import { ViewReviewPage } from './pages/ViewReviewPage';
import './styles/global.scss';

export const App = () => {
  return (
    <TRPCProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.getAllReviewsRoute()} element={<AllReviewsPages />} />
            <Route path={routes.getNewReviewRoute()} element={<NewReviewPage />} />
            <Route path={routes.getViewReviewRoute(routes.viewReviewRouteParams)} element={<ViewReviewPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TRPCProvider>
  );
};

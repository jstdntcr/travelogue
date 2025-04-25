import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { getAllReviewsRoute, getViewReviewRoute, viewReviewRouteParams } from './lib/routes';
import { TRPCProvider } from './lib/trpc';
import { AllReviewsPages } from './pages/AllReviewsPages';
import { ViewReviewPage } from './pages/ViewReviewPage';

export const App = () => {
  return (
    <TRPCProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={getAllReviewsRoute()} element={<AllReviewsPages />} />
            <Route path={getViewReviewRoute(viewReviewRouteParams)} element={<ViewReviewPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TRPCProvider>
  );
};

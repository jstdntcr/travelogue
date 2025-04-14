import { AllReviewsPages } from './pages/AllReviewsPages';
import { TRPCProvider } from './lib/trpc';

export const App = () => {
  return (
    <TRPCProvider>
      <AllReviewsPages />
    </TRPCProvider>
  );
};

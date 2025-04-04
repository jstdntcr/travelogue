import { TRPCProvider } from "./lib/trpc";
import { AllReviewsPages } from "./pages/AllReviewsPages";

export const App = () => {
  return (
    <TRPCProvider>
      <AllReviewsPages />
    </TRPCProvider>
  )
};

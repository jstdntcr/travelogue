const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {} as Record<keyof T, string>);
};

export const viewReviewRouteParams = getRouteParams({ reviewNick: true });
export type ViewReviewRouteParams = typeof viewReviewRouteParams;
export const getViewReviewRoute = ({ reviewNick }: ViewReviewRouteParams) => `/reviews/${reviewNick}`;

export const getAllReviewsRoute = () => '/';
export const getNewReviewRoute = () => '/reviews/new';
export const getSignUpRoute = () => '/sign-up';
export const getSignInRoute = () => '/sign-in';
export const getSignOutRoute = () => '/sign-out';

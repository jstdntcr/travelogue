const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {} as Record<keyof T, string>);
};

export const getAllReviewsRoute = () => '/';

export const viewReviewRouteParams = getRouteParams({ reviewNick: true });
export type ViewReviewRouteParams = typeof viewReviewRouteParams;
export const getViewReviewRoute = ({ reviewNick }: ViewReviewRouteParams) => `/reviews/${reviewNick}`;

export const getNewReviewRoute = () => '/reviews/new';
export const getSignUpRoute = () => '/sign-up';

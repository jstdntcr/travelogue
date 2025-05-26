import { Link, Outlet } from 'react-router-dom';
import css from './index.module.scss';
import {
  getAllReviewsRoute,
  getNewReviewRoute,
  getSignUpRoute,
  getSignInRoute,
  getSignOutRoute,
} from '../../lib/routes';
import { trpc } from '../../lib/trpc';

export const Layout = () => {
  const { data, isLoading, isFetching, isError } = trpc.getMe.useQuery();

  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <div className={css.logo}>Travelogue</div>
        <ul className={css.menu}>
          <li className={css.item}>
            <Link to={getAllReviewsRoute()} className={css.link}>
              All Reviews
            </Link>
          </li>

          {isLoading || isFetching || isError ? null : data?.me ? (
            <>
              <li className={css.item}>
                <Link to={getNewReviewRoute()} className={css.link}>
                  Add Review
                </Link>
              </li>
              <li className={css.item}>
                <Link to={getSignOutRoute()} className={css.link}>
                  Log Out
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={css.item}>
                <Link to={getSignUpRoute()} className={css.link}>
                  Sign Up
                </Link>
              </li>
              <li className={css.item}>
                <Link to={getSignInRoute()} className={css.link}>
                  Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className={css.content}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

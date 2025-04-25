import { Link, Outlet } from 'react-router-dom';
import css from './index.module.scss';
import { getAllReviewsRoute } from '../../lib/routes';

export const Layout = () => {
  return (
    <div className={css.layout}>
        <div className={css.navigation}>
            <div className={css.logo}>Travelogue</div>
            <ul className={css.menu}>
                <li className={css.item}>
                    <Link to={getAllReviewsRoute()} className={css.link}>All Reviews</Link>
                </li>
            </ul>
        </div>
        <div className={css.content}>
            <Outlet></Outlet>
        </div>
    </div>
  )
};

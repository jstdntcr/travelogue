import { Link, Outlet } from 'react-router-dom';
import { getAllReviewsRoute } from '../../lib/routes';

export const Layout = () => {
  return (
    <div>
      <p>
        <b>Travelogue</b>
      </p>
      <ul>
        <li>
          <Link to={getAllReviewsRoute()}>All Reviews</Link>
        </li>
      </ul>
      <hr />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

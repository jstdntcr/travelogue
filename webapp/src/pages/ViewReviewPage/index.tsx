import { useParams } from 'react-router-dom';
import { ViewReviewRouteParams } from '../../lib/routes';

export const ViewReviewPage = () => {
  const { reviewNick } = useParams() as ViewReviewRouteParams;

  return (
    <div>
      <h1>{reviewNick}</h1>
      <p>{reviewNick} description</p>
      <div>
        <p>Paragraph 1 of {reviewNick}</p>
        <p>Paragraph 2 of {reviewNick}</p>
        <p>Paragraph 3 of {reviewNick}</p>
      </div>
    </div>
  );
};

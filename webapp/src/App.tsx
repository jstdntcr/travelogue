export const App = () => {
  const reviews = [
    {
      nick: 'cool-review-1',
      name: 'review 1',
      description: 'review 1 description',
    },
    {
      nick: 'cool-review-2',
      name: 'review 2',
      description: 'review 2 description',
    },
    {
      nick: 'cool-review-3',
      name: 'review 3',
      description: 'review 3 description',
    },
    {
      nick: 'cool-review-4',
      name: 'review 4',
      description: 'review 4 description',
    },
    {
      nick: 'cool-review-5',
      name: 'review 5',
      description: 'review 5 description',
    },
  ];

  return (
    <div>
      <h1>Travelogue</h1>
      <div>
        {reviews.map((review) => {
          return (
            <div key={review.nick}>
              <h2>{review.name}</h2>
              <p>{review.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

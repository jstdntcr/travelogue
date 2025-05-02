import _ from 'lodash';

export const reviews = _.times(100, (i) => ({
  nick: `cool-review-${i}`,
  name: `Review ${i}`,
  description: `Description of review ${i}`,
  text: _.times(100, (j) => `<p>Text paragraph ${j} of review ${i}</p>`).join(''),
}));

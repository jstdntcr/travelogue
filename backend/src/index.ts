import express from "express";

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

const expressApp = express();
const PORT = 8080;

expressApp.get("/reviews", (req, res) => {
    res.status(200).send(reviews);
});

expressApp.listen(PORT, ()=> {
    console.log(`Server is running on port http://localhost:${PORT}`);
})
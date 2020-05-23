import "./App.scss";

import React, { useState } from "react";
import { ReviewsService } from "./services/reviews.service";
import { EsResponse } from "./models/response";
import { Review } from "./models/review";
import { ReviewView } from "./components/Review";
import { Filters } from "./components/Filters";

const reviewsService = new ReviewsService();

const debounceEvent = (callback, time = 200, interval?) => (...args) => {
  clearTimeout(interval);
  interval = setTimeout(() => {
    interval = null;
    callback(...args);
  }, time);
};

function App() {
  const [reviews, setReviews] = useState<EsResponse<Review>>();

  const fetchData = async (filters) => {
    const data = await reviewsService.search(filters);
    setReviews(data);
  };

  const lazyFetchData = debounceEvent((filters) => {
    fetchData(filters);
  });

  return (
    <main className="App">
      <div className="column">
        <h1>Reviews</h1>
        <Filters onFiltersChanged={(filters) => lazyFetchData(filters)} />
      </div>

      <div className="column scroller">
        <p className="results">
          <strong>{reviews?.total?.value ?? 0}</strong> results found
        </p>
        <section className="reviews-list">
          {reviews?.hits?.map((review) => (
            <ReviewView review={review} key={review._id} />
          ))}
        </section>
      </div>
    </main>
  );
}

export default App;

import React from "react";

export function ReviewView(props) {
  const review = props.review;
  return (
    <div className="review">
      <div className="review-header">
        <span className="stars">{"⭐".repeat(review._source.stars)}</span>
        <span className="stat">
          <span role="img" aria-label="Thumbs up">
            👍
          </span>
          {review._source.useful}
        </span>
        <span className="stat">
          <span role="img" aria-label="Laugh">
            😂
          </span>
          {review._source.funny}
        </span>
        <span className="stat">
          <span role="img" aria-label="Glasses">
            😎
          </span>
          {review._source.cool}
        </span>
      </div>
      <div className="review-body">
        <p dangerouslySetInnerHTML={{ __html: review.highlight ? review.highlight.text[0] : review._source.text }}></p>
        <p className="review-meta">
          <span>{new Date(review._source.date).toLocaleString("en-GB")}</span>
          {review._score && <span>Score: {review._score}</span>}
        </p>
      </div>
    </div>
  );
}

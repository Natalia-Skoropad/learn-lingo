import { Star } from 'lucide-react';
import type { Review } from '@/types/review';

import css from './TeacherReviews.module.css';

//===============================================================

type Props = {
  reviews: Review[];
};

//===============================================================

function TeacherReviews({ reviews }: Props) {
  return (
    <div className={css.reviewsBlock}>
      <ul className={css.reviewsList}>
        {reviews.map((review, index) => (
          <li
            key={`${review.reviewer_name}-${index}`}
            className={css.reviewItem}
          >
            <div className={css.reviewHeader}>
              <div className={css.avatarStub}>
                {review.reviewer_name.charAt(0)}
              </div>

              <div className={css.reviewerInfo}>
                <p className={css.reviewerName}>{review.reviewer_name}</p>

                <div className={css.ratingRow}>
                  <Star className={css.starIcon} size={16} />
                  <span className={css.ratingValue}>
                    {review.reviewer_rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            <p className={css.comment}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherReviews;

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { getSpotById } from '../../store/spots';
import { getReviewsForSpotsById } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import ReviewFormModal from '../ReviewFormModal/ReviewFormModal';
import './SpotDetail.css';


function SpotDetail() {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const spot = useSelector(state => state.spots.spotById);
    const reviews = useSelector(state => state.reviews.reviewsById);
    const sessionUser = useSelector(state => state.session.user);

    const [isLoaded, setIsLoaded] = useState(false);
    // const [averageRating, setAverageRating] = useState(0);

   useEffect(() => {
        dispatch(getSpotById(spotId)).then(() => setIsLoaded(true));
       dispatch(getReviewsForSpotsById(spotId))
    }, [dispatch, spotId]);

    // useEffect(() => {
    //     if (reviews) {
    //         // Sort reviews by date (assuming reviews have a date property)
    //         const sortedReviews = Object.values(reviews).sort((a, b) => new Date(b.date) - new Date(a.date));
    //         spot.reviews = sortedReviews;
    //     }
    // }, [reviews]);

    // display spot rating
    const imageUrl = 'https://dodo.ac/np/images/7/7a/Star_Fragment_NH_Icon.png';
    const displayRating = () => {
        if (spot.avgStarRating !== 0) {
            return (
                <div className='rating'>
                    <img id='star-fragment' src={imageUrl} alt='Star Fragment' /> {spot.avgStarRating.toFixed(1)} {checkNumReviews()}
                </div>
            );
        } else {
            return <p className='rating new'>NEW</p>;
        }
    }
    //no image display below
    // const displayRating = () => {
    //     if (spot.avgStarRating !== 0) {
    //         return <p className='rating'>{spot.avgStarRating.toFixed(1)} {checkNumReviews()}</p>
    //     } else {
    //         return <p className='rating new'>NEW</p>
    //     }
    // }

    // check number of reviews
    const checkNumReviews = () => {
        if (spot.numReviews < 1) {
            return '';
        } else if (spot.numReviews === 1) {
            return '• 1 review';
        } else {
            return `• ${spot.numReviews} reviews`;
        }
    }

    const checkNumStars = (stars) => {
        if (stars < 1) {
            return '';
        } else if (stars === 1) {
            return '1 star •';
        } else {
            return `${stars} stars •`;
        }
    }

    //when reserve button clicked
    const reserve = () => {
        alert('Feature coming soon!');
    }

    //if the spot has reviews
    const hasReviews = reviews && Object.keys(reviews).length > 0;
    //handle logged-in users w/ spots vs non spots users
    const userIsNotSpotOwner = sessionUser && sessionUser.id !== spot?.Owner?.id;
    // const userHasNotPostedReview = sessionUser && !Object.values(reviews).some(review => review.userId === sessionUser.id);
    const userHasReviewed = reviews && Object.values(reviews).some(review => review.userId === sessionUser?.id)


    return (
        <>
            {isLoaded && reviews && spot && (
                <div className='spot-details'>
                    <div className='title'>
                        <div className='spot-name'>{spot.name}</div>
                        <div className='spot-location'>{spot.city}, {spot.state}, {spot.country}</div>
                    </div>
                    <div className='spot-images'>
                        <img src={spot.SpotImages[0]?.url} alt={`Preview of ${spot.name}`} />
                        <div className='thumbnails'>
                            {spot.SpotImages.slice(1, 5).map((image, index) => (
                                image.url && <img key={index} src={image.url} alt={`Spot ${index + 1}`} />
                            ))}
                        </div>
                    </div>
                    <div className='spot-description'>
                        <div className='name-and-description'>
                            <div className='host-name'>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</div>
                            <div className='description-text'>{spot.description}</div>
                        </div>
                    </div>
                    <div className='reserve-summary-box'>
                        <div className='calloutBox'>
                            <div className='price'>
                                <p className='price-number'>{spot.price.toLocaleString('en-US')}</p>
                                <p className='per-night'>per night</p>
                            </div>
                            <div className='box-review-stats'>
                                {displayRating()}
                            </div>
                            <button onClick={reserve}>Reserve</button>
                        </div>
                    </div>

                    <div className='reviews-container'>
                        <h2>Reviews</h2>
                        <div className='review-stats'>
                            {displayRating()}
                        </div>
                        {!hasReviews && userIsNotSpotOwner && (
                            <div className='no-reviews'>Be the first to post a review!</div>
                        )}
                        {isLoaded && sessionUser && userIsNotSpotOwner && !userHasReviewed && (
                            <OpenModalButton
                            buttonText='Post Your Review'
                            className='post-review-button'
                            modalComponent={<ReviewFormModal spotId={spot.id} />}
                            />
                        )}
                        <div className='user-reviews'>
                            {reviews && Object.values(reviews).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                .map(review => (
                                    <div key={review.id} className='a-review'>
                                        <div className='review-owner'>{review.User?.firstName}</div>
                                        <div className='stars-and-date'>
                                            <div className='star-rating'>{checkNumStars(review.stars)}</div>
                                            <div className='review-date'>{new Date(review.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
                                        </div>
                                        <div className='review-text'>{review.review}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            )}
        </>
  );

}

export default SpotDetail;

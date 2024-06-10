import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { addReview } from '../../store/reviews';
import { getReviewsForSpotsById } from '../../store/reviews';
// import './ReviewFormModal.css';

function ReviewFormModal({ spotId }) {
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);

    const [reviewText, setReviewText] = useState('');
    const [stars, setStars] = useState(0);
    const [error, setError] = useState([]);
    const { closeModal } = useModal();

    const validSubmit = stars > 0 && reviewText.length >= 10;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validSubmit) {
            try {
                const newReview = { review: reviewText, stars };
                await dispatch(addReview(spotId, newReview))
                    .then(() => dispatch(getReviewsForSpotsById(spotId)))
                    .then(closeModal);
            } catch (err) {
                setError(err.message);
            }
        }
    }

    return (
        <div className='review-form-modal'>
            < div className='review-form-title'>
                <h2>How was your stay?</h2>
            </div>
            {/* {errors.length > 0 && (
                <ul className='errors'>
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            )} */}
            <form className='review-form' onSubmit={(e) => handleSubmit(e)}>
                <div className='star-rating'>
                    <label htmlFor='stars'>Stars</label>
                    <input
                        type='number'
                        id='stars'
                        min='1'
                        max='5'
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                        required
                    />
                </div>
                <div className='review-form-text-submit'>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder='Leave your review here...'
                    />
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" disabled={!validSubmit}>Submit Your Review</button>
                </div>
            </form>
        </div>
    );
}

export default ReviewFormModal;

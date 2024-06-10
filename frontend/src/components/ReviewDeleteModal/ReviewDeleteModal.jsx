import { getReviewsForSpotsById, deleteReview } from '../../store/reviews';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { getSpotById } from '../../store/spots';

function ReviewDeleteModal({ reviewId, spotId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        try {
            await dispatch(deleteReview(reviewId));
            await dispatch(getReviewsForSpotsById(spotId));
            await dispatch(getSpotById(spotId));
            closeModal();
        } catch (error) {
            console.error('Failed to delete review:', error);
        }
    }

    return (
        <div className='confirm-delete-container'>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <div className='confirm-or-not-buttons'>
                <button onClick={handleDelete} className='delete-button'>Yes (Delete Review)</button>
                <button onClick={closeModal} className='cancel-delete-button'>No (Keep Review)</button>
            </div>
        </div>
    )
}

export default ReviewDeleteModal;

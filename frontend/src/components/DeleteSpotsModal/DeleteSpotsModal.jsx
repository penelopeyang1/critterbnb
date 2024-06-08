import { deleteSpot } from '../../store/spots';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';

function DeleteSpotsModal({ spotId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        // console.log('HANDLE DELETE HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        await dispatch(deleteSpot(spotId))
        .then(closeModal);
        // console.log('AFTER DELETE DISPATH!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    }

    return (
        <div className='confirm-delete-container'>
            <h2>Confirm Delete</h2>
            <div className='confirm-text'>
                <p>Are you sure you want to remove this spot from the listings?</p>
            </div>
            <div className='confirm-or-not-buttons'>
                <button onClick={handleDelete} className='delete-button'>Yes(Delete Spot)</button>
                <button onClick={closeModal} className='cancel-delete-button'>No(Keep Spot)</button>
            </div>
        </div>
    )
}

export default DeleteSpotsModal;

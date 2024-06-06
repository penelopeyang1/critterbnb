import { useNavigate } from 'react-router-dom';
import './SpotItem.css';
import { Link } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotsModal from '../DeleteSpotsModal/DeleteSpotsModal';

function SpotItem({ spot, isManagePage }) {
    const navigate = useNavigate();

    const onClick = (event, spotId) => {
        // check if the click event is not coming from the update or delete buttons
        if (event.target.closest('.update-and-delete-buttons')) {
            return;
        }
        navigate(`/spots/${spotId}`);
    };

    const imageUrl = spot.SpotImages && spot.SpotImages.length > 0 ? spot.SpotImages[0].url : spot.previewImage;

    return (
        <div className='spotitem-container' title={`${spot.name}`} onClick={() => onClick(event, spot.id)}>
            <div className='image-container'>
                <img className='image' src={imageUrl} alt={`Preview of ${spot.name}`} />
            </div>
            <div className='info-container'>
                <div className='city-state-price'>
                    <p className='city-state'>{spot.city}, {spot.state}</p>
                    <div className='price-container'>
                        <p className='price'>
                            $ {spot.price.toLocaleString('en-US')} per night
                        </p>
                    </div>
                </div>
            </div>
            {isManagePage && ( //check to see if we're on the manageSpots page
                <div className='update-and-delete-buttons'>
                    <Link to={`/spots/${spot.id}/update`}>Update</Link>
                    <OpenModalButton
                        buttonText='Delete'
                        className='delete-spot-button'
                        modalComponent={<DeleteSpotsModal spotId={spot.id} />}
                    />
                </div>
            )}
        </div>
    );
}

export default SpotItem;

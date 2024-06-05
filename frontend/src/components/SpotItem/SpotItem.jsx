import { useNavigate } from 'react-router-dom';
import './SpotItem.css';

function SpotItem({ spot }) {
    const navigate = useNavigate();

    const onClick = spotId => {
        navigate(`/spots/${spotId}`);
    };

    const imageUrl = spot.SpotImages && spot.SpotImages.length > 0 ? spot.SpotImages[0].url : spot.previewImage;

    return (
        <div className='spotitem-container' title={`${spot.name}`} onClick={() => onClick(spot.id)}>
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
        </div>
    );
}

export default SpotItem;

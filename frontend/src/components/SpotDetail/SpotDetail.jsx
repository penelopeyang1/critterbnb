import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { getSpotById } from '../../store/spots';
import './SpotDetail.css';

function SpotDetail() {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const spot = useSelector(state => state.spots.spotById);

    const [isLoaded, setIsLoaded] = useState(false);

   useEffect(() => {
        dispatch(getSpotById(spotId)).then(() => setIsLoaded(true));
    }, [dispatch, spotId]);

    //when reserve button clicked
    const reserve = () => {
        alert('Feature coming soon!');
    }

    return (
        <>
            {isLoaded && spot && (
                <div className='spot-details'>
                    <div className='title'>
                        <div className='spot-name'>{spot.name}</div>
                        <div className='spot-location'>{spot.city}, {spot.state}, {spot.country}</div>
                    </div>
                    <div className='images'>
                        <img src={spot.SpotImages[0]?.url} alt={`Preview of ${spot.name}`} />
                        <div className='thumbnails'>
                            {spot.SpotImages.slice(1, 5).map((image, index) => (
                                image.url && <img key={index} src={image.url} alt={`Spot ${index + 1}`} />
                            ))}
                        </div>
                    </div>
                    <div className='description'>
                        <div className='name-and-description'>
                            <div className='host-name'>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</div>
                            <div className='description-text'>{spot.description}</div>
                        </div>
                        <div className='calloutBox'>
                            <div className='price'>
                                <p className='price-number'>{spot.price.toLocaleString('en-US')}</p>
                                <p className='per-night'>per night</p>
                            </div>
                        </div>
                        <button onClick={reserve}>Reserve</button>
                    </div>
                </div>
            )}
        </>
  );

}

export default SpotDetail;

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

    //use avgRating - calculateAvgRating helper function to display star image based off avgrating calculated value
    const starRating = () => {
        // if (spot.avgRating === 5) {
        //     return <img className='star' src='../../../star-fragment.png' alt='5 stars' />;
        // } else if (spot.avgRating < 5 && spot.avgRating >= 4) {
        //     return <img className='star' src='../../../star-fragment.png' alt='4 stars' />;
        // } else if (spot.avgRating < 4 && spot.avgRating >= 3) {
        //     return <img className='star' src='../../../star-fragment.png' alt='3 stars' />;
        // } else if (spot.avgRating < 3 && spot.avgRating >= 2) {
        //     return <img className='star' src='../../../star-fragment.png' alt='2 stars' />;
        // } else if (spot.avgRating > 0) {
        //     return <img className='star' src='../../../star-fragment.png' alt='1 star' />;
        // }
        // const imageUrl = 'https://dodo.ac/np/images/7/7a/Star_Fragment_NH_Icon.png';
        if (spot.avgRating === 5) {
            return <img className='star' src='./star-fragment.png' alt='5 stars' />;
        } else if (spot.avgRating < 5 && spot.avgRating >= 4) {
            return <img className='star' src='./star-fragment.png' />;
        } else if (spot.avgRating < 4 && spot.avgRating >= 3) {
            return <img className='star' src='./star-fragment.png' />;
        } else if (spot.avgRating < 3 && spot.avgRating >= 2) {
            return <img className='star' src='./star-fragment.png' />;
        } else if (spot.avgRating > 0) {
            return <img className='star' src='./star-fragment.png' />;
        }
    }

    // console.log(spot.avgRating)
    // console.log('SPOT RATINGS^')

    return (
        <div className='spotitem-container' title={`${spot.name}`} onClick={() => onClick(event,spot.id)}>
            <div className='image-container'>
                <img className='image' src={imageUrl} alt={`Preview of ${spot.name}`} />
            </div>
            <div className='info-container'>
                <div className='city-state-price'>
                    <p className='city-state'>{spot.city}, {spot.state}</p>
                    <div className='price-container'>
                        <p className='price'>
                            <img id='bells' src='../../../bells.png' />
                            {spot.price.toLocaleString('en-US')} per night
                        </p>
                    </div>
                </div>
                <div className='rating-container'>
                    {starRating()}
                    <div className='rating'>{spot.avgRating ? <p className='avg-rating'>{spot.avgRating.toFixed(1)}</p> : <p className='no-ratings'>NEW</p>}</div>
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
            {/* <div className='rating-container'>
                {starRating()}
                <div className='rating'>{spot.avgRating ? <p className='avg-rating'>{spot.avgRating.toFixed(1)}</p> : <p className='no-ratings'>NEW</p>}</div>
            </div> */}
        </div>
    );
}

export default SpotItem;

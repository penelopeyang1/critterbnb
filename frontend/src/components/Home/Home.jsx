import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots, selectAllSpots } from '../../store/spots.js';
import SpotItem from '../SpotItem/SpotItem.jsx';
import './Home.css';

function Home() {
    const dispatch = useDispatch();
    const spots = useSelector(selectAllSpots);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getAllSpots()).then(() => {
            setIsLoaded(true);
        });
    }, [dispatch])

    if (!isLoaded) return null;

    return (
        <>
            {isLoaded && (
                <div className='home-container'>
                    <div className='spots-container'>
                        <h1>Critter Favorites</h1>
                        <div className='display-spots'>
                            {spots.map((spot) => (
                                <SpotItem key={spot.id} spot={spot} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSpot, } from '../../store/spots';
import { useNavigate, useParams } from 'react-router-dom';
import { getSpotById } from '../../store/spots.js';

import './UpdateSpot.css'
//copy-paste validate form and state variables from create spot w/o image updates
//don't forget to implement spots
function UpdateSpot() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots[spotId]);

    // state variables for managing form input values
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');


    const [errors, setErrors] = useState({});

    //validation messages on top of form

    const validateForm = () => {
        const valErrors = {};

        if (!country) valErrors.country = "Country is required";
        if (!address) valErrors.address = "Street Address is required";
        if (!city) valErrors.city = "City is required";
        if (!state) valErrors.state = "State is required";
        if (!description) valErrors.description = "Description is required";
        if (description.length < 30) valErrors.description = "Description needs 30 or more characters";
        if (!name) valErrors.name = "Spot title is required";
        if (!price) valErrors.price = "Price per night is required";

        setErrors(valErrors);
        return !Object.keys(valErrors).length;
    }

    useEffect(() => {
        if (!spot) { //if not yet loaded
            dispatch(getSpotById(spotId)); //action to fetch spotId
        } else {
            setCountry(spot.country);
            setAddress(spot.address);
            setCity(spot.city);
            setState(spot.state);
            setDescription(spot.description);
            setName(spot.name);
            setPrice(spot.price);
        }
    }, [dispatch, spotId, spot]); //re-run if spot changes

    //validates form and updates the spot accordingly by spotId
    async function onSubmit(e) {
        e.preventDefault();
        if (!validateForm()) return;

        const updatedSpotDetails = {
            country, address, city, state, description, name, price
        }

        const result = await dispatch(updateSpot(spotId, updatedSpotDetails));
        if (result.error) {
            console.log(result.error);
        }

        navigate(`/spots/${spot.id}`);
    }


    return (
        <>
            <form className="create-spot-form" onSubmit={onSubmit} noValidate>
                <div className='create-title'>
                    <h1>Update your Spot</h1>
                </div>

                <div className='line'></div>

                <section className='location-info'>
                    <h3>Where&apos;s your place located?</h3>
                    <p>Guests will only get your exact address once they booked a reservation</p>
                    <div className='input-area-info'>
                        <div className='country'>
                            <p>Country {errors.country && <span className="error">{errors.country}</span>}</p>
                            <input className='input' type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" />
                        </div>
                        <div className='address'>
                            <p>Street Address {errors.address && <span className="error">{errors.address}</span>}</p>
                            <input className='input' type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street Address" />
                        </div>
                        <div className='city'>
                            <p>City {errors.city && <span className="error">{errors.city}</span>}</p>
                            <input className='input' type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                        </div>
                        <div className='state'>
                            <p>State {errors.state && <span className="error">{errors.state}</span>}</p>
                            <input className='input' type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
                        </div>
                    </div>
                </section>

                {/* <div className='line'></div> */}

                <section className='create-description'>
                    <h3>Describe your place to guests</h3>
                    <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood</p>
                    <div className='input-area'>
                        <div className='description-form'>
                            <p>Describe your place {errors.description && <span className="error">{errors.description}</span>}</p>
                            <textarea className='describe-input' value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Please write at least 30 characters" />
                        </div>
                    </div>
                </section>

                {/* <div className='line'></div> */}

                <section className='create-title'>
                    <h3>Create a title for your spot</h3>
                    <p>Catch guests&apos; attention with a spot title that highlights what makes your place special</p>
                    <div className='input-area'>
                        <div>
                            <p>Spot Title {errors.name && <span className="error">{errors.name}</span>}</p>
                            <input className='input' type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name of your spot" />
                        </div>
                    </div>
                </section>

                <div className='line'></div>

                <section className='create-price'>
                    <h3>Set a base price for your spot</h3>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results</p>
                    <div className='input-area'>
                        <div>
                            <p>Price per night {errors.price && <span className="error">{errors.price}</span>}</p>
                            <input type="number" className='input' value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price per night (bells)" />
                        </div>
                    </div>
                </section>

                <div className='line'></div>


                <section className='button-section'>
                    <button className='update-spot-button' type="submit">Update your Spot</button>
                </section>
            </form>
        </>
    );
}

export default UpdateSpot;

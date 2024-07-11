import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSpot, addSpotImage } from '../../store/spots';
import { useNavigate } from 'react-router-dom';
import './CreateSpot.css';


function CreateSpot() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // state variables for managing form input values
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    // state variables for managing image URLs
    const [imageURLs, setImageURLs] = useState(['', '', '', '']); // array of image URLs (for thumbnails)
    const [previewImageURL, setPreviewImageURL] = useState(''); // URL for the main preview image

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
        if (!previewImageURL) valErrors.previewImageURL = "Preview Image URL is required";

        setErrors(valErrors);
        return Object.keys(valErrors).length === 0;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    //how to handle image changes?
    const imageUrlChange = (index, value) => {
        const newImageURLs = [...imageURLs];
        newImageURLs[index] = value;
        setImageURLs(newImageURLs);
    };

    async function onSubmit(e) {
        e.preventDefault();
        if (!validateForm()) return;

        const spot = {
            country, address, city, state, description, name, price, previewImageURL
        }

        const newSpot = await dispatch(addSpot(spot));
        if (!newSpot.id) {
            if (newSpot.payload && newSpot.payload.errors) {
                setErrors(newSpot.payload.errors);
            }
            return;
        }

        if (previewImageURL) {
            await dispatch(addSpotImage(newSpot.id, { url: previewImageURL, preview: true }));
        }

        const imagePromises = imageURLs.filter(url => url !== '').map(url => {
            return dispatch(addSpotImage(newSpot.id, { url, preview: false }));
        });

        await Promise.all(imagePromises);

        navigate(`/spots/${newSpot.id}`);
    }

    const preventScroll = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <form className="create-spot-form" onSubmit={onSubmit} noValidate>
                <div className='create-title'>
                    <h1>Create a New Spot</h1>
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
                            <input type="number" className='input' value={price} onWheel={preventScroll} onChange={(e) => setPrice(e.target.value)} placeholder="Price per night (bells)" />
                        </div>
                    </div>
                </section>

                <div className='line'></div>

                <section className='create-photos'>
                    <h3>Liven up your spot with photos</h3>
                    <p>Submit a link to at least one photo to publish your spot</p>
                    <div className='input-area'>
                        <div>
                            <input
                                type="text"
                                className='input'
                                placeholder="Preview Image"
                                value={previewImageURL}
                                onChange={(e) => setPreviewImageURL(e.target.value)}
                            />
                            {errors.previewImageURL && <p className="error">{errors.previewImageURL}</p>}
                        </div>
                        {imageURLs.map((url, index) => (
                            <div key={index}>
                                <input
                                    className='input'
                                    type="text"
                                    placeholder={`Image URL ${index + 1}`}
                                    value={url}
                                    onChange={(e) => imageUrlChange(index, e.target.value)}
                                />
                                {errors.imageURLs && errors.imageURLs[index] && <p className="error">{errors.imageURLs[index]}</p>}
                            </div>
                        ))}
                    </div>
                </section>


                <section className='button-section'>
                    <button className='create-spot-button' type="submit">Create Spot</button>
                </section>
            </form>
        </>
    );
}



export default CreateSpot;

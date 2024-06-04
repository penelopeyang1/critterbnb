import './CreateSpot.css';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSpot, addSpotImage } from '../../store/spots';
import { useNavigate } from 'react-router-dom';

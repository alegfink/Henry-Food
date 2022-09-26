import React from 'react';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { postInitRecipes } from '../../actions';
import s from './LandingPage.module.css';


export default function LandingPage(){

    const dispatch = useDispatch()
    

    useEffect(()=>{
        dispatch(postInitRecipes());
    },[dispatch])

    return (
        <div className={s.landing}>
            <Link to = '/home'>
                <button className={s.landingButton}><span>Let's start Cooking..</span></button>
            </Link>
        </div>
    )
}
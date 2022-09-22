import React from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { postInitRecipes } from '../../actions';
import s from './LandingPage.module.css';


export default function LandingPage(){

    const dispatch = useDispatch()
    // const allRecipes = useSelector (state => state.recipes)

    useEffect(()=>{
        dispatch(postInitRecipes());
    },[])

    return (
        <div className={s.landing}>
            <Link to = '/home'>
                <button className={s.landingButton}><span>Hora de Cocinar..</span></button>
            </Link>
        </div>
    )
}
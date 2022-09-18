import React from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { postInitRecipes } from '../../actions';


export default function LandingPage(){

    const dispatch = useDispatch()
    // const allRecipes = useSelector (state => state.recipes)

    useEffect(()=>{
        dispatch(postInitRecipes());
    },[])

    return (
        <div>
            <h1>Welcome</h1>
            <Link to = '/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}
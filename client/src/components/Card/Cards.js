import React from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { postInitRecipes } from '../../actions';

export default function Card({title, image, diets}){
    const dietas = diets?.map(el=>el.name)
    // console.log(dietas)
    return (
        <div>
            <h1>{title}</h1>
            <img src={image} alt='img not found' width='200px' height='250px'/>
            <p>{dietas?.join(', ')}</p>
            
        </div>
    )
}
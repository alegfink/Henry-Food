import React from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { postInitRecipes } from '../../actions';
import s from './Cards.module.css'
import imagen from '../../image.png'

export default function Card({title, image, diets, healthScore}){
    
    
    const dietas = diets?.map(el=>el.name)
    // console.log('IMAGEN',image)
    
    return (
        <div className={s.container}>
            <div className={s.card}>
                <img src={image? image: imagen} alt='No image found' className={s.img}/>
            <div className={s.infoCard}>
                <div>
                    <h2 className={s.title}>{title}</h2>
                </div>
                <div className={s.dietContainer}>
                {/* <p >Dietas: {dietas?.join(', ')}</p> */}
                <h4 className={s.dietTitle}>Type of diet: 
                    <ul>
                        {
                            dietas? dietas.map(e=>(
                                <li key={e}>{e}</li>
                            )): <li>No tiene dieta asociada</li>
                        }
                    </ul>
                </h4>
                <div className={s.containerHS}>
                    <h3 >HealthScore: {healthScore}</h3>
                </div>
                </div>
            
            
            </div>
            
            
        </div>
        </div>        
    )
}
import React from 'react';
import {Link, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getRecipeDetail, deleteDetail } from '../../actions';

// Ruta de detalle de receta: debe contener

// [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
// [ ] Resumen del plato
// [ ] Nivel de "comida saludable" (health score)
// [ ] Paso a paso

export default function RecipDetail(props){

    const dispatch = useDispatch()
    let {id} = useParams()
    // let id = props.params.id
    let recipeDetail = useSelector (state => state?.recipeDetail)
    

    useEffect(()=>{
        dispatch(getRecipeDetail(id));
        return function(){
            console.log('ENTRA AL WILLUNMO')
            dispatch(deleteDetail())
        }
    },[dispatch,id])

    return (
        <div>
            {console.log('SOY id',id)}
            {console.log('ESTADO',recipeDetail)}
            <h1>{recipeDetail.title}</h1>
            <img src={recipeDetail.image} alt='not found'/>
            {
            recipeDetail.dishTypes && recipeDetail.dishTypes.length>0?
            <div>
            <h3>DishType:</h3>
            {recipeDetail.dishTypes.map(d=>{
                return <li>{d.name}</li>
            })}
            </div>
            :null
            }
            {
            recipeDetail.diets && recipeDetail.diets.length>0?
            <div>
            <h3>Diets:</h3>
            {recipeDetail.diets.map(d=>{
                return <li>{d.name}</li>
            })}
            </div>
            :null
            }
            <h3></h3>
            <h3>Summary: {recipeDetail.summary?.replace(/<[^>]+>/g, '')}</h3>
            <h3>HealthScore: {recipeDetail.healthScore}</h3>
            {recipeDetail.steps && <h3>Steps: {recipeDetail.steps}</h3>}
        </div>
    )
}
import React from 'react';
import {Link, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getRecipeDetail, deleteDetail } from '../../actions';
import s from './Detail.module.css';
import NavBar from '../NavBar/NavBar';
import imagen from '../../image.png';


// Ruta de detalle de receta: debe contener

// [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
// [ ] Resumen del plato
// [ ] Nivel de "comida saludable" (health score)
// [ ] Paso a paso

export default function RecipDetail(props){

    // const gif = 'https://acegif.com/wp-content/uploads/loading-103.gif'
    const gif2 = 'https://media.baamboozle.com/uploads/images/230671/1618515492_257228_gif-url.gif'
    const dispatch = useDispatch()
    let {id} = useParams()
    // let id = props.params.id
    let recipeDetail = useSelector (state => state.recipeDetail)
    const [loading, setLoading] = useState(false)
    
    const asd = useSelector (state=>state?.recordedPage)
    console.log ('CURRENT PAGE1',asd)

    useEffect(()=>{
        dispatch(getRecipeDetail(id));
        setTimeout( ()=>{
            setLoading(true) 
        }, 1000)
        console.log ('CURRENT PAGE',asd)
        return function(){
            // console.log('ENTRA AL WILLUNMO')
            dispatch(deleteDetail())
            
        }
    },[dispatch,id])

    return (
        <div>
            <NavBar/>
            {
                !loading?(
                    <div className={s.loading}>
                        <img  src={gif2}/>
                    </div>
                    
                )
                :
            <div className={s.container}>
            {/* {console.log('SOY id',id)}
            {console.log('ESTADO',recipeDetail)} */}
            <div className={s.img}>
                <img src={recipeDetail.image?recipeDetail.image:imagen} alt='not found'/>
            </div>
            <div className={s.text}>
            <h1 className={s.title}>{recipeDetail.title}</h1>
            <div className={s.data}>
                <div className={s.score}>
                <h3>HealthScore: {recipeDetail.healthScore}</h3>
                </div>
            {
            recipeDetail.dishTypes && recipeDetail.dishTypes.length>0?
            <div className={s.dishTypes}>
            <h3>DishType:</h3>
            {recipeDetail.dishTypes.map(d=>{
                return <li>{d.name}</li>
            })}
            </div>
            :<li className={s.dishTypes}>There is no dishType associated</li>
            }
            {
            recipeDetail.diets && recipeDetail.diets.length>0?
            <div className={s.dietTypes}>
            <h3>Diets:</h3>
            {recipeDetail.diets.map(d=>{
                return <li>{d.name}</li>
            })}
            </div>
            :<li className={s.dietTypes}>There is no diet associated yet</li>
            }
            <div className={s.summary}>
            <text>Summary:<br /> {recipeDetail.summary?.replace(/<[^>]+>/g, '')}</text>
            </div>
            
            <div className={s.steps}>
            {
            recipeDetail.steps? <text>Steps:<br /> {recipeDetail.steps}</text> : <text>There is no steps associated yet</text> 
            }
            </div>
            
            </div>
            
            </div>
            
            
        </div>
            }
            
                
            
        </div>
        
    )
}
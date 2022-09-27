import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes, filterRecipsByDiet } from '../../actions';
import Card from '../Card/Cards.js';
import NavBar from '../NavBar/NavBar.js';
import Paginado from '../Paginado/Paginado.js';
import SearchBar from '../SearchBar/SearchBar.js';
import FilterBar from '../FilterBar/FilterBar.js';
import s from './Home.module.css'


export default function Home(){

    const dispatch = useDispatch()
    const gif = 'https://media2.giphy.com/media/HeMju6ptLhZ7XCA4vH/giphy.gif?cid=790b7611adf768434dfa5bd572ec4332d478fca69a7bf862&rid=giphy.gif&ct=s'
    const allRecipes = useSelector (state=>state.recipes)
    const allRecipes2 = useSelector (state=>state?.allRecipes)
    // const titleSearch = useSelector (state=>state?.recipesSearch)
    
    const [loadingg, setLoadingg] = useState(false)
    
    const actualPage = useSelector(state=>state?.recordedPage)
    const filtered = useSelector(state=>state.filter)
    

    useEffect(()=>{
        allRecipes.length===0&&dispatch(getAllRecipes())
        setTimeout( ()=>{
            setLoadingg(true) 
        }, 1000)
        
        return()=>{
           
        }
    },[dispatch, allRecipes.length])

    

    
    const recipesPerPage = 9
    
    allRecipes.length===0&&dispatch(filterRecipsByDiet('All'))
    const indexOfLastRecipe = actualPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.length>0?allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe):allRecipes2.slice(indexOfFirstRecipe, indexOfLastRecipe)
    // const [title, setTitile] = useState('')

    // const [loading, setLoading] = useState(true);
    // const [maxPageNumberLimit, setmaxPageNumberLimit]= useState(4);
    // const [minPageNumberLimit, setminPageNumberLimit]= useState(0);

    return (
        <div>
            <div>
                <NavBar/>
            </div>
            
            <div>
                <SearchBar/>
            </div>
            <div>
                <FilterBar/>
            
            </div>
            {
                !loadingg?(
                    <div className={s.loadingg}>
                        <img  src={gif} alt="Loading..."/>
                    </div>
                    
                )
                :
                <div>
            {allRecipes.length>0 &&
            <Paginado
            recipesPerPage = {recipesPerPage}
            allRecipes = {allRecipes.length>0?allRecipes.length:allRecipes2.length}
            />
            
            }
            
            <div className={s.containerCard}>
            
            {   
                
                currentRecipes && currentRecipes.map(el=>{
                    
                    return(
                        <div>
                            <Link key={el.id} to={`/detail/${el.id}`}>
                                <Card title={el.title} image={el.image} diets={el.diets} healthScore={el.healthScore} key={el.id}/>
                            </Link>
                            
                        </div>

                    
                    )
                })
                
            }
            </div>
            
            </div>
            }
            
        </div>
    )
}
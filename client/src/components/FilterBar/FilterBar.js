import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterRecipsByDiet, orderByName, orderByHealthScore } from "../../actions";
import s from './FilterBar.module.css';

export default function FilterBar({handleFilterDiet,handleOrderByHealthScore,handleOrderByName}){

    // const dispatch = useDispatch()

    // const recipess = useSelector(state=>state.recipes)

    // let [currentPage, setCurrentPage] = useState(1)
    // let [order, setOrder] = useState('')

    // function handleFilterDiet(e){
    //     e.preventDefault()
    //     dispatch(filterRecipsByDiet(e.target.value))
    // }

    // function handleOrderByName(e){
    //     e.preventDefault()
        
    //     dispatch(orderByName(e.target.value))
        
    //     setCurrentPage(1)
    //     setOrder(`Ordenado: ${e.target.value}`)
    // }

    // function handleOrderByHealthScore(e){
    //     e.preventDefault()
    //     console.log('SOY RECIPES', recipess)
    //     dispatch(orderByHealthScore(e.target.value))
        
    //     setCurrentPage(1)
    //     setOrder(`Ordenado: ${e.target.value}`)
    // }


    return(
        <div >
            <div className={s.filter}>
            <select className={s.select} onChange={e=>handleOrderByName(e)}>
                    <option value='asc'>(a-z) Ascendent</option>
                    <option value='desc'>(z-a) Descendent</option>
                </select>
                <select className={s.select} onChange={e=>handleOrderByHealthScore(e)}>
                    <option value='low'>Lower</option>
                    <option value='hi'>Higher</option>
                </select>
                <select className={s.select} onChange={e=>handleFilterDiet(e)}>
                    <option value='All'>Todos</option>
                    <option value='gluten free'>gluten free</option>
                    <option value='dairy free'>dairy free</option>
                    <option value='lacto ovo vegetarian'>lacto ovo vegetarian</option>
                    <option value='vegan'>vegan</option>
                    <option value='paleolithic'>paleolithic</option>
                    <option value='primal'>primal</option>
                    <option value='whole 30'>whole 30</option>
                    <option value='pescatarian'>pescatarian</option>
                    <option value='ketogenic'>ketogenic</option>
                    <option value='fodmap friendly'>fodmap friendly</option>
                </select>
            </div>
            
        </div>
    )
}
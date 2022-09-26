import React from "react";
import { useDispatch } from "react-redux";
import { filterRecipsByDiet, orderByName, orderByHealthScore, resetMaxMin, resetPage, deleteFilter, filterDone } from "../../actions";
import s from './FilterBar.module.css';

export default function FilterBar(){

    const dispatch = useDispatch()

    const handleFilterDiet=(e)=>{
        e.preventDefault()
        dispatch (resetMaxMin())
        dispatch (resetPage())
        dispatch(deleteFilter())
        dispatch(filterRecipsByDiet(e.target.value))
                
    }

    function handleOrderByName(e){
        e.preventDefault()
        dispatch(resetMaxMin())
        dispatch(resetPage())
        dispatch(orderByName(e.target.value))
        dispatch(filterDone())
        
    }

    function handleOrderByHealthScore(e){
        e.preventDefault()
        dispatch(resetMaxMin())
        dispatch(resetPage())
        dispatch(orderByHealthScore(e.target.value))
        dispatch(filterDone())

    }


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
                    <option value='All'>All</option>
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
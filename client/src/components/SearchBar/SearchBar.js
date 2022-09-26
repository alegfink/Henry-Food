import React from "react";
import { useState } from "react";
import { searchByName, resetMaxMin, resetPage } from "../../actions";
import { useDispatch } from "react-redux";
import s from './SearchBar.module.css'

export default function SearchBar({setCurrentPage,setminPageNumberLimit,setmaxPageNumberLimit}){

    const dispatch = useDispatch()
    
    const [title, setTitile] = useState('')
    function handleInput(e){
        e.preventDefault()
        dispatch(resetMaxMin())
        dispatch(resetPage())
        setTitile(e.target.value)
        dispatch(searchByName(title))
        
        
    }
    
    return (
        <div className={s.container}>
            
            <input className={s.input} type='text' id='title' autoComplete='off' value={title} placeholder= "Search Recipe" onChange={e=>handleInput(e)}></input>
            
        </div>
    )
}
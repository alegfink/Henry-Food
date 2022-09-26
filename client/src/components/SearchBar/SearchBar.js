import React from "react";
import { searchByName, resetMaxMin, resetPage,setTitle } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import s from './SearchBar.module.css'

export default function SearchBar(){

    const dispatch = useDispatch()
    const titulo = useSelector(state=>state.title)
    
    
    function handleInput(e){
        e.preventDefault()
        dispatch(resetMaxMin())
        dispatch(resetPage())
        dispatch(setTitle(e.target.value))
        dispatch(searchByName(e.target.value))
        
        
    }
    
    return (
        <div className={s.container}>
            
            <input className={s.input} type='text' id='title' autoComplete='off' value={titulo} placeholder= "Search Recipe" onChange={e=>handleInput(e)}></input>
            
        </div>
    )
}
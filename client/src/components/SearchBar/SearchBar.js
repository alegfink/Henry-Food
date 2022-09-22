import React from "react";
import { useState } from "react";
import { searchByName } from "../../actions";
import { useDispatch } from "react-redux";
import s from './SearchBar.module.css'

export default function SearchBar({setCurrentPage,setminPageNumberLimit,setmaxPageNumberLimit}){

    const dispatch = useDispatch()
    
    const [title, setTitile] = useState('')
    function handleInput(e){
        e.preventDefault()
        setCurrentPage(1)
         
        setTitile(e.target.value)
        setmaxPageNumberLimit(4)
        setminPageNumberLimit(0)  
        dispatch(searchByName(title))
        
    }
    
    return (
        <div className={s.container}>
            
            <input className={s.input} type='text' id='title' autoComplete='off' value={title} placeholder= "Search Recipe" onChange={e=>handleInput(e)}></input>
            {/* <button onClick={(e)=>handleSearch(e)}>Buscar</button> */}
        </div>
    )
}
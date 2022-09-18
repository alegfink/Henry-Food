import React from "react";

export default function Paginado ({recipesPerPage, allRecipes, paginado}){
    const pageNumber = []
    for(let i=1; i<=Math.ceil( allRecipes / recipesPerPage ); i++){
        pageNumber.push(i)
    }
    return (
        <nav>
            <ul>
                {pageNumber && pageNumber.map(num=>(
                    <li key={num}>
                       <a onClick={()=>paginado(num)}>{num}</a> 
                    </li>
                ))}
            </ul>
        </nav>
    )
}
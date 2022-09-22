import React from "react";
import s from './Paginado.module.css';
import { useState } from "react";



export default function Paginado ({recipesPerPage, allRecipes, paginado, currentPage, setCurrentPage,minPageNumberLimit,maxPageNumberLimit,handleNextBut,handlePrevBut}){
    const pageNumber = []
    for(let i=1; i<=Math.ceil( allRecipes / recipesPerPage ); i++){
        pageNumber.push(i)
    }
    const pageNumberLimit= 3; //total de paginas que quiero renderizar
    // const [maxPageNumberLimit, setmaxPageNumberLimit]= useState(4);
    // const [minPageNumberLimit, setminPageNumberLimit]= useState(0);
    // const renderPageNumbers= pageNumber.map((number)=>{
        
    //     if(number < maxPageNumberLimit+1 && number > minPageNumberLimit){
    //         return(
    //             <li 
    //             key={number} 
    //             id={number} 
    //             onClick={paginado}
    //             className={currentPage === number? "active" : null} >
    //                 {number}
    //             </li>
    //         )
    //     }else{
    //         return null;
    //     }
    // }) 
    // const paginateMas = () => setCurrentPage(currentPage + 1)
    // const paginateMenos = () => setCurrentPage(currentPage - 1)
    // function handlePrevBut() {
    //     setCurrentPage(currentPage-1)
    //     setminPageNumberLimit(minPageNumberLimit-1)
    //     setmaxPageNumberLimit(maxPageNumberLimit-1)

    // }

    // function handleNextBut() {
    //     setCurrentPage(currentPage+1)
    //     setmaxPageNumberLimit(maxPageNumberLimit+1)
    //     setminPageNumberLimit(minPageNumberLimit+1)
        

    // }
    
    return (
        <nav >
            
            <ul className={s.pageNumbers}>
                <li className={currentPage>1?s.prevNext:s.noPrevBut} onClick={handlePrevBut}>
                    {/* <button className={currentPage>1?s.prevBut:s.noPrevBut} >Prev</button> */}
                    Prev
                </li>
                {/* {console.log('MAXNUMBER', maxPageNumberLimit)} */}
                {pageNumber.map((number)=>{
                    
                if(number < maxPageNumberLimit+1 && number > minPageNumberLimit)
                return (
                    <li 
                key={number} 
                id={number} 
                onClick={()=>paginado(number)}
                className={currentPage === number? s.active : s.pages}
                 >
                    {number}
                </li>
                )
                })
                }
                {/* {pageNumber && pageNumber.map(num=>(
                    <li key={num} id={num}>
                       <a onClick={()=>paginado(num)}>{num}</a> 
                    </li>
                ))} */}
                <li className={currentPage!==pageNumber.length?s.prevNext:s.noPrevBut} onClick={handleNextBut}>
                    {/* <button className={currentPage!==pageNumber.length?s.prevBut:s.noPrevBut} >Next</button> */}
                    Next
                </li>
            
            
            </ul>
            
        </nav>
    )
}
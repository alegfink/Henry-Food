import React from "react";
import s from './Paginado.module.css';
import { useSelector, useDispatch } from "react-redux";
import { maxPageNumber, minPageNumber, savePage } from "../../actions";



export default function Paginado ({recipesPerPage, allRecipes}){
    const pageNumber = []
    const actualP = useSelector(state=>state?.recordedPage)
    
    const dispatch = useDispatch()
    const maxPage = useSelector(state=>state?.maxPage)
    const minPage = useSelector(state=>state?.minPage)
    
    
    for(let i=1; i<=Math.ceil( allRecipes / recipesPerPage ); i++){
        pageNumber.push(i)
    }
    

    const paginado = (number) =>{
        
        dispatch(savePage(number))
    }
    
    
    function handlePrevBut() {
                    
        dispatch(savePage(actualP-1))
        dispatch (minPageNumber(-1))
        dispatch (maxPageNumber(-1))
        }
            
    function handleNextBut() {
            
        dispatch(savePage(actualP+1))
        dispatch (minPageNumber(1))
        dispatch (maxPageNumber(1))
            
        }
       
    
    
    return (
        <nav >
            
            <ul className={s.pageNumbers}>
                <li className={actualP>1?s.prevNext:s.noPrevBut} onClick={handlePrevBut}>
                    
                    Prev
                </li>
                
                
                {
                    pageNumber.map((number)=>{  
                        if(number < maxPage+1 && number > minPage){
                            
                            return(
                                <li 
                                key={number} 
                                id={number} 
                                onClick={()=>paginado(number)}
                                className={actualP === number? s.active : s.pages}
                                >
                                {number}
                                </li>
                                )}
                        }) 
                            
                }
            
                       
                
                <li className={actualP!==pageNumber.length?s.prevNext:s.noPrevBut} onClick={handleNextBut}>
                    Next
                </li>
            
            
            </ul>
            
        </nav>
    )
}
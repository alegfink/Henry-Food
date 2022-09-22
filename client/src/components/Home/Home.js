import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes, postInitRecipes, filterRecipsByDiet, savePage, deleteFilter, orderByName,searchByName, orderByHealthScore } from '../../actions';
import Card from '../Card/Cards.js';
import NavBar from '../NavBar/NavBar.js';
import Paginado from '../Paginado/Paginado.js';
import SearchBar from '../SearchBar/SearchBar.js';
import FilterBar from '../FilterBar/FilterBar.js';
import s from './Home.module.css'

// Ruta principal: debe contener

// [ ] Input de búsqueda para encontrar recetas por nombre
// [ ] Área donde se verá el listado de recetas. Deberá mostrar su:
// Imagen
// Nombre
// Tipo de dieta (vegetariano, vegano, apto celíaco, etc)
// [ ] Botones/Opciones para filtrar por por tipo de dieta
// [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por health score (nivel de comida saludable).
// [ ] Paginado para ir buscando y mostrando las siguientes recetas, 9 recetas por pagina, mostrando las primeros 9 en la primer pagina.

export default function Home(){

    const dispatch = useDispatch()
    const gif = 'https://media2.giphy.com/media/HeMju6ptLhZ7XCA4vH/giphy.gif?cid=790b7611adf768434dfa5bd572ec4332d478fca69a7bf862&rid=giphy.gif&ct=s'
    let allRecipes = useSelector (state=>state?.recipes)
    const titleSearch = useSelector (state=>state?.recipesSearch)
    let [order, setOrder] = useState('')
    const [loadingg, setLoadingg] = useState(false)
    //para intentar resetear el filtro cuando se actualiza
    const filter = useSelector(state=>state?.deleteFilter)
    const actualPage = useSelector(state=>state.recordedPage)
    let [currentPage, setCurrentPage] = useState(1)

    useEffect(()=>{
        dispatch(getAllRecipes());
        setTimeout( ()=>{
            setLoadingg(true) 
        }, 1000)
        
        actualPage && setCurrentPage(actualPage)
        return()=>{
            dispatch(savePage(currentPage))
            dispatch(deleteFilter())//para resetear el filtro cuando actualiza
           
        }
    },[dispatch]) //para reseterar el filtro cuando actualiza

    // const handleRecharge = (e) => {
    //     e.preventDefault()
    //     dispatch(getAllRecipes()) 
    // }

    
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes?.slice(indexOfFirstRecipe, indexOfLastRecipe)
    const [title, setTitile] = useState('')

    const [loading, setLoading] = useState(true);
    const [maxPageNumberLimit, setmaxPageNumberLimit]= useState(4);
    const [minPageNumberLimit, setminPageNumberLimit]= useState(0);

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    const handleFilterDiet=(e)=>{
        e.preventDefault()
        dispatch(filterRecipsByDiet(e.target.value))
        setmaxPageNumberLimit(4)
        setminPageNumberLimit(0)
        setCurrentPage(1)
    }

    function handleOrderByName(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado: ${e.target.value}`)
        setmaxPageNumberLimit(4)
        setminPageNumberLimit(0)
    }

    function handleOrderByHealthScore(e){
        e.preventDefault()
        dispatch(orderByHealthScore(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado: ${e.target.value}`)
        setmaxPageNumberLimit(4)
        setminPageNumberLimit(0)

    }

    // function handleInput(e){
    //     e.preventDefault()
    //     setTitile(e.target.value)
    //     dispatch(searchByName(title))
    // }

    // function handlePrevBut() {
    //     setCurrentPage(currentPage-1)

    // }

    // function handleNextBut() {
    //     setCurrentPage(currentPage+1)
        

    // }

    // function handleInput(e){
    //     e.preventDefault()
    //     setTitile(e.target.value)
    //     dispatch(searchByName(title))
    // }

    // function handleSearch(e){
    //     e.preventDefault()
    //     dispatch(searchByName(title))

    //     setTitile('')
    // }

    // function handleSearch(e){
    //     e.preventDefault()
    //     dispatch(searchByName(title))
        
    // }

    // const pageNumber = []
    // for(let i=1; i<=Math.ceil( allRecipes / recipesPerPage ); i++){
    //     pageNumber.push(i)
    // }

    

    function handlePrevBut() {
        setCurrentPage(currentPage-1)
        setminPageNumberLimit(minPageNumberLimit-1)
        setmaxPageNumberLimit(maxPageNumberLimit-1)
        console.log ('CURRENT PAGE1', currentPage)

    }

    function handleNextBut() {
        setCurrentPage(currentPage+1)
        setmaxPageNumberLimit(maxPageNumberLimit+1)
        setminPageNumberLimit(minPageNumberLimit+1)
        console.log ('CURRENT PAGE2', currentPage)

    }

    
    // function handleInput(e){
    //     e.preventDefault()
    //     setCurrentPage(1)   
    //     setTitile(e.target.value)
    //     dispatch(searchByName(title))
        
    // }

    return (
        <div>
            <div>
                <NavBar/>
            </div>
            {/* <h1>Home</h1> */}
            {/* <div>
                <label>Receta:</label>
                <input type="text" id="title" />
                <Link to = '/detail'>
                <button>Buscar</button>
                </Link>
            </div> */}
            {/* <Link to = '/detail'>
                Ingresar
            </Link> */}
            {/* <button  onClick={(e)=> handleRecharge()}>Recargar</button> */}
            {/* <div>
                <label htmlFor='title'>Busqueda</label>
                <input type='text' id='title' autoComplete='off' value={title} placeholder= "Search Recipe" onChange={e=>handleInput(e)}></input>
                <button onClick={(e)=>handleSearch(e)}>Buscar</button>
            </div> */}
            <div>
                <SearchBar
                // handleInput={handleInput}
                // title={title}
                setCurrentPage={setCurrentPage}
                setminPageNumberLimit={setminPageNumberLimit}
                setmaxPageNumberLimit={setmaxPageNumberLimit}

                />
            </div>
            <div>
                <FilterBar
                handleFilterDiet={handleFilterDiet}
                handleOrderByHealthScore={handleOrderByHealthScore}
                handleOrderByName={handleOrderByName}
                />
            {/* <select onChange={e=>handleOrderByName(e)}>
                    <option value='asc'>(a-z) Ascendent</option>
                    <option value='desc'>(z-a) Descendent</option>
                </select>
                <select onChange={e=>handleOrderByHealthScore(e)}>
                    <option value='low'>Lower</option>
                    <option value='hi'>Higher</option>
                </select>
                <select onChange={e=>handleFilterDiet(e)}>
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
                </select> */}
                {/* {console.log("ALL RECIPES",allRecipes)} */}
            </div>
            {
                !loadingg?(
                    <div className={s.loadingg}>
                        <img  src={gif}/>
                    </div>
                    
                )
                :
                <div>
            {allRecipes &&
            <Paginado
            recipesPerPage = {recipesPerPage}
            allRecipes = {allRecipes.length}
            currentPage = {currentPage}
            setCurrentPage = {setCurrentPage}
            
            paginado = {paginado}
            // pageNumber={pageNumber}
            maxPageNumberLimit={maxPageNumberLimit}
            minPageNumberLimit={minPageNumberLimit}
            handlePrevBut = {handlePrevBut}
            handleNextBut = {handleNextBut}
            />
            
            }
            
            <div className={s.containerCard}>
            
            {   
                // loading?(
                //     <div>
                //         <span>cargando</span>
                //         {
                //             setTimeout(() => {
                //                 setLoading(false);
                //               }, 3000)
                //         }
                //     </div>
                // )
                // :
                currentRecipes && currentRecipes.map(el=>{
                    // console.log('SOY RECIPESs',currentRecipes)
                    return(
                        <div>
                            {/* {console.log('ELEMENTO', el)} */}
                            <Link key={el.id} to={`/detail/${el.id}`}>
                                <Card title={el.title} image={el.image} diets={el.diets} healthScore={el.healthScore} key={el.id}/>
                            </Link>
                            
                        </div>

                    
                    )
                })
                // :
                
                // titleSearch && titleSearch.map(el=>{
                //     console.log('BUSQUEDA', titleSearch)
                //     return(
                //         <div>
                            
                //             <Link key={el.id} to={`/detail/${el.id}`}>
                //                 <Card title={el.title} image={el.image} diets={el.diets} key={el.id}/>
                //             </Link>
                            
                //         </div>

                    
                //     )
                // })
            }
            </div>
            
            </div>
            }
            
        </div>
    )
}
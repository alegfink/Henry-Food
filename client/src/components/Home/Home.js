import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes, postInitRecipes, filterRecipsByDiet, deleteFilter, orderByName,searchByName } from '../../actions';
import Card from '../Card/Cards.js';
import Paginado from '../Paginado/Paginado';

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
    
    const allRecipes = useSelector (state=>state?.recipes)
    const titleSearch = useSelector (state=>state?.recipesSearch)
    const [order, setOrder] = useState('')

    //para intentar resetear el filtro cuando se actualiza
    const filter = useSelector(state=>state?.deleteFilter)

    useEffect(()=>{
        dispatch(getAllRecipes());
        return()=>{
            dispatch(deleteFilter())//para resetear el filtro cuando actualiza
        }
    },[dispatch, filter]) //para reseterar el filtro cuando actualiza

    // const handleRecharge = (e) => {
    //     e.preventDefault()
    //     dispatch(getAllRecipes()) 
    // }

    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes?.slice(indexOfFirstRecipe, indexOfLastRecipe)
    const [title, setTitile] = useState('')


    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    function handleFilterDiet(e){
        e.preventDefault()
        dispatch(filterRecipsByDiet(e.target.value))
    }

    function handleOrderByName(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado: ${e.target.value}`)

    }

    function handleInput(e){
        e.preventDefault()
        setTitile(e.target.value)
        dispatch(searchByName(title))
    }

    // function handleSearch(e){
    //     e.preventDefault()
    //     dispatch(searchByName(title))

    //     setTitile('')
    // }

    // function handleSearch(e){
    //     e.preventDefault()
    //     dispatch(searchByName(title))
        
    // }

    return (
        <div>
            <h1>Home</h1>
            {/* <div>
                <label>Receta:</label>
                <input type="text" id="title" />
                <Link to = '/detail'>
                <button>Buscar</button>
                </Link>
            </div> */}
            <Link to = '/detail'>
                Ingresar
            </Link>
            {/* <button  onClick={(e)=> handleRecharge()}>Recargar</button> */}
            <div>
                <label htmlFor='title'>Busqueda</label>
                <input type='text' id='title' autoComplete='off' value={title} placeholder= "Search Recipe" onChange={e=>handleInput(e)}></input>
                {/* <button onClick={(e)=>handleSearch(e)}>Buscar</button> */}
            </div>
            <div>
            <select onChange={e=>handleOrderByName(e)}>
                    <option value='asc'>(a-z) Ascendent</option>
                    <option value='desc'>(z-a) Descendent</option>
                </select>
                <select>
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
                </select>
                {/* {console.log("ALL RECIPES",allRecipes)} */}
            {allRecipes &&
            <Paginado
            recipesPerPage = {recipesPerPage}
            allRecipes = {allRecipes.length}
            paginado = {paginado}/>
            }
            
            
            {   
            // title===''?
                currentRecipes && currentRecipes.map(el=>{
                    // console.log('BUSQUEDA', currentRecipes)
                    return(
                        <div>
                            {/* {console.log('ELEMENTO', el)} */}
                            <Link key={el.id} to={`/detail/${el.id}`}>
                                <Card title={el.title} image={el.image} diets={el.diets} key={el.id}/>
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
    )
}
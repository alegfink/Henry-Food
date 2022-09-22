import axios from 'axios';
export const POST_INIT_RECIPES = 'POST_INIT_RECIPES';
export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_RECIPE_DETAIL = 'GET_RECIPES_DETAIL';
export const DELETE_DETAIL = 'DELETE_DETAIL';
export const FILTER_BY_DIET = 'FILTER_BY_DIET';
export const DELETE_FILTER = 'DELETE_FILTER';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';
export const POST_NEW_RECIPE = 'POST_NEW_RECIPE';
export const GET_ALL_DIETS = 'GET_ALL_DIETS';
export const ORDER_BY_HEALTHSCORE = 'ORDER_BY_HEALTHSCORE';
export const SAVE_PAGE = 'SAVE_PAGE';

//aca armo la ruta

export function postInitRecipes () {
  return function(dispatch) {
        
      return axios.post('http://localhost:3001/')
        .then(json => {
          dispatch({ 
            type: POST_INIT_RECIPES, 
            payload: json.data,
        });
        })
        .catch(err=>{
          dispatch({ 
            type: POST_INIT_RECIPES, 
            payload: err.data,
        })
        })
    };
  };

export function getAllRecipes (){
  return function (dispatch){
    return axios.get('http://localhost:3001/recipe/all') 
      .then(json=>{
        dispatch({
          type: GET_ALL_RECIPES,
          payload: json.data
        })
      })
      .catch(err=>{
        dispatch({ 
          type: GET_ALL_RECIPES, 
          payload: err.data,
      })
      })
  }
}

export function deleteDetail(){
  return{
      type: DELETE_DETAIL,
  }
}

export function getRecipeDetail (id){
  return function (dispatch){
    return axios.get(`http://localhost:3001/recipe/${id}`)
      .then(json=>{
        // console.log('JSON', json.data)
        dispatch({
          type: GET_RECIPE_DETAIL,
          payload: json.data
        })
      })
      .catch(err=>{
        dispatch({ 
          type: GET_RECIPE_DETAIL, 
          payload: err.data,
      })
      })
  }
}

export function filterRecipsByDiet(payload){
  return {
    type: FILTER_BY_DIET,
    payload
  }
}

export function deleteFilter(){ // para resetear el filtro cuando actualiza
  return{
    type: DELETE_FILTER
  }
}

export function orderByName(payload){
  return{
    type: ORDER_BY_NAME,
    payload
  }
}

export function orderByHealthScore(payload){
  return{
    type: ORDER_BY_HEALTHSCORE,
    payload
  }
}

export function searchByName(payload){
  return function(dispatch) {
    return axios.get(`http://localhost:3001/recipe?name=${payload}`)
        .then(json => {
          dispatch({ 
            type: SEARCH_BY_NAME, 
            payload: json.data,
        });
        })
        .catch(err=>{
          dispatch({
            type: SEARCH_BY_NAME,
            payload: err.data
          })
        })
      }
}

export function postNewRecipe (payload){
  return function (dispatch){
    return axios.post('http://localhost:3001/recipe/asd', payload)
      .then((json)=>{
        dispatch({                 // o return json
          type: POST_NEW_RECIPE,
          payload:json.data
        })}
      )
      .catch(err=>{
        dispatch({ 
          type: POST_NEW_RECIPE, 
          payload: err.data,
      })
      })
  } 
}

export function getAllDiets(){
  return function (dispatch){
    return axios.get('http://localhost:3001/diet')
      .then(json=>{
        dispatch({
          type: GET_ALL_DIETS,
          payload: json.data
        })
      })
      .catch(err=>{
        dispatch({ 
          type: GET_ALL_DIETS, 
          payload: err.data,
      })
      })
  }
}

export function savePage(payload){
  return{
    type: SAVE_PAGE,
    payload
  }
}

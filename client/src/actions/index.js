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
export const MAX_PAGE_NUMBER = 'MAX_PAGE_NUMBER';
export const MIN_PAGE_NUMBER = 'MIN_PAGE_NUMBER';
export const RESET_MAX_MIN = 'RESET_MAX_MIN;';
export const RESET_PAGE = 'RESET_PAGE';
export const FILTER_DONE = 'FILTER_DONE';
export const RESET_SEARCH = 'RESET_SEARCH';
export const SET_TITLE = 'SET_TITLE';

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
            type: POST_NEW_RECIPE, 
            payload: err.response.data,
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
          payload: err.response.data,
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

export function maxPageNumber(payload){
  return{
    type: MAX_PAGE_NUMBER,
    payload
  }
}

export function minPageNumber(payload){
  return {
    type: MIN_PAGE_NUMBER,
    payload
  }
}

export function resetMaxMin(){
  return{
    type: RESET_MAX_MIN
  }
}

export function resetPage(){
  return{
    type:RESET_PAGE
  }
}
export function filterDone(){
  return{
    type: FILTER_DONE
  }
}
export function resetSearch(){
  return{
    type:RESET_SEARCH
  }
}
export function setTitle(payload){
  return{
    type: SET_TITLE,
    payload
  }
}
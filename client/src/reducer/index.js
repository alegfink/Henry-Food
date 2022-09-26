const { POST_INIT_RECIPES, RESET_PAGE, RESET_SEARCH, SET_TITLE, GET_ALL_RECIPES, GET_RECIPE_DETAIL,RESET_MAX_MIN, DELETE_DETAIL, FILTER_BY_DIET, FILTER_DONE, MAX_PAGE_NUMBER, MIN_PAGE_NUMBER, DELETE_FILTER, SAVE_PAGE, ORDER_BY_NAME, SEARCH_BY_NAME, POST_NEW_RECIPE, GET_ALL_DIETS, ORDER_BY_HEALTHSCORE} = require("../actions");


const initialState = {
    recipesOk : [],
    recipes : [],
    recipeDetail: {},
    dietFiltered: [],
    allRecipes: [],
    recipesSearch:[],
    allDiets:[],
    recordedPage:1,
    maxPage:4,
    minPage:0,
    filter: true,
    title:'',
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case POST_INIT_RECIPES:
            return {
                ...state,
                recipesOk: action.payload
            };
        case GET_ALL_RECIPES:
            return{
                ...state,
                // recipes: action.payload,
                allRecipes: action.payload
            };
        case GET_RECIPE_DETAIL:
            
            return{
                ...state,
                recipeDetail: action.payload
            }
        case DELETE_DETAIL:
            
            return{
                ...state,
                recipeDetail:{}
            }
        case FILTER_BY_DIET:
            const allRecipe = state.allRecipes
            
            let dietFiltered = action.payload === 'All'? allRecipe : allRecipe.filter(el=>{
                const asd = el.diets.filter(el=>el.name===action.payload)
                if(asd.length>0){
                    return true
                }
                return false
                })
            
            return{
                ...state,
                recipes: dietFiltered
            }
        case DELETE_FILTER:
            return{
                ...state,
                dietFiltered: []
            }
        case ORDER_BY_NAME:
            
            let arrayOrd = action.payload === 'asc' ?
                state.recipes.sort((a,b)=>{
                    if (a.title>b.title) return 1
                    if (b.title>a.title) return -1
                    return 0
                }):
                state.recipes.sort((a,b)=>{
                    if (a.title>b.title) return -1
                    if (b.title>a.title) return 1
                    return 0
                })
                
            return{
                ...state,
                recipes: arrayOrd,
                
            }
        case ORDER_BY_HEALTHSCORE:
            let arrayLowHigh = action.payload === 'low'?
                state.recipes.sort((a,b)=>{
                    if (a.healthScore>b.healthScore) return 1
                    if (b.healthScore>a.healthScore) return -1 
                    return 0       
                }):
                state.recipes.sort((a,b)=>{
                    if (a.healthScore>b.healthScore) return -1
                    if (b.healthScore>a.healthScore) return 1 
                    return 0 
                })
            return{
                ...state,
                recipes: arrayLowHigh,
                
            }
        case SEARCH_BY_NAME:
            return{
                ...state,
                recipesSearch: action.payload&&action.payload,
                recipes: action.payload&&action.payload
            }
        case POST_NEW_RECIPE:
            
            return{
                ...state
            }
        case GET_ALL_DIETS:
            
            return{
                ...state,
                allDiets: action.payload
            }
        case SAVE_PAGE:
            
            return{
                ...state,
                recordedPage: action.payload
            }
        case MAX_PAGE_NUMBER:
            return {
                ...state,
                maxPage: state.maxPage + action.payload
            }
        case MIN_PAGE_NUMBER:
            return {
                ...state,
                minPage: state.minPage + action.payload
            }
        case RESET_MAX_MIN:
            
            return{
                ...state,
                maxPage:4,
                minPage:0
            }
        case RESET_PAGE:
            return{
                ...state,
                recordedPage:1
            }
        case FILTER_DONE:
            return {
                ...state,
                filter: state.filter? false: true
            }
        case RESET_SEARCH:
            return{
                ...state,
                recipes:[]
            }
        case SET_TITLE:
            return{
                ...state,
                title: action.payload
            }
        default:
            return state;
    }        
}



module.exports={
    rootReducer
}
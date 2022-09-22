const { POST_INIT_RECIPES, GET_ALL_RECIPES, GET_RECIPE_DETAIL, DELETE_DETAIL, FILTER_BY_DIET, DELETE_FILTER, SAVE_PAGE, ORDER_BY_NAME, SEARCH_BY_NAME, POST_NEW_RECIPE, GET_ALL_DIETS, ORDER_BY_HEALTHSCORE } = require("../actions");


const initialState = {
    recipesOk : [],
    recipes : [],
    recipeDetail: {},
    dietFiltered: [],
    allRecipes: [],
    recipesSearch:[],
    allDiets:[],
    recordedPage:[],

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
                recipes: action.payload,
                allRecipes: action.payload
            };
        case GET_RECIPE_DETAIL:
            // console.log('ENTRA AL REDUCER', action.payload)  
            return{
                ...state,
                recipeDetail: action.payload
            }
        case DELETE_DETAIL:
            console.log('ENTRA AL REDUCER')
            return{
                ...state,
                recipeDetail:{}
            }
        case FILTER_BY_DIET:
            const allRecipe = state.allRecipes
            console.log('ACTION',action.payload)
            console.log('ALLRECIP', allRecipe)
            let dietFiltered = action.payload === 'All'? allRecipe : allRecipe.filter(el=>{
                const asd = el.diets.filter(el=>el.name===action.payload)
                if(asd.length>0){
                    return true
                }
                return false
                })
            console.log('DIETASFILT', dietFiltered)
                
                    // for (let clave in el.diets){
                    //     console.log("CLAVE", clave)
                    //     console.log('USUARIO', el[clave])
                    // }
                
                // console.log("DIETAS",el.diets)
                // el.diets.includes({
                //     "name": "gluten free"})
                // el.id === 636608
                
                // console.log('PRUEBA', el.diets.includes('lacto ovo vegetarian'))
            // })
            
            return{
                ...state,
                recipes: dietFiltered
            }
        case DELETE_FILTER: // para resetear el filtro cuando actualiza
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
                console.log('SOY EL ARRAY',arrayOrd)
            return{
                ...state,
                recipes: arrayOrd
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
                recipes: arrayLowHigh
            }
        case SEARCH_BY_NAME:
            return{
                ...state,
                recipesSearch: action.payload,
                recipes: action.payload
            }
        case POST_NEW_RECIPE:
            // console.log('SOY EL REDUCER', action.payload)
            return{
                ...state
            }
        case GET_ALL_DIETS:
            
            return{
                ...state,
                allDiets: action.payload
            }
        case SAVE_PAGE:
            console.log('ENTRA AL SAVE')
            return{
                ...state,
                recordedPage: action.payload
            }
        default:
            return state;
    }        
}



module.exports={
    rootReducer
}
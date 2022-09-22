const { Router } = require('express');
const axios = require('axios');
const { ConnectionAcquireTimeoutError } = require('sequelize');
const { Op, Recipe, Diet, DishType, RecipeDiet, RecipeDish } = require('../db.js');
const { route } = require('./diet.js');
const router = Router();
const {validatePost, validateExistDish, validateExistDiet, indexExist} = require('./util')

const API_KEY = '9b8239a921084a88a38274901fbc9daf'

const postApiInfo = async ()=>{
    
    const hasRecipes = await Recipe.findAll()
    if(hasRecipes.length===0){
        let apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`); 
    
    apiUrl.data.results.forEach(async el=>{
        let stepss = el.analyzedInstructions[0]?.steps.map(s=>{
            return s.number.toString()+' '+s.step
        })
        
        asd = stepss?.join('<br />')
        console.log(asd)
        
        // let stepss = ''
        // console.log('INSTRUCCIONES',el.analyzedInstructions)
        // console.log('INSTRUCCIONESII',el.analyzedInstructions[0].steps)
        // for (let i = 0; i < el.analyzedInstructions[0].steps.length; i++) {
        //     stepss = stepss.concat(el.analyzedInstructions[0].steps[i].number)
            
        // }
        
        await Recipe.create({
            title: el.title,
            id: el.id,
            summary: el.summary,
            healthScore: el.healthScore,
            steps: asd,
            image: el.image
        })
    })
    const dishh = await DishType.findAll()
    dishh.length===0? await DishType.bulkCreate([   
        {"name": "side dish"},
        {"name": "lunch"},
        {"name": "main course"},
        {"name": "main dish"},
        {"name": "dinner"},
        {"name": "dairy free"},
        {"name": "lacto ovo vegetarian"},
        {"name": "vegan"},
        {"name": "morning meal"},
        {"name": "brunch"},
        {"name": "breakfast"},
        {"name": "soup"},
        {"name": "salad"},
        {"name": "condiment"},
        {"name": "dip"},
        {"name": "sauce"},
        {"name": "spread"},
        {"name": "dessert"},
        {"name": "appetizer"},
        {"name": "bread"},
        {"name": "beverage"},
        {"name": "marinade"},
        {"name": "fingerfood"},
        {"name": "snack"},
        {"name": "drink"}
    ]): null
    const dietass = await Diet.findAll()
    dietass.length===0? await Diet.bulkCreate([
        {"name": "gluten free"},
        {"name": "dairy free"},
        {"name": "lacto ovo vegetarian"},
        {"name": "vegan"},
        {"name": "paleolithic"},
        {"name": "primal"},
        {"name": "whole 30"},
        {"name": "pescatarian"},
        {"name": "ketogenic"},
        {"name": "fodmap friendly"},
    ]): null
    apiUrl.data.results.forEach( async el=>{
        let dish = await DishType.findAll({
        where:{
            name: el.dishTypes
        }
        });
        let dieta = await Diet.findAll({
            where:{
                name: el.diets
            }
        })
        let recett = await Recipe.findByPk(el.id)
        await recett.setDishTypes(dish)
        await recett.setDiets(dieta)
    })}
}

router.post('/', async(req,res)=>{
    try{
    const done = await postApiInfo()
    done? res.status(202).json('salio todo bien') : res.status(404).json('ya habia info')
    }catch(err){
    res.status(404).json('algo salio mal')
    }
})

router.post('/', async(req,res)=>{
    const {title, id, summary, healthScore, steps, image, dishTypes, diets, results} = req.body
    
    // const error = validatePost(req.body);
    // if (error) return res.status(404).json("Falta enviar datos obligatorios")
    try{
        // const receta = await Recipe.create({
        //     title,
        //     id,
        //     summary,
        //     healthScore,
        //     steps,
        //     image
        // })
        
         results.forEach(async el=>{
             Recipe.create({
            title: el.title,
            id: el.id,
            summary: el.summary,
            healthScore: el.healthScore,
            steps: el.steps,
            image: el.image
        });
        
        })
        
        
        // console.log(await validateExistDish())
        // await validateExistDish()? await DishType.bulkCreate([
        // aca busco si hay algo creado de tipos de comida, en caso de que no, lo creo
        const dishh = await DishType.findAll()
        // console.log (dishh)
        dishh.length===0? await DishType.bulkCreate([   
            {"name": "side dish"},
            {"name": "lunch"},
            {"name": "main course"},
            {"name": "main dish"},
            {"name": "dinner"},
            {"name": "dairy free"},
            {"name": "lacto ovo vegetarian"},
            {"name": "vegan"},
            {"name": "morning meal"},
            {"name": "brunch"},
            {"name": "breakfast"},
            {"name": "soup"},
            {"name": "salad"},
            {"name": "condiment"},
            {"name": "dip"},
            {"name": "sauce"},
            {"name": "spread"},
            {"name": "dessert"},
            {"name": "appetizer"},
            {"name": "bread"},
            {"name": "beverage"},
            {"name": "marinade"},
            {"name": "fingerfood"},
            {"name": "snack"},
            {"name": "drink"}
        ]): null
        // await validateExistDiet()? await Diet.bulkCreate([
        // aca busco si hay algo creado de tipos de dietas, en caso de que no, lo creo
        const dietass = await Diet.findAll()
        dietass.length===0? await Diet.bulkCreate([
            {"name": "gluten free"},
            {"name": "dairy free"},
            {"name": "lacto ovo vegetarian"},
            {"name": "vegan"},
            {"name": "paleolithic"},
            {"name": "primal"},
            {"name": "whole 30"},
            {"name": "pescatarian"},
            {"name": "ketogenic"},
            {"name": "fodmap friendly"},
        ]): null
        
        // const dish = await DishType.findAll({
        //     where:{
        //         name:{
        //             [Op.in]:[`${dishTypes}`]
        //         }
        //     }
        // })
        // const dish = await DishType.findAll({
        //     where:{
        //         name:{
        //             [Op.eq]:`${dishTypes}`
        //         }
        //     }
        // })
        //aca guardo un arreglo con los dishtype
        results.forEach( async el=>{
            let dish = await DishType.findAll({
            where:{
                name: el.dishTypes
            }
            });
            let dieta = await Diet.findAll({
                where:{
                    name: el.diets
                }
            })
            let recett = await Recipe.findByPk(el.id)
            await recett.setDishTypes(dish)
            await recett.setDiets(dieta)
        })
        
        // // // const dish = await DishType.findAll({
        // // //     where:{
        // // //         name: dishTypes
        // // //     }
        // // // })
        
        // const dish = await dishTypes.map(async d=>{
        //     await DishType.findAll({
        //         where:{
        //             name:{
        //                 [Op.eq]:`${d}`}
        //         }
        //     })
        // })
        // console.log(dish)
        //aca guardo un arreglo con las dietas
        // // // // const dieta = await Diet.findAll({
        // // // //     where:{
        // // // //         name: diets
        // // // //     }
        // // // // })
        // // // // // aca busco la receta
        // // // // const recet = await Recipe.findByPk(id)
        // // // // await recet.setDishTypes(dish)
                
        // // // // await recet.setDiets(dieta)
        
        // [
        //     dishType {
        //       dataValues: { id: 2, name: 'lunch' },
        //       _previousDataValues: { id: 2, name: 'lunch' },
        //       uniqno: 1,
        //       _changed: Set(0) {},
        //       _options: {
        //         isNewRecord: false,
        //         _schema: null,
        //         _schemaDelimiter: '',
        //         raw: true,
        //         attributes: [Array]
        //       },
        //       isNewRecord: false
        //     }
        //   ]
        
        // const recetaCompleta = results.map( async el=>{ 
        //     let asd = await Recipe.findAll({
        //     where:{
        //         id: el.id
        //     },
            // include: [
                // {
                //     model:Diet,
                //     attributes:['name'],
                //     through:{
                //        attributes:[],
                //     }
                //    },
                //    {
                //    model:DishType,
                //    attributes:['name'],
                //     through:{
                //        attributes:[],
                //     }
                // }
            // ]
        // });
        const recceta = await Recipe.findAll({
            include:[
                {
                    model:Diet,
                    attributes:['name'],
                    through:{
                       attributes:[],
                    }
                   },
                   {
                   model:DishType,
                   attributes:['name'],
                    through:{
                       attributes:[],
                    }
                }
            ]
        })
        console.log(recceta)
        
        
        // res.status(202).json('asd')
        recceta? res.status(202).json(recceta): res.status(404).json('no se pudieron crear las recetas')
    }catch(err){
        res.status(404).json('error primer post')
    }
})

module.exports = router;
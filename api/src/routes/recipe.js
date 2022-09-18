const { Router } = require('express');
const { ConnectionAcquireTimeoutError } = require('sequelize');
const { Op, Recipe, Diet, DishType, RecipeDiet, RecipeDish } = require('../db.js');
const { route } = require('./diet.js');
const router = Router();
const {validatePost, validateExistDish, validateExistDiet, indexExist} = require('./util')



router.get('/', async(req,res)=>{
    const {name} = req.query
    try{
        const contain = await Recipe.findAll({
        where:{
            title:{
                [Op.iLike]: `%${name}%`
                }
            }
        })
        contain.length>0? res.status(202).json(contain) : res.status(404).json('no se encontro receta con ese nombre')
    }catch(err){
        res.status(404).json('algo fallo busqueda query')
    }
})

// [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
// [ ] Resumen del plato
// [ ] Nivel de "comida saludable" (health score)
// [ ] Paso a paso

// [ ] GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados
router.get('/all', async(req, res)=>{
    try{
        const allRecet = await Recipe.findAll({
            include: [
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
        });
        console.log(allRecet)
        allRecet && res.status(202).json(allRecet)
    }catch(err){
        res.status(404).json('error en el all')
    }
})

router.get('/:id', async (req,res)=>{
    const {id} = req.params
    try{
        const receta = await Recipe.findAll({
            where:{
                id: id
            },
            include: [
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
        
        // const dietId = await RecipeDiet.findAll({
        //     where:{
        //         recipeId:id
        //     }
        // })
        // const dieta = await Diet.findAll({
        //     where:{
        //         id: idDiet.dietId
        //     }
        // })
        // console.log(receta)
        // console.log(dietId)
        
        // const recetaTotal = {receta, dieta}
    

        receta? res.status(202).send(...receta) : res.status(404).json('no se encontro receta por ese ID')
    }catch(err){
        res.status(404).json('error get por id')
    }
})

// Ruta de creación de recetas: debe contener

// [ ] Un formulario controlado con JavaScript con los siguientes campos:
// Nombre
// Resumen del plato
// Nivel de "comida saludable" (health score)
// Paso a paso
// [ ] Posibilidad de seleccionar/agregar uno o más tipos de dietas
// [ ] Botón/Opción para crear una nueva receta

// [ ] POST /recipes:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos relacionada con sus tipos de dietas.

let index = 0;
router.post('/asd', async(req,res)=>{
    const {title, summary, healthScore, steps, diets, id} = req.body
    try{
        // aca genero un index porque desde el formulario no me mandan ninguno
        index++
        let x=1
        // aca genero un while preguntando si existe el id, en caso de que si, que sume 1 y vuelva a preguntar, hasta que no se repita
        while (x===1){
            const exist = await Recipe.findByPk(index)
            // console.log (exist)
            exist? index++ : x++
        }
                
        const receta = await Recipe.create({
            title,
            summary,
            healthScore,
            steps,
            id: index
        })
        // const dieta = await Diet.findAll({
        //     where:{
        //         name: diets
        //     }
        // })    
        // await receta.setDiets(dieta)
        
        if (diets){
            const dieta = await Diet.findAll({
                where:{
                    name: diets
                }
            })
            const recet = await Recipe.findByPk(index)
            console.log(recet)
            await recet.setDiets(dieta)
            }
        return res.status(202).json('listo rey')
        
    }catch(err){
        res.status(404).json('error al postear el form')
    }
})

module.exports = router;
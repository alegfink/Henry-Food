import React from 'react';
import { useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { postNewRecipe, getAllDiets } from '../../actions';
import NavBar from '../NavBar/NavBar';
import s from './Form.module.css';
// import { validate } from './Errors.js';

export default function Form(){
  
    const dispatch = useDispatch()
    const dietss = useSelector(state=>state?.allDiets)
    const history = useHistory()
    const [errors, seterrors] = useState('')

    useEffect(()=>{
        dispatch(getAllDiets())
    },[dispatch])

    const [input, setInput] = useState({
        title:'',
        summary:'',
        healthScore:'',
        steps:'',
        diets:[],
        image: ''
    })
    
    const inputsError = ['title', 'summary', 'healthScore', 'steps', 'image']

    function validate(input) {
        let errors = {};
        if (!input.title) {
          errors.title = 'Title is required';
        }
        
        if (!input.summary) {
          errors.summary = 'Summary is required';
        }
        
        if (!input.healthScore) {
          errors.healthScore = 'HealtScore is required';
        } 
        else if (input.healthScore<0 || input.healthScore>100) {
          errors.healthScore = 'HealtScore is invalid';
        }
        if (!input.steps) {
          errors.steps = 'Steps is required';
          
        }
        
        if (input.image.includes('?url=http')||input.image.length>=255){
            
            errors.image = 'URL invalid'
        }
        
        return errors;
      };

    function handleChange(e){
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        seterrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        
        if(!inputsError.some(inp=>errors.hasOwnProperty(inp))&&input.title.length>0){
            dispatch(postNewRecipe(input))
            alert('Recipe created successfully')
            setInput({
                title:'',
                summary:'',
                healthScore:'',
                steps:'',
                diets:[],
                image: ''
                })
            history.push('/home')
        } else{
            
            alert('Complete mandatory data')
        }
        
    }

    function handleSelect(e){
        e.preventDefault()
        if (e.target.value !=="Types of diet"){
            if (!input.diets.includes(e.target.value)){
                setInput({
                    ...input,
                    diets: [...input.diets, e.target.value]
                })
            }
            
        }
        
    }

    function handleDelete(el){
        setInput({
            ...input,
            diets: [...input.diets.filter(diet=> diet !== el)]
        })
    }

    

    return(
        <div>
            <div>
                <NavBar/>
            </div>
            <div className={s.container}>
            <form className={s.form} onSubmit={e=>handleSubmit(e)}>
              <div className={s.group_title}>
                <div className={s.group}>
                <input className={s.input} type='text' name='title' value={input.name} placeholder='Title...' onChange={e=>handleChange(e)}></input>
                </div>
                {errors.title && <span className={s.error}>{errors.title}</span>}
              </div>
              <div className={s.group_summary}>
              <div className={s.group}>
              <textarea className={s.textarea} type='text' name='summary' cols="50" rows="3" value={input.name} placeholder='Summary...' onChange={e=>handleChange(e)}></textarea>
              </div>
                {errors.summary && <span className={s.error}>{errors.summary}</span>}
              </div>
              <div className={s.group_score}>
              <div className={s.group}>
              <input className={s.input} type='number' name='healthScore' value={input.name} placeholder='HealthScore...' onChange={e=>handleChange(e)}></input>
              </div>
                {errors.healthScore && <span className={s.error}>{errors.healthScore}</span>}
              </div>
              <div className={s.group_step}>
              <div className={s.group}>
              <textarea className={s.textarea} type='text' name='steps' cols="50" rows="5" value={input.name} placeholder='Steps...' onChange={e=>handleChange(e)}></textarea>
              </div>
                {errors.steps && <span className={s.error}>{errors.steps}</span>}
              </div>             
                
              
            <div>
            <select className={s.select} onChange={e=>handleSelect(e)}>
                <option>Types of diet</option>
                    {
                        dietss.map(e=>(
                        <option key={e.id} value={input.diets.name}>{e.name}</option>)
                        )
                    }
                    
              </select>
            {
                input.diets.length>0?
                <div className={s.group}>
                    <div className={s.dietSelected}>
                    <span>Selected Diets: {input.diets.map(el=>el + ' ,')}</span>
                </div>
                </div>
                :<span className={s.error}>No diet was selected</span>
            }
            <div className={s.deleteDiet}>
            {input.diets.map(el=>{
                
                return (
                <div >  
                    <span className={s.dietToDelete}>{el}</span>
                    <button className={s.button} onClick={e=>handleDelete(el)}>x</button>
                </div>

            )})}
            </div>
              
            </div>
            <div className={s.group_step}>
              <div className={s.group}>
              <input className={s.input} type='text' name='image' value={input.name} placeholder='Image Url...' onChange={e=>handleChange(e)}></input>
              </div>
                {input.image?(errors.image && <span className={s.error}>{errors.image}</span>):null}
            </div>
            <div className={s.containerSubmit}>  
            <button className={input.title!==''?s.submit:s.submitError} type='submit'>Create Recipe</button>  
            </div>  
                
                
            </form>
            
            </div>
            
            
        </div>
    )
}
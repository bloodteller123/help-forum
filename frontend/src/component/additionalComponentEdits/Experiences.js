import {Fragment, React} from 'react'
import FormExp from './FormExp'
import Button from '@mui/material/Button';
import '../../css/General.css'

const Experiences = ({experiences, addExperience, updateExperience}) => {

    const initNewExperience = () =>{
        addExperience({
            title:"",
            company:"",
            location:"",
            from:"",
            to:"",
            current:false,
            desc:"",
            index: experiences===undefined? 1 : experiences.slice(-1)[0].index + 1
        })
    }
    console.log(experiences)
  return (
    <>
    {experiences && experiences.map(exp =>
        {
            console.log(exp)
            return <FormExp k={exp.index} exp={exp} updateExperience={updateExperience}/>}
    )}
    <div className='buttonGroup'>
        <Button variant="outlined" onClick={initNewExperience}>Add Experience</Button>
    </div>
    </>
  )
}

export default Experiences



import {Fragment, React} from 'react'
import FormEducation from './FormEducation'
import Button from '@mui/material/Button';
import '../../css/General.css'

const Educations = ({educations, addEducation, updateEducation}) => {

    const initNewEducation = () =>{
        addEducation({
            school:"",
            degree:"",
            field:"",
            location:"",
            from:"",
            to:"",
            current:false,
            desc:"",
            index: educations===undefined? 1 : educations.slice(-1)[0].index + 1
        })
    }
    console.log(educations)
  return (
    <>
    {educations && educations.map(edu =>
        {
            console.log(edu)
            return <FormEducation k={edu.index} edu={edu} updateEducation={updateEducation}/>}
    )}
    <div className='buttonGroup'>
        <Button variant="outlined" onClick={initNewEducation}>Add Education</Button>
    </div>
    </>
  )
}

export default Educations



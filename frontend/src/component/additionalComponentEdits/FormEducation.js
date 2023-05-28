import {React, useState}  from 'react'
import '../../css/Form.css'
import '../../css/General.css'

const FormEducation =({k, edu, updateEducation}) => {
    console.log(edu)
    const [form, setForm] = useState({
        school:edu.school,
        degree:edu.degree,
        field:edu.field,
        location:edu.location,
        from:edu.from,
        to:edu.to,
        current:edu.current,
        desc:edu.desc,
        index: edu.index
    }); 

    const update = (e) =>{
        // console.log(e)
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
        console.log(k)
        console.log(edu.index)
        updateEducation(edu.index,e)
    }

  return (
    <div key={k} className='form sub-container'>
            <div className='formelement'>
                {/* <label>Email</label> */}
                <input className='input'
                    required
                    type='text'
                    name='school'
                    placeholder='School'
                    value={form.school}
                    onChange={update}
                />
            </div>
            <div className='formelement'>
                {/* <label>Message</label> */}
                <input className='input'
                    required    
                    name='degree'
                    placeholder='Degree'
                    value={form.degree}
                    onChange={update}
                />
            </div>
            <div className='formelement'>
                {/* <label>Message</label> */}
                <input className='input'
                    required    
                    name='field'
                    placeholder='Field'
                    value={form.field}
                    onChange={update}
                />
            </div>
            <div className='formelement'>
                {/* <label>Message</label> */}
                <input className='input'    
                    name='location'
                    placeholder='Location'
                    value={form.location}
                    onChange={update}
                />
            </div>
            <div className='formelement'>
                {/* <label>Message</label> */}
                <input className='input'
                    required    
                    name='from'
                    placeholder='From'
                    value={form.from}
                    onChange={update}
                />
            </div>
            <div className='formelement'>
                {/* <label>Message</label> */}
                <input className='input'
                    name='to'
                    placeholder='to'
                    value={form.to}
                    onChange={update}
                />
            </div>
            <div className='formelement'>
                {/* <label>Message</label> */}
                <textarea className='input'
                    name='desc'
                    placeholder='desc'
                    value={form.desc}
                    onChange={update}
                />
            </div>
    </div>
  )
}

export default FormEducation
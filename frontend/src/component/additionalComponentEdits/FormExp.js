import {React, useState}  from 'react'
import '../../css/Form.css'
import '../../css/General.css'

const FormExp =({k, exp, updateExperience}) => {
    console.log(exp)
    const [form, setForm] = useState({
        title:exp.title,
        company:exp.company,
        location:exp.location,
        from:exp.from,
        to:exp.to,
        current:exp.current,
        desc:exp.desc,
        index: exp.index
    }); 

    const update = (e) =>{
        // console.log(e)
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
        // console.log(k)
        // console.log(exp.index)
        updateExperience(exp.index,e)
    }

  return (
    <div key={k} className='form sub-container'>
            <div className='formelement'>
                {/* <label>Email</label> */}
                <input className='input'
                    required
                    type='text'
                    name='title'
                    placeholder='Title'
                    value={form.title}
                    onChange={update}
                />
            </div>
            <div className='formelement'>
                {/* <label>Message</label> */}
                <input className='input'
                    required    
                    name='company'
                    placeholder='Company'
                    value={form.company}
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

export default FormExp
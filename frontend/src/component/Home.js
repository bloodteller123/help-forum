import {Fragment, React} from 'react'
import '../css/General.css'
import '../css/Home.css'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
export const Home = () => {
  const nav = useNavigate()
  return (
    <Fragment>
      <div className="title-wrapper body-class">
        <h1 className="title">
          <span data-text="HELP">HELP</span>
          <span data-text="FORUM">FORUM</span>
        </h1>
        <span className="top-title">Join the community</span>
        <span className="bottom-title">To help</span>
      </div>
      <div style={{display:'flex'}}>
        <Button style={{margin:'auto', marginTop:'5%'}} variant="outlined" onClick={() => nav('/login')}>Enter</Button>
      </div>
    </Fragment>
  )
}

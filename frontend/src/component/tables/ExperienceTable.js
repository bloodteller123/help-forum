import {React, useEffect} from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import Moment from 'react-moment'
import { useDispatch } from 'react-redux';
import { deleteExp } from '../../reducers/profileReducer';

const ExperienceTable = ({experiences})=> {
    
    const dispatch = useDispatch()

    const deleteExpClient = async (exp) =>{
        console.log(exp._id)
        if (window.confirm('Are you sure you wish to delete this item?')){    
            console.log(exp)    
            let res = await dispatch(deleteExp(exp._id)).unwrap();
            console.log(res)
        }
    }

    useEffect(()=>{
        if(experiences===null) return <></>;
    }, [])
// https://mui.com/material-ui/react-table/
  return (
    <>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell >Company</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Loction</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Action</TableCell>
            </TableRow>
            </TableHead>

            <TableBody>
                {experiences && experiences.map((exp) => (
                    <TableRow
                        key={exp.index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {exp.company}
                        </TableCell>
                        <TableCell align="right">{exp.title}</TableCell>
                        <TableCell align="right">{exp.location}</TableCell>
                        <TableCell align="right">
                            <Moment format='MM-DD-YYYY'>{exp.from}</Moment> 
                            -
                            {
                                exp.to === null? ('Now') 
                                : 
                                <Moment format='MM-DD-YYYY'>{exp.to}</Moment>
                            }
                        </TableCell>
                        <TableCell align="right">{exp.desc}</TableCell>
                        <TableCell align="right">
                            <Button variant="outlined" color='error' 
                            onClick={()=>deleteExpClient(exp)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    </>
  )
}

export default ExperienceTable
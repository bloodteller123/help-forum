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
import { deleteEdu } from '../../reducers/profileReducer';

const EducationTable = ({educations})=> {
    const dispatch = useDispatch()

    const deleteEduClient = async (edu) =>{
        console.log(edu._id)
        if (window.confirm('Are you sure you wish to delete this item?')){    
            console.log(edu)    
            let res = await dispatch(deleteEdu(edu._id)).unwrap();
            console.log(res)
        }
    }

    useEffect(()=>{
        if(educations===null) return <></>;
    }, [])
// https://mui.com/material-ui/react-table/
  return (
    <>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>School</TableCell>
                <TableCell align="right">Degree</TableCell>
                <TableCell align="right">Field of Study</TableCell>
                <TableCell align="right">Loction</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Action</TableCell>
            </TableRow>
            </TableHead>

            <TableBody>
                {educations&&educations.map((edu) => (
                    <TableRow
                        key={edu._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {edu.school}
                        </TableCell>
                        <TableCell align="right">{edu.degree}</TableCell>
                        <TableCell align="right">{edu.field}</TableCell>
                        <TableCell align="right">{edu.location}</TableCell>
                        <TableCell align="right">
                            <Moment format='MM-DD-YYYY'>{edu.from}</Moment> 
                            -
                            {
                                edu.to === null? ('Now') 
                                : 
                                <Moment format='MM-DD-YYYY'>{edu.to}</Moment>
                            }
                        </TableCell>
                        <TableCell align="right">{edu.desc}</TableCell>
                        <TableCell align="right">
                            <Button variant="outlined" color='error' 
                            onClick={()=>deleteEduClient(edu)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    </>
  )
}

export default EducationTable
import React, {useEffect, useState}  from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import TimelinePagos from './TimelinePagos';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';


import axios from 'axios';
import { Divider } from '@mui/material';
import { Stack } from '@mui/system';

const apiUrl='http://localhost:3004/socios/'



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  '& .MuiTextField-root': { m: 1, width: '25ch' }
};


export default function StickyHeadTable() {
  const [data, setData]=React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [hPagos, setHPagos] = useState(false);
  const [eliminar, setEliminar] = useState(false);
  const [plan, setPlan] = useState('');
  const [create, setCreate] = React.useState({
    id:'',
    name:'',
    plan:'', 
    dni:'', 
    telefono:'', 
  })
  
  const peticionGet=async()=>{
    await axios.get(apiUrl)
    .then(response=>{
      setData(response.data);
    })
  }

  const peticionPost=async()=>{
    await axios.post(apiUrl, create)
    .then(response=>{
      setData(data.concat(response.data));
      handleClickOpen()
    })
  }

  const peticionPut = async () => {
    await axios.put(apiUrl + create.id, create)
    .then(response=>{
      var newData = data;
      newData.map(socio=>{
        if(create.id === socio.id){
         socio.name = create.name;
          socio.plan = create.plan;
          socio.dni = create.dni;
          socio.telefono = create.telefono;
        }
      })
      setData(newData);
       handleEdit();
    })
  }

  const peticionDelete = async ()=>{
    await axios.delete(apiUrl + create.id)
    .then(response=>{
      setData(data.filter(socio=>socio.id !== create.id))
    }) 
    handleEliminar();
  }

  const handleClickOpen = () => {
    setOpen(!open);

    console.log(data.length+1)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = e => {
    const {name, value} = e.target;
    setCreate(prevState => ({
      ...prevState,
      [name]:value
    }))
    console.log(create)
  }

  const handleEdit = ()=>{
   return setEdit(!edit);
  }

  const handleEliminar = ()=>{
    return setEliminar(!eliminar);
   }

   const handleHPagos = () => {
    setHPagos(!hPagos);

    
  };

  const selectSocio=(socio, event)=>{
    setCreate(socio);
    return (event ==='Edit')?handleEdit(true):handleEliminar()
  }


  useEffect(()=>{
     peticionGet()
  },[])


  const bodyInsertar=(
      <div>
      <Box
       sx={style}
       >                                   
       <TextField id="filled-basic" label="ID" name='id' value={data.length+1} onChange={handleChange} disabled/>
       
       <TextField id="filled-basic" label="Nombre" variant="filled" name='name' onChange={handleChange}/>
       {/* <TextField id="filled-basic" label="Plan" variant="filled" name='plan'  onChange={handleChange}/> */}
       <Box sx={{ width: '70%' ,paddingLeft: 1.2 }}>
       <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="filled-basic">
          Plan
        </InputLabel>
        <NativeSelect
          defaultValue={"Plan1"}
          inputProps={{
            name: 'plan',
            id: 'filled-basic',
          }}
          onChange={handleChange}
        >
          <option >Plan1</option>
          <option >Plan2</option>
          <option >Plan3</option>
        </NativeSelect>
      </FormControl>
      </Box>
       <TextField id="filled-basic" label="DNI" variant="filled" name='dni'  onChange={handleChange}/>
       <TextField id="filled-basic" label="Telefono" variant="filled" name='telefono' onChange={handleChange}/>
       
    <Stack direction="row" spacing={2} sx={{ paddingTop: 2 }} >
    <Button  onClick={()=>handleClose()}>Cancel</Button>
    <Button variant="contained" color="success" onClick={()=>peticionPost()}>Inscribir</Button>
    </Stack>
     </Box>
  </div>
  )

  const bodyEdit=(
    <div>
    <Box
     sx={style}
     >                                   
     <TextField id="filled-basic" label="Disabled" name='id' value={create && create.id} onChange={handleChange} disabled/>
     
     <TextField id="filled-basic" label="Nombre" variant="filled" name='name' value={create && create.name}  onChange={handleChange}/>
     {/* <TextField id="filled-basic" label="Plan" variant="filled" name='plan' value={create && create.plan}  onChange={handleChange}/> */}
     <Box sx={{ width: '70%' ,paddingLeft: 1.2 }}>
       <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="filled-basic">
          Plan
        </InputLabel>
        <NativeSelect
          value={create && create.plan}
          inputProps={{
            name: 'plan',
            id: 'filled-basic',
          }}
          onChange={handleChange}
        >
          <option >Plan1</option>
          <option >Plan2</option>
          <option >Plan3</option>
        </NativeSelect>
      </FormControl>
      </Box>
     <TextField id="filled-basic" label="DNI" variant="filled" name='dni' value={create && create.dni}  onChange={handleChange}/>
     <TextField id="filled-basic" label="Telefono" variant="filled" name='telefono' value={create && create.telefono}  onChange={handleChange}/>
  <div>
  <Button onClick={()=>handleEdit()}>Cancel</Button>
  <Button onClick={()=>peticionPut()}>Editar</Button>
  </div>
   </Box>
</div>
)

    const bodyEliminar=(
      <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Seguro quiere eliminar al socio {create && create.name}
    </Typography>
    <div>
  <Button onClick={()=>handleEliminar()}>Cancel</Button>
  <Button onClick={()=>peticionDelete()}>Eliminar</Button>
  </div>
  </Box>
    )

    const bodyTimeline = (
      <Box sx={style}>
        <TimelinePagos/>
      </Box>
      
    )

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            <TableCell>Nombre</TableCell>
             <TableCell>Plan</TableCell>
             <TableCell>DNI</TableCell>
             <TableCell>telefono</TableCell>
             <TableCell>Alta</TableCell>
             <TableCell>Email</TableCell>
             <TableCell>Nacimiento</TableCell>
             <TableCell></TableCell>
            </TableRow>
          </TableHead>
         <TableBody>
           {data.map(socio=>(
             <TableRow >
               <TableCell>{socio.name}</TableCell>
               <TableCell>{socio.plan}</TableCell>
               <TableCell>{socio.dni}</TableCell>
               <TableCell>{socio.telefono}</TableCell>
               <TableCell>
               <Stack direction="row" spacing={2}>
                 <Button variant="contained" color="success" onClick={()=>selectSocio(socio, "Edit")}>Editar</Button>
                 <Button variant="outlined" color="error" onClick={()=>selectSocio(socio, 'Eliminar')}>Eliminar</Button>
                 <Button onClick={()=>handleHPagos()}>Pagos</Button>
                 </Stack>
                 </TableCell>
             </TableRow>
           ))}
         </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <TableCell>
      <Button onClick={()=>handleClickOpen()}>Nuevo Socio</Button>
      </TableCell>
      <Modal
     open={open}
     onClose={handleClickOpen}
     aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        {bodyInsertar}
     </Modal>
     <Modal
     open={edit}
     onClose={handleEdit}
     aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        {bodyEdit}
     </Modal>
     <Modal
     open={eliminar}
     onClose={handleEliminar}
     aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        {bodyEliminar}
     </Modal>
     <Modal
     open={hPagos}
     onClose={handleHPagos}
        >
        {bodyTimeline}
     </Modal>
    </Paper>
  );
}
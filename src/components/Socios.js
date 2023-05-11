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
import LaunchIcon from '@mui/icons-material/Launch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from '@mui/material/Link';

import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import { Divider } from '@mui/material';
import { color, Stack } from '@mui/system';
import UploadImg from './UploadImg';
import img from '../api/Captura-de-Pantalla-2023-05-08-a-la(s)-20.59.54.png'
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
  const [fileImg, setFileImg] = useState('');
  const [create, setCreate] = React.useState({
    id:'',
    fileImg:'',
    name:'',
    apellido:'',
    nacimiento:'',
    plan:'', 
    dni:'', 
    telefono:'', 
    email:'',
    alta:'',
    status:'',
    aptoMedico:'',
    estadoApto:'',
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
          socio.file = create.file;
         socio.name = create.name;
         socio.apellido = create.apellido;
         socio.nacimiento = create.nacimiento;
          socio.plan = create.plan;
          socio.dni = create.dni;
          socio.telefono = create.telefono;
          socio.email = create.email;
          socio.alta = create.alta;
          socio.status = create.status;
          socio.aptoMedico = create.aptoMedico;
          socio.estadoApto = create.estadoApto;
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
  

  

  const selectSocio=(socio, e)=>{
    setCreate(socio);
    return (e ==='Edit')?handleEdit(true):handleEliminar()
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
       {/* <MuiFileInput value={file} name='file' onChange={handleFile} /> */}
       <Box sx={{ width: '70%' ,paddingLeft: 1.2, paddingTop: 1, paddingBottom:1 }}>
        <Button
          variant="contained"
          component="label"
        >
          Subir foto
          <input name='fileImg' type='file' value={fileImg} onChange={handleChange} hidden />
        </Button>
      </Box>
       <TextField id="filled-basic" label="Nombre" variant="filled" name='name' onChange={handleChange}/>
       <TextField id="filled-basic" label="Email" variant="filled" name='email' onChange={handleChange}/>
       <TextField id="filled-basic" label="Apellido" variant="filled" name='apellido' onChange={handleChange}/>
       <TextField id="filled-basic" label="Nacimiento" variant="filled" name='nacimiento' onChange={handleChange}/>
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
       <Box sx={{ width: '70%' ,paddingLeft: 1.2 }}>
       <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="filled-basic">
          Estado
        </InputLabel>
        <NativeSelect
          defaultValue={"Alta"}
          inputProps={{
            name: 'plan',
            id: 'filled-basic',
          }}
          onChange={handleChange}
        >
          <option >Alta</option>
          <option >Baja</option>
        </NativeSelect>
      </FormControl>
      </Box>
       <TextField id="filled-basic" label="Fecha de alta" variant="filled" name='alta' onChange={handleChange}/>
       <Box sx={{ width: '70%' ,paddingLeft: 1.2, paddingTop: 1, paddingBottom:1 }}>
        <Button
          variant="contained"
          component="label"
        >
          Subir Apto medico
          <input name='fileImg' type='file' value={fileImg} onChange={handleChange} hidden />
        </Button>
      </Box>
      <Box sx={{ width: '70%' ,paddingLeft: 1.2 }}>
       <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="filled-basic">
          Estado
        </InputLabel>
        <NativeSelect
          defaultValue={"Aprobado"}
          inputProps={{
            name: 'estadoApto',
            id: 'filled-basic',
          }}
          onChange={handleChange}
        >
          <option >Aprobado</option>
          <option >Falta Aprobar</option>
        </NativeSelect>
      </FormControl>
      </Box>
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
     <Typography variant="h4" gutterBottom>
       Edicion Socio: {create && create.name}
      </Typography>           
     <TextField id="filled-basic" label="Disabled" name='id' value={create && create.id} onChange={handleChange} disabled/>
     
     <TextField id="filled-basic" label="Nombre" variant="filled" name='name' value={create && create.name}  onChange={handleChange}/>
     <TextField id="filled-basic" label="Email" variant="filled" name='email' value={create && create.email} onChange={handleChange}/>
     <TextField id="filled-basic" label="Apellido" variant="filled" name='apellido' value={create && create.apellido} onChange={handleChange}/>
     <TextField id="filled-basic" label="Nacimiento" variant="filled" name='nacimiento' value={create && create.nacimiento} onChange={handleChange}/>
     
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
     <Box sx={{ width: '70%' ,paddingLeft: 1.2 }}>
       <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="filled-basic">
          Estado
        </InputLabel>
        <NativeSelect
          value={create && create.status}
          inputProps={{
            name: 'status',
            id: 'filled-basic',
          }}
          onChange={handleChange}
        >
          <option >Alta</option>
          <option >Baja</option>
        </NativeSelect>
      </FormControl>
      
      </Box>
      <TextField id="filled-basic" label="Fecha de alta" variant="filled" name='alta' value={create && create.alta} onChange={handleChange}/>
      <Box sx={{ width: '70%' ,paddingLeft: 1.2 }}>
       <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="filled-basic">
          Estado de apto medico
        </InputLabel>
        <NativeSelect
          value={create && create.estadoApto}
          inputProps={{
            name: 'estadoApto',
            id: 'filled-basic',
          }}
          onChange={handleChange}
        >
          <option >Aprobado</option>
          <option >Falta Aprobar</option>
        </NativeSelect>
      </FormControl>
      </Box>
      <Stack direction="row" spacing={2} sx={{ paddingTop: 2 }} >
  <Button onClick={()=>handleEdit()} variant="outlined" color="error">Cancel</Button>
  <Button onClick={()=>peticionPut()} variant="contained" color="success">Guardar</Button>
  </Stack>
   </Box>
</div>
)

    const bodyEliminar=(
      <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Seguro quiere eliminar al socio {create && create.name}
    </Typography>
    <Stack direction="row" spacing={15} sx={{ paddingTop: 4 }} >
  <Button onClick={()=>handleEliminar()} variant="outlined" color="success" >Cancel</Button>
  <Button onClick={()=>peticionDelete()} variant="contained" color="error" >Eliminar</Button>
  </Stack>
  </Box>
    )

    const bodyTimeline = (
      <Box sx={style}>
        <TimelinePagos/>
      </Box>
      
    )

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }  }>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            <TableCell>Imagen</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Nacimiento</TableCell>
             <TableCell>Plan</TableCell>
             <TableCell>DNI</TableCell>
             <TableCell>telefono</TableCell>
             <TableCell>Alta</TableCell>
             <TableCell>Email</TableCell>
             <TableCell>Cuenta Corriente</TableCell>
             <TableCell>Estado de apto medico</TableCell>
             <TableCell></TableCell>
             <TableCell></TableCell>
             <TableCell></TableCell>
            </TableRow>
          </TableHead>
         <TableBody>
           {data.map(socio=>(
             <TableRow  >
               <TableCell><Avatar alt="Remy Sharp" src={`/`}/></TableCell>
               <TableCell>{socio.name + " " +socio.apellido}</TableCell>
               <TableCell>{socio.nacimiento}</TableCell>
               <TableCell >{socio.plan}</TableCell>
               <TableCell>{socio.dni}</TableCell>
               <TableCell>{socio.telefono}</TableCell>
               <TableCell style={{color: socio.status == "Baja" ? 'red':"green"}}>{socio.status == "Baja"?('Baja'):(socio.alta)}</TableCell>
               <TableCell>{socio.email}{socio.email!== undefined ?<Link href={`mailto:${socio.email}`}><LaunchIcon/></Link>: " "}</TableCell>
               <TableCell>
                 <Button onClick={()=>handleHPagos()}>Pagos</Button>
                 </TableCell>
                 <TableCell>{socio.estadoApto}</TableCell>
                 <TableCell>
                 <Button variant="contained" color="success" onClick={()=>selectSocio(socio, "Edit")} ><BorderColorIcon/></Button>
                 </TableCell>
                 <TableCell>
                 <Button variant="contained" color="error" onClick={()=>selectSocio(socio, 'Eliminar')} ><DeleteIcon/></Button>
                 </TableCell>
                 {/* </Stack> */}
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
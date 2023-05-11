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
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import Informacion from './InformacionSocio';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from '@mui/material/Link';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import HistorialEdicion from './HistorialEdicion';
import Avatar from '@mui/material/Avatar';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import axios from 'axios';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Stack } from '@mui/system';
const apiUrl='http://localhost:3004/socios/'



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
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
  const [hEdicion, setHEdicion] = useState(false);
  const [info, setInfo] = useState(false);
  const [eliminar, setEliminar] = useState(false);
  const [fileImg, setFileImg] = useState('');
  const [filePdf, setFilePdf] = useState('');
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
    vencimientoApto:'',
    cuponDescuento:'',
    nroCupon:'',
    validezCupon:'',
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
          socio.vencimientoApto = create.vencimientoApto;
          socio.cuponDescuento = create.cuponDescuento;
          socio.nroCupon = create.nroCupon;
          socio.validezCupon = create.validezCupon;
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

  const handleHEdicion = () => {
    setHEdicion(!hEdicion);
  };

  const handleInfo = () => {
    setInfo(!info);
  }

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
       <Box sx={{ width: '42%' ,paddingLeft: 1.2 }}>
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
          <option >Elegir plan</option>
          <option >Plan1</option>
          <option >Plan2</option>
          <option >Plan3</option>
        </NativeSelect>
      </FormControl>
      </Box>
       <TextField id="filled-basic" label="DNI" variant="filled" name='dni'  onChange={handleChange}/>
       <TextField id="filled-basic" label="Telefono" variant="filled" name='telefono' onChange={handleChange}/>
       <Box sx={{ width: '42%' ,paddingLeft: 1.2 }}>
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
          <option >Elegir estado</option>
          <option >Alta</option>
          <option >Baja</option>
        </NativeSelect>
      </FormControl>
      </Box>
       <TextField id="filled-basic" label="Fecha de alta" variant="filled" name='alta' onChange={handleChange}/>
       <Box sx={{ width: '42%' ,paddingLeft: 1.2, paddingTop: 1, paddingBottom:1 }}>
        <Button
          variant="contained"
          component="label"
        >
          Subir Apto medico
          <input name='aptoMedico' type='file' value={filePdf} onChange={handleChange} hidden />
        </Button>
      </Box>
      <Box sx={{ width: '42%' ,paddingLeft: 1.2 }}>
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
          <option >Elegir estado de apto</option>
          <option >Aprobado</option>
          <option >Falta Aprobar</option>
        </NativeSelect>
      </FormControl>
      </Box>
      <TextField id="filled-basic" label="Vencimiento Apto Medico" variant="filled" name='vencimientoApto' onChange={handleChange}/>
      <Box sx={{ width: '42%' ,paddingLeft: 1.2 }}>
       <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="filled-basic">
          Cupon de descuento
        </InputLabel>
        <NativeSelect
          value={"No tiene"}
          inputProps={{
            name: 'cuponDescuento',
            id: 'filled-basic',
          }}
          onChange={handleChange}
        >
          <option >Seleccionar</option>
          <option >No tiene</option>
          <option >20% OSDE 1 mes</option>
          <option >30% 1 mes</option>
        </NativeSelect>
      </FormControl>
      </Box>
      <TextField id="filled-basic" label="Nro Cupon de descuento" variant="filled" name='nroCupon'  onChange={handleChange}/>
      <TextField id="filled-basic" label="Valido hasta" variant="filled" name='validezCupon' onChange={handleChange}/>
    <Stack direction="row" spacing={32} sx={{ paddingTop: 4, paddingLeft: 1 }} >
      <Button  onClick={()=>handleClose()} color="error">Cancel</Button>
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
     <br/>
     <TextField id="filled-basic" label="Nombre" variant="filled" name='name' value={create && create.name}  onChange={handleChange}/>
     <TextField id="filled-basic" label="Email" variant="filled" name='email' value={create && create.email} onChange={handleChange}/>
     <TextField id="filled-basic" label="Apellido" variant="filled" name='apellido' value={create && create.apellido} onChange={handleChange}/>
     <TextField id="filled-basic" label="Nacimiento" variant="filled" name='nacimiento' value={create && create.nacimiento} onChange={handleChange}/>
     
     {/* <TextField id="filled-basic" label="Plan" variant="filled" name='plan' value={create && create.plan}  onChange={handleChange}/> */}
     <Box sx={{ width: '42%' ,paddingLeft: 1.2 }}>
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
          <option >Elegir plan</option>
          <option >Plan1</option>
          <option >Plan2</option>
          <option >Plan3</option>
        </NativeSelect>
      </FormControl>
      </Box>
     <TextField id="filled-basic" label="DNI" variant="filled" name='dni' value={create && create.dni}  onChange={handleChange}/>
     <TextField id="filled-basic" label="Telefono" variant="filled" name='telefono' value={create && create.telefono}  onChange={handleChange}/>
     <Box sx={{ width: '42%' ,paddingLeft: 1.2 }}>
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
          <option >Elegir estado</option>
          <option >Alta</option>
          <option >Baja</option>
        </NativeSelect>
      </FormControl>
      
      </Box>
      <TextField id="filled-basic" label="Fecha de alta" variant="filled" name='alta' value={create && create.alta} onChange={handleChange}/>
      <Box sx={{ width: '42%' ,paddingLeft: 1.2, paddingTop: 1, paddingBottom:1 }}>
        <Button
          variant="contained"
          component="label"
        >
          Subir Apto medico
          <input name='aptoMedico' type='file' value={filePdf} onChange={handleChange} hidden />
        </Button>
      </Box>
      <Box sx={{ width: '42%' ,paddingLeft: 1.2 }}>
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
          <option >Estado de apto medico</option>
          <option >Aprobado</option>
          <option >Falta Aprobar</option>
        </NativeSelect>
      </FormControl>
      </Box>
      <TextField id="filled-basic" label="Vencimiento Apto Medico" variant="filled" name='vencimientoApto' value={create && create.vencimientoApto} onChange={handleChange}/>
      <Box sx={{ width: '42%' ,paddingLeft: 1.2 }}>
       <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="filled-basic">
          Cupon de descuento
        </InputLabel>
        <NativeSelect
          value={create && create.cuponDescuento}
          inputProps={{
            name: 'cuponDescuento',
            id: 'filled-basic',
          }}
          onChange={handleChange}
        >
          <option >Seleccionar</option>
          <option >No tiene</option>
          <option >20% OSDE 1 mes</option>
          <option >30% 1 mes</option>
        </NativeSelect>
      </FormControl>
      </Box>
      <TextField id="filled-basic" label="Nro Cupon de descuento" variant="filled" name='nroCupon' value={create && create.nroCupon} onChange={handleChange}/>
      <TextField id="filled-basic" label="Valido hasta" variant="filled" name='validezCupon' value={create && create.validezCupon} onChange={handleChange}/>
      <Stack direction="row" spacing={32} sx={{ paddingTop: 4, paddingLeft: 1 }} >
        <Button onClick={()=>handleEdit()}  color="error">Cancel</Button>
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

    const bodyHistorialeEdicion = (
      <Box sx={style}>
        <HistorialEdicion/>
      </Box>
      
    )

    const bodyInfo = (
      <Box sx={style}>
        <Informacion/>
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
             <TableCell>Informacion</TableCell>
             <TableCell>Historial <BorderColorIcon/></TableCell>
             <TableCell>Cupon de descuento</TableCell>
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
               <TableCell>{socio.telefono}{socio.telefono!== undefined ?<Link href={`https://wa.me/${socio.aptoMedico}`} target="_blank"><WhatsAppIcon sx={{fontSize: "medium"}}/></Link>: " "}</TableCell>
               <TableCell style={{color: socio.status === "Baja" ? 'red':"green"}}>{socio.status === "Baja"?('Baja'):(socio.alta)}</TableCell>
               <TableCell>{socio.email}{socio.email!== undefined ?<Link href={`mailto:${socio.email}`}><LaunchIcon sx={{fontSize: "medium"}}/></Link>: " "}</TableCell>
               <TableCell>
                 <Button onClick={()=>handleHPagos()}>Pagos</Button>
                 </TableCell>
                 <TableCell>
                 <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                      <div>
                        <Button variant="text" color={socio.estadoApto === "Aprobado"?'secondary': "error" }{...bindTrigger(popupState)}>
                        {socio.estadoApto}
                        </Button>
                        <Popover
                          {...bindPopover(popupState)}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                        >
                          <Typography sx={{ p: 2 }}>Vcto:{socio.vencimientoApto}</Typography>
                        </Popover>
                        {socio.aptoMedico!== undefined ?<Link href={socio.aptoMedico} target="_blank"><LaunchIcon sx={{fontSize: "medium"}}/></Link>: " "}
                      </div>
                    )}
                  </PopupState>
                  </TableCell>
                  <TableCell>
                  <Button onClick={()=>handleInfo()} sx={{color:'black'}}><PermContactCalendarIcon/></Button>
                  </TableCell>
                  <TableCell>
                  <Button onClick={()=>handleHEdicion()} sx={{color:'black'}}><ManageHistoryIcon/></Button>
                  </TableCell>
                  <TableCell>
                    {socio.cuponDescuento !== "No tiene"? 
                  <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                      <div>
                        <Button variant="text" sx={{color:'black', fontSize:12}} {...bindTrigger(popupState)}>
                        {socio.cuponDescuento}
                        </Button>
                        <Popover
                          {...bindPopover(popupState)}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                        >
                          <Typography sx={{ p: 2 }}>Valido hasta: {socio.validezCupon}</Typography>
                        </Popover>
                        </div>
                    )}
                  </PopupState>
                  :<Typography sx={{paddingLeft: 2}}>No tiene</Typography>}
                  </TableCell>
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
     <Modal
     open={hEdicion}
     onClose={handleHEdicion}
        >
        {bodyHistorialeEdicion}
     </Modal>
     <Modal
     open={info}
     onClose={handleInfo}
        >
        {bodyInfo}
     </Modal>
    </Paper>
  );
}
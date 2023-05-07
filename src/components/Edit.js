import * as React from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

export default function FormPropsTextFields() {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25vw" }
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Nombre"
          defaultValue="Hello World"
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="Apellido"
          defaultValue="Hello World"
        />
        <TextField
          id="outlined-password-input"
          label="Plan"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-read-only-input"
          label="DNI"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true
          }}
        />
        <TextField
          id="outlined-number"
          label="Telefono"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          id="outlined-number"
          label="Alta"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField id="outlined-search" label="Email" type="search" />
        <TextField
          id="outlined-helperText"
          label="Nacimiento"
          defaultValue="Default Value"
          helperText="Some important text"
        />
        <Button variant="contained">Editar</Button>
      </div>
    </Box>
  );
}

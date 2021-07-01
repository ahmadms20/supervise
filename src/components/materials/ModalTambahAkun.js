import React, { useState } from 'react';
import { FormGroup, Form, Input, Label } from 'reactstrap';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';

function ModalTambahAkun({show, onShow, onSubmit, nips}) {

    const[form, setForm] = useState({nip: '', level: '', password: ''}) 

    const handleSubmit = () => {

        const data = new FormData
        data.append('nip', form.nip)
        data.append('level', form.level)
        data.append('password', form.password)

        onSubmit(data)
    }

    return(
        <>
        {/* Modal tambah akun */}
            <Dialog onClose={() => onShow()} aria-labelledby="customized-dialog-title" open={show} fullWidth>
                <DialogTitle id="customized-dialog-title" onClose={() => onShow()}>
                   Tambah Data Akun
                </DialogTitle>
            <Form>
                <DialogContent dividers>
                    <FormGroup>
                        <Label>NIP</Label>
                        <Autocomplete
                          id="combo-box-demo"
                          options={nips}
                          getOptionLabel={(option) => option.title}
                          style={{ width:"100%" }}
                          renderInput={(params) => <TextField {...params} label="Pilih NIP" variant="outlined" onSelect={(e) => setForm({...form, nip: e.target.value})}/>}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Level</Label>
                        <Input type="select" name="level" onChange={(e)=> setForm({...form, level: e.target.value})}>
                           <option hidden>Pilih level</option>
                           <option value="pegawai">Karyawan</option>
                           <option value="admin">Admin</option>
                           <option value="superadmin">Super Admin</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label>Password</Label>
                      <Input type="password" name="password" placeholder="Masukan password" onChange={(e)=> setForm({...form, password: e.target.value})} autoComplete="off"/>
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} id="button" color="primary">Simpan</Button>
                    <Button onClick={() => onShow()} id="button" color="secondary">Batal</Button>
                </DialogActions>
            </Form>
            </Dialog>
        {/* Modal tambah akun */}
        </>
    )
}

export default ModalTambahAkun;
import React, { useState, useEffect } from 'react';
import { FormGroup, Form, Input, Label } from 'reactstrap';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';

function ModalUbahAkun({show, onShow, onSubmit, dataAkun}) {

    const[form, setForm] = useState({level: null, password: null}) 

    const handleSubmit = () => {

        const data = new FormData()
        data.append('level',  form.level)
        data.append('password',  form.password)

        onSubmit(data)
    }

    useEffect(() => {

        setForm({...form, level: dataAkun.level})

    },[dataAkun])

    return(
        <>
        {/* Modal ubah akun */}
            <Dialog onClose={() =>{ 
                 onShow()
                 setForm({...form, password: null})}} aria-labelledby="customized-dialog-title" open={show} fullWidth>
                <DialogTitle id="customized-dialog-title" onClose={()=> onShow()}>
                  Ubah Data Akun
                </DialogTitle>
            <Form>
              <DialogContent dividers>
                <FormGroup>
                    <Label>NIP</Label>
                    <Input type="text" name="nip" placeholder="Masukan NIP" value={dataAkun.nip} autoComplete="off" disabled/>
                </FormGroup>
                <FormGroup>
                    <Label>Level</Label>
                    <Input type="select" name="level" value={form.level} onChange={(e)=> setForm({...form, level : e.target.value})}>
                       <option hidden>Pilih level</option>
                       <option value="pegawai">Karyawan</option>
                       <option value="admin">Admin</option>
                       <option value="superadmin">Super Admin</option>
                    </Input>
                </FormGroup>
                    <FormGroup>
                       <Label>Password</Label>
                       <Input type="password" name="password" placeholder="Masukan password baru" onChange={(e)=> setForm({...form, password : e.target.value})} autoComplete="off"/>
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                   <Button onClick={handleSubmit} disabled={form.password == null || form.password.length == '' ? true : false} id="button" color="primary">Simpan</Button>
                   <Button onClick={() => {
                       onShow()
                       setForm({...form, password: null})
                   }} id="button" color="secondary">Batal</Button>
                </DialogActions>
            </Form>
            </Dialog>
        {/* Modal ubah akun */}
        </>
    )
}

export default ModalUbahAkun;
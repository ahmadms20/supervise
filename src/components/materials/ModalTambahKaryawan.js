import React, { useState } from 'react';
import { FormGroup, Form, Input, Label } from 'reactstrap';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { CustomInput, FormText } from 'reactstrap'
import Button from '@material-ui/core/Button';

function ModalTambahAkun({show, onShow, onSubmit}) {

    const[form, setForm] = useState({nip: '', nama: '', email: '', no_telp: '', alamat: '', tgl_lahir: '', avatar: null}) 

    const handleSubmit = () => {

        const data = new FormData()
        data.append('nip', form.nip)
        data.append('nama', form.nama)
        data.append('email', form.email)
        data.append('no_telp', form.no_telp)
        data.append('alamat', form.alamat)
        data.append('avatar', form.avatar)
        data.append('tgl_lahir', form.tgl_lahir)

        onSubmit(data)
    }

    return(
        <>
        {/* Modal tambah karyawan */}
            <Dialog onClose={() => onShow()} aria-labelledby="customized-dialog-title" open={show} fullWidth>
               <DialogTitle id="customized-dialog-title" onClose={() => onShow()}>
                 Tambah Data Karyawan
               </DialogTitle>
            <Form>
                <DialogContent dividers>
                    <FormGroup>
                        <Label>NIP</Label>
                        <Input type="text" name="nip" placeholder="Masukan NIP"  onChange={(e)=> setForm({...form, nip:e.target.value})} autoComplete="off"/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Nama</Label>
                        <Input type="text" name="nama" placeholder="Masukan Nama"  onChange={(e)=> setForm({...form, nama:e.target.value})} autoComplete="off"/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input type="email" name="email" placeholder="Masukan Email"  onChange={(e)=> setForm({...form, email:e.target.value})} autoComplete="off"/>
                    </FormGroup>
                    <FormGroup>
                        <Label>No Telepon</Label>
                        <Input type="text" name="no_telepom" placeholder="Masukan No Telepon"  onChange={(e)=> setForm({...form, no_telp:e.target.value})} autoComplete="off"/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Alamat</Label>
                        <Input type="text" name="alamat" placeholder="Masukan alamat"  onChange={(e)=> setForm({...form, alamat:e.target.value})} autoComplete="off"/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Avatar</Label>
                        <CustomInput type="file" name="foto" label="Pilih Foto" accept="image/*" onChange={(e)=> setForm({...form, avatar:e.target.files[0]})} required/>
                        <FormText style={{fontSize:"12px", fontWeight:"bold"}}>Format foto: JPG, JPEG dan PNG</FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label>Tanggal Lahir</Label>
                        <Input type="date" name="date" id="exampleDate" placeholder="Masukan tanggal lahir" onChange={(e)=> setForm({...form, tgl_lahir:e.target.value})} required/>
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} id="button" color="primary">Simpan</Button>
                    <Button onClick={() => onShow()} id="button" color="secondary">Batal</Button>
                </DialogActions>
            </Form>
            </Dialog>
        {/* Modal tambah karyawan */}
        </>
    )
}

export default ModalTambahAkun;
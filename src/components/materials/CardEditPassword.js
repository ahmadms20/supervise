import React, { useState } from 'react';
import { Card, CardBody, FormGroup, Label, Input, CardHeader, CardFooter } from 'reactstrap';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';

function CardEditPassword(props) {

    const { onSubmit } = props

    const[form, setForm] = useState({oldpass: '', newpass: '', konpass: ''})

    const handleSubmit = (e) => {
        e.preventDefault()
        if (form.newpass != form.konpass) {
            Swal.fire({
                title: 'Terjadi Kesalahan',
                text:  'Password dan konfirmasi password tidak sama',
                icon:  'error',
            })   
        } else {
            const data = new FormData()
            data.append('password_lama', form.oldpass)
            data.append('password_baru', form.konpass)
            onSubmit(data)
            setForm({oldpass: '', newpass: '', konpass: ''})
        }
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <Card style={{marginTop:"30px"}}>
                <CardHeader style={{fontSize:"18px", fontWeight:"bold", backgroundColor:"#808080", color:"white"}}>Ubah Password</CardHeader>
                    <CardBody>
                            <h6><b>Tips</b></h6>
                            <ul>
                                <li>Gunakan minimal 8 karakter</li>
                                <li>Gunakan kombinasi huruf dan angka serta simbol</li>
                                <li>Gunakan huruf besar dan huruf kecil</li>
                            </ul>
                            <FormGroup>
                                <Label>Password Lama</Label>
                                <Input type="password" value={form.oldpass} placeholder="Masukan password lama" onChange={(e) => setForm({...form, oldpass: e.target.value})} required/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Password Baru</Label>
                                <Input type="password" value={form.newpass} placeholder="Masukan password baru" onChange={(e) => setForm({...form, newpass: e.target.value})} required/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Konfirmasi Password</Label>
                                <Input type="password" value={form.konpass} placeholder="Masukan konfirmasi password" onChange={(e) => setForm({...form, konpass: e.target.value})} required/>
                            </FormGroup>
                    </CardBody>
                    <CardFooter>
                        <Button type="submit" variant="contained" id="button" style={{float:"right", backgroundColor:"#4756DF", color:"white"}}>Kirim</Button>
                    </CardFooter>
                </Card>
            </form>
        </>
    )
}

export default CardEditPassword;
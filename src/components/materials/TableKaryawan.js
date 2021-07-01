import React, { useState, useEffect } from 'react';
import { FormGroup, Form, Input, Card, CardBody, CardHeader, Table } from 'reactstrap';
import Axios from 'axios';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { ModalTambahKaryawan, ModalUbahKaryawan, ModalHapusAkun } from '.';

const useStyles = makeStyles((theme) => ({
    square: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    }
}))

function TableKaryawan({api, token}) {

    const[items, setItems]      = useState([])
    const[page, setPage]        = useState(1)
    const[perPage, setPerPage]  = useState(5)
    const[search, setSearch]    = useState('')
    const [dataUbah, setUbah]  = useState({nip: '', nama: '', email: '', no_telp: '', alamat: '', tgl_lahir: ''});
    const [nipHapus, setHapus] = useState('');
    const [modal, setModal]    = useState({tambah: false, ubah: false, hapus: false})

    useEffect(() => {

        getData()

    },[page, perPage, setPage])

    const getData = () => {
        Axios.get(api+'/pegawai', {
            headers: {
                Authorization: 'token='+token
            },
            params: {
                page: page,
                perPage: perPage
            }
        })
        .then(res => {
            if (res.data.data != 'Empty') {
                setItems(res.data.data)
            } else {
                if (page >= 2) {
                    setPage(page - 1)
                }
            }
        })
    }

    const handleAdd = (data) => {
        Axios.post(api+'/pegawai',data, {
            headers: { 
                Authorization: 'token='+token
            }})
            .then(res=>{
            if(res.data.message == "Successfully"){
                Swal.fire({
                icon:'success',
                title:'Sukses',
                text:'Data Berhasil Ditambahkan!',
                backdrop: false
            })
            }else{
                Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'NIP sudah digunakan!',
                backdrop: false
                })
            }
            setModal({...modal, tambah: false})
            getData()
        })
    }

    const handleUpdate = (data) => {
        Axios.put(api+'/pegawai/'+dataUbah.nip,data, {
            headers: { 
                Authorization: 'token='+token
            }})
            .then(res=>{
            if(res.data.message == "Successfully"){
              Swal.fire({
                  icon:  'success',
                  title: 'Sukses',
                  text:  'Data Berhasil Diubah!',
                  backdrop: false
              })    
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Data Harus Diisi!',
                backdrop: false
              })
            }
            setModal({...modal, ubah: false})
            getData()
        })
    }

    const handleDelete = (data) => {
        Axios.delete(api+'/pegawai/'+data, 
            {headers: { 
                Authorization: 'token='+token 
            }})
            .then(res=>{
            if(res.data.message == "Successfully"){
              Swal.fire({
                  icon:  'success',
                  title: 'Sukses',
                  text:  'Data Berhasil Dihapus!',
                  backdrop: false
              })    
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Terjadi Kesalahan!',
                backdrop: false
              })
            }
            setModal({...modal, hapus: false})
            getData()
        })
    }

    const handleNext = () => {
        setPage(page+1)
    }

    const handleBack = () => {
        if (page > 1) {
            setPage(page-1)
        }
    }

    const handleRow = (e) => {
        setPage(1)
        setPerPage(e.target.value)
    }
    
    const handleSearch = (e) => {

        if (e.target.value != '') {
            Axios.get(api+'/pegawai/search', {
                headers: {
                    Authorization: 'token='+token
                },
                params: {
                    keyword: e.target.value
                }
            })
            .then(res => {
                if (res.data.data != 'Empty') {
                    let data = []
                    res.data.data.map(item => data.push({nip:item.nip, nama:item.nama, email:item.email, 
                    no_telp:item.no_telp, alamat:item.alamat, tgl_lahir:item.tgl_lahir, avatar: item.avatar}))
                    setItems(data)
                }
            })
        } else {
            getData()
        } 
    }
    const classes = useStyles();

    return(
        <>
        {/* Tabel data karyawan */}
        <FormGroup style={{marginTop:"20px"}}>
            <Button variant="contained" color="primary" size="small" id="button" style={{float:"right"}} onClick={() => setModal({...modal, tambah: true})}>Tambah Data</Button>
        </FormGroup>
            <Card style={{marginTop:"60px"}}>
                <CardHeader>
                    <Form inline>
                        <h5>Data Pegawai</h5>
                        <FormGroup className="ml-auto">
                        <Input
                            type="search"
                            name="search"
                            placeholder="Search..."
                            onChange={(e) => setSearch(e.target.value)}
                            onInput={handleSearch}
                        />
                        </FormGroup>
                    </Form>
                </CardHeader>
                <CardBody>
                    <Table>
                        <thead>
                            <tr>
                               <th>NIP</th>
                               <th>Nama</th>
                               <th>Email</th>
                               <th>Telepon</th>
                               <th>Lahir</th>
                               <th>Alamat</th>
                               <th>Avatar</th>
                               <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map((item, i) => 
                                    <tr key={i}>
                                        <td>{item.nip}</td>
                                        <td>{item.nama}</td>
                                        <td>{item.email}</td>
                                        <td>{item.no_telp}</td>
                                        <td>{item.tgl_lahir}</td>
                                        <td>{item.alamat}</td>
                                        <td>
                                        <Avatar variant="square" src={'http://localhost:2408/assets/img/avatar/'+item.avatar} className={classes.square}/>
                                        </td>
                                        <td>
                                          <IconButton id="button" size="small" 
                                          onClick={()=> {
                                            setModal({...modal, ubah: true})
                                            setUbah({...dataUbah, nip:item.nip, nama:item.nama, email:item.email, 
                                                    no_telp:item.no_telp, alamat:item.alamat, tgl_lahir:item.tgl_lahir})
                                          }}
                                          style={{marginRight:"10px"}}>
                                            <EditIcon fontSize="inherit"/>
                                          </IconButton>
                                          <IconButton id="button" size="small"   
                                          onClick={()=> {
                                            setModal({...modal, hapus: true})
                                            setHapus(item.nip)
                                          }}>
                                            <DeleteIcon fontSize="inherit"/>
                                          </IconButton>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                    <Form inline>
                        <FormGroup>
                            <Input type="select" name="rows" onChange={handleRow}>
                            <option hidden>{perPage}</option> 
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            </Input>
                        </FormGroup>
                        <FormGroup className="ml-auto">
                            <IconButton id="button" size="small" onClick={handleBack}>
                            <ArrowBackIosIcon fontSize="inherit"/>
                            </IconButton>
                            <IconButton id="button" size="small" onClick={handleNext}>
                            <ArrowForwardIosIcon fontSize="inherit"/>
                            </IconButton>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        {/* Tabel data karyawan */}
        {/* Modal tambah akun */}
            <ModalTambahKaryawan show={modal.tambah} onShow={() => setModal({...modal, tambah: !modal.tambah})} onSubmit={handleAdd} />
        {/* Modal tambah akun */}
        {/* Modal ubah akun */}
            <ModalUbahKaryawan show={modal.ubah} onShow={() => setModal({...modal, ubah: !modal.ubah})} dataKaryawan={dataUbah} onSubmit={handleUpdate} />
        {/* Modal ubah akun */}
        {/* Modal hapus akun */}
            <ModalHapusAkun show={modal.hapus} onShow={() => setModal({...modal, hapus: !modal.hapus})} nip={nipHapus} onSubmit={handleDelete} />
        {/* Modal hapus akun */}
        </>
    )
}
  
export default TableKaryawan;
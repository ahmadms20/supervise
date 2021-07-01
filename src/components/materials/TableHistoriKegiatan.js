import React, { useState, useEffect } from 'react';
import { FormGroup, Form, Input, Card, CardBody, CardHeader, Table } from 'reactstrap';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    square: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    }
}))

function TableHistoriKegiatan({api, token, id}) {

    const[items, setItems]      = useState([])
    const[page, setPage]        = useState(1)
    const[perPage, setPerPage]  = useState(5)
    const[search, setSearch]    = useState('')

    const history = useHistory()

    useEffect(() => {

        getData()

    },[page, perPage, setPage])

    const getData = () => {
        Axios.get(api, {
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
            Axios.get(api+'/search', {
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
                    res.data.data.map(item => data.push({foto_kegiatan: item.foto_kegiatan, kegiatan: item.kegiatan, file_kegiatan: item.file_kegiatan, tgl_kegiatan: item.tgl_kegiatan, waktu_kegiatan: item.waktu_kegiatan}))
                    setItems(data)
                }
            })
        } else {
            getData()
        } 
    }

    const handlePage = (id) => {
        history.push(`/karyawan-kegiatan/detail/${id}`)
        localStorage.setItem('id_kegiatan', id)
    }
    
    const classes = useStyles();
    return(
        <>
        {/* Tabel data histori kegiatan */}
            <Card style={{marginTop:"2%"}}>
                <CardHeader>
                    <Form inline>
                        <h5>Histori Kegiatan</h5>
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
                            <th>Judul</th>
                            <th>Foto</th>
                            <th>File</th>
                            <th>Tanggal</th>
                            <th>Waktu</th>
                            <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map((item, i) => 
                                    <tr key={i}>
                                        <td>{item.kegiatan}</td>
                                        <td>
                                          <Avatar variant="square" src={'http://localhost:2408/assets/img/task/'+item.foto_kegiatan} className={classes.square}/>
                                        </td>
                                        <td>{item.file_kegiatan}</td>
                                        <td>{item.tgl_kegiatan}</td>
                                        <td>{item.waktu_kegiatan}</td>
                                        <td>
                                          <IconButton id="button" size="small" onClick={() => handlePage(item.id_kegiatan)} >
                                            <ArrowForwardIosIcon fontSize="inherit" />
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
        {/* Tabel data histori kegiatan */}
        </>
    )
}

export default TableHistoriKegiatan;
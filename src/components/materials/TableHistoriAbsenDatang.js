import React, { useState, useEffect } from 'react';
import { FormGroup, Form, Input, Card, CardBody, CardHeader, Table } from 'reactstrap';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    square: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    }
}))

function TableHistoriAbsenDatang({api, token, props}) {

    const[items, setItems]      = useState([])
    const[page, setPage]        = useState(1)
    const[perPage, setPerPage]  = useState(5)
    const[search, setSearch]    = useState('')

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
                    res.data.data.map(item => data.push({foto_absen_datang: item.foto_absen_datang, tgl_absen: item.tgl_absen, status_absen: item.status_absen, waktu_datang: item.waktu_datang, keterangan_absen: item.keterangan_absen}))
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
        {/* Tabel data histori absen datang */}
            <Card style={{marginTop:"2%"}}>
                <CardHeader>
                    <Form inline>
                        <h5>Histori Absen Datang</h5>
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
                               <th>Foto</th>
                               <th>Tanggal</th>
                               <th>Status</th>
                               <th>Waktu</th>
                               <th>Keterangan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map((item, i) => 
                                    <tr key={i}>
                                        <td>
                                          <Avatar variant="square" src={'http://localhost:2408/assets/img/absen/'+item.foto_absen_datang} className={classes.square}/>
                                        </td>
                                        <td>{item.tgl_absen}</td>
                                        <td>{item.status_absen == null ? '-' : item.status_absen}</td>
                                        <th>{item.waktu_datang == null ? '-' : item.waktu_datang}</th>
                                        <td>{item.keterangan_absen}</td>
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
        {/* Tabel data histori absen datang */}
        </>
    )
}

export default TableHistoriAbsenDatang;
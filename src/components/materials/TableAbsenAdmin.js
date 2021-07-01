import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import { FormGroup, Form, Input, Card, CardBody, CardHeader, Table } from 'reactstrap';
import Axios from 'axios';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


function TableAbsenAdmin({api, token}) {
    const history = useHistory()
    const[items, setItems]      = useState([])
    const[todays, setTodays]    = useState([])
    const[page, setPage]        = useState(1)
    const[perPage, setPerPage]  = useState(5)
    const[search, setSearch]    = useState('')

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
            console.log(res.data.data)
            if (res.data.data != 'Empty') {
                setItems(res.data.data)
            } else {
                if (page >= 2) {
                    setPage(page - 1)
                }
            }
        })
        var set       = new Date();
        var date      = set.getDate();
        if (date < 10) {
            date = '0' + date;
        }
        var month     = set.getMonth()+1;
        if (month < 10) {
            month = '0' + month;
        }
        var year      = set.getFullYear();
        var thisDate  = year + '-' + month + '-' + date;
        console.log("date", thisDate)
        Axios.get(api+'/absen', {
            headers: {
                Authorization: 'token='+token
            },
            params: {
                tgl_absen: thisDate
            }
        })
        .then(res => {
            if (res.data.data != 'Empty') {
                setTodays(res.data.data)
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
                    res.data.data.map(item => data.push({nip: item.nip, nama: item.nama}))
                    setItems(data)
                }
            })
        } else {
            getData()
        } 
    }

    const handlePage = (id) => {
        history.push(`/absen/filter/${id}`)
    }
    
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const dateObj = new Date();
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const output = day  + ' ' + month  + ' ' + year;
    
    return(
        <>
        {/* Tabel data absen */}
            <Card style={{marginTop:"2%"}}>
                <CardHeader>
                    <Form inline>
                        <h5>Data Absen Karyawan</h5>
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
                               <th>Absen Hari Ini</th>
                               <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {   
                                items.map((item, i) => 
                                    <tr key={i}>
                                        <td>{item.nip}</td>
                                        <td>{item.nama}</td>
                                        <td>
                                          {todays.filter((x, i) => x.nip == item.nip || x.length > 0).length > 0 ? <b style={{color:"#21e758"}}>Sudah Absen</b> : <b style={{color:"red"}}>Belum Absen</b>}<br/>
                                          {todays.filter((x, i) => x.nip == item.nip && x.keterangan_absen == "hadir").length > 0 ? <b style={{color:"#21e758", fontSize:"13px"}}>(Hadir)</b> : null}
                                          {todays.filter((x, i) => x.nip == item.nip && x.keterangan_absen == "izin").length > 0 ? <b style={{color:"#21e758", fontSize:"13px"}}>(Izin)</b> : null}
                                          {todays.filter((x, i) => x.nip == item.nip && x.keterangan_absen == "sakit").length > 0 ? <b style={{color:"#21e758", fontSize:"13px"}}>(sakit)</b> : null}
                                          {todays.filter((x, i) => x.nip == item.nip && x.keterangan_absen == "dinas").length > 0 ? <b style={{color:"#21e758", fontSize:"13px"}}>(dinas)</b> : null}
                                          {todays.filter((x, i) => x.nip == item.nip && x.keterangan_absen == "tanpa keterangan").length > 0 ? <b style={{color:"#21e758", fontSize:"13px"}}>(Tanpa Keterangan)</b> : null}
                                        </td>
                                        <td>
                                          <IconButton id="button" size="small" 
                                          onClick={()=>handlePage(item.nip)}
                                          style={{marginRight:"10px"}}>
                                            <ArrowForwardIosIcon fontSize="inherit"/>
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
        {/* Tabel data absen */}
        </>
    )
}

export default TableAbsenAdmin;
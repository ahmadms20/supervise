import React from 'react';
import { Container, Card, CardBody, CardHeader, Table, CardTitle } from 'reactstrap';
import { ResponsiveDrawer } from './Drawer-superadmin.js';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import axios from 'axios';
import url from './Domain.json';
import {TokenChecker} from './TokenChecker.js';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import LensIcon from '@material-ui/icons/Lens';
import { NavLink } from 'react-router-dom';
import { TableAkunDashboard, TableKaryawanDashboard } from './components/materials';

const styles = theme => ({
  card: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 220,
  },
  fixed: {
    height: 180,
  }
});
const token = localStorage.getItem('token')

class Dashboardsuperadmin extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        jumlahAkun: [],
        jumlahKaryawan: [],
        datajadwal: [],
        nama: ''
      }
    }

    componentDidMount(){
      axios.get(url.api+'/api/tokenChecker', {
        headers: {
          'Authorization' : `token=${token}`
        }
      }).then(res => {
        var para = res.data.nip;
        this.getData(para)
        console.log(res.data)
      })
      TokenChecker("superadmin")
    }

    getData(para){
      axios.get(url.api+"/superadmin/akun",{headers: { 'Authorization':  `token=${token}` }}).then(res=>{
        this.setState({jumlahAkun:res.data.data})
      })
      axios.get(url.api+"/superadmin/pegawai",{headers: { 'Authorization':  `token=${token}` }}).then(res=>{
        this.setState({jumlahKaryawan:res.data.data})
      })
      axios.get(url.api+"/superadmin/jadwal",{headers: { 'Authorization':  `token=${token}` }}).then(res=>{
        this.setState({datajadwal:res.data.data})
      })
      axios.get(url.api+"/superadmin/akun?nip="+para,{headers: { 'Authorization':  `token=${token}` }})
      .then(res=>{
        this.setState({nama:res.data.data[0].pegawai.nama}) 
      })
    }

render(){
  const { classes } = this.props;
  const fixedHeightCard = clsx(classes.card, classes.fixedHeight);
  const fixedHeight = clsx(classes.card, classes.fixed);
  var jadwal = this.state.datajadwal.map(item=>{
    return(
    <>
      <td>{item.mulai} - {item.selesai}</td>
    </>
    )
  })
  const listday = ["MINGGU", "SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"]
  const thisday = new Date().getDay()
  return(
    <div id="font">
      <ResponsiveDrawer
        component = {
        <Container className="themed-container" fluid={true}>
        {/* Judul */}
        <li style={{ fontSize: "20px", color:"#5B69E3", fontWeight:"bold" }}>Dashboard</li>
        {/* Judul */}
        <h3 style={{marginTop:"10px"}}>Halo, {this.state.nama}</h3>
        <Grid container spacing={3} style={{marginTop:"5px"}}>
          <Grid item xs={12} md={6} lg={6}>
          {/* Card Dashboard */}
          <Card className={fixedHeight}>
          <CardHeader className="text-center" id="tittle"><b>Jumlah Akun</b></CardHeader>
            <CardBody>
              <p className="text-center" style={{fontSize:"45px"}}>{this.state.jumlahAkun.length}</p>
            </CardBody>
              <Button id="button" component={NavLink} to="/akun" size="small" endIcon={<ArrowForwardIosIcon />}>
                Selengkapnya
              </Button>
          </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
          <Card className={fixedHeight}>
          <CardHeader className="text-center" id="tittle"><b>Jumlah Karyawan</b></CardHeader>
            <CardBody>
              <p className="text-center" style={{fontSize:"45px"}}>{this.state.jumlahKaryawan.length}</p>
            </CardBody>
              <Button id="button" component={NavLink} to="/data-karyawan" size="small" endIcon={<ArrowForwardIosIcon />}>
                Selengkapnya
              </Button>
          </Card>
          </Grid>
          {/* Card Dashboard */}
          <Grid item xs={12} md={12} lg={12}>
          {/* Tabel data jadwal */}
          <Card className={fixedHeightCard}>
            <CardBody>
            <CardTitle id="tittle"><b style={{marginLeft:"1%"}}>Jadwal Kerja</b></CardTitle><hr/>
              <Table striped>
                <thead className="text-center">
                  <tr>
                    <th>{listday[thisday] == 'SENIN' ? <LensIcon style={{width:"10px", height:"10px", color:"red"}}/> : null} <b>Senin</b></th>
                    <th>{listday[thisday] == 'SELASA' ? <LensIcon style={{width:"10px", height:"10px", color:"red"}}/> : null} <b>Selasa</b></th>
                    <th>{listday[thisday] == 'RABU' ? <LensIcon style={{width:"10px", height:"10px", color:"red"}}/> : null} <b>Rabu</b></th>
                    <th>{listday[thisday] == 'KAMIS' ? <LensIcon style={{width:"10px", height:"10px", color:"red"}}/> : null} <b>Kamis</b></th>
                    <th>{listday[thisday] == 'JUMAT' ? <LensIcon style={{width:"10px", height:"10px", color:"red"}}/> : null} <b>Jumat</b></th>
                    <th>{listday[thisday] == 'SABTU' ? <LensIcon style={{width:"10px", height:"10px", color:"red"}}/> : null} <b>Sabtu</b></th>
                    <th>{listday[thisday] == 'MINGGU' ? <LensIcon style={{width:"10px", height:"10px", color:"red"}}/> : null} <b>Minggu</b></th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {jadwal}
                </tbody>
              </Table>
            </CardBody>
          </Card>
          </Grid>
          {/* Tabel data jadwal */}
          <Grid item xs={12} md={6} lg={6}>
          {/* Tabel data akun */}
            <TableAkunDashboard api={url.api+'/superadmin/akun'} token={token} />
          {/* Tabel data akun */}
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
          {/* Tabel data karyawan */}
            <TableKaryawanDashboard api={url.api+'/superadmin/pegawai'} token={token} />
          {/* Tabel data karyawan */}
          </Grid>
        </Grid>
      </Container>}/>
    </div>
    )
  }
}

Dashboardsuperadmin.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Dashboardsuperadmin);
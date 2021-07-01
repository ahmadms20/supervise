import React from 'react';
import { Container, Card, CardBody, CardHeader, Table } from 'reactstrap';
import { ResponsiveDrawer } from './Drawer-admin.js';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import axios from 'axios';
import url from './Domain.json';
import { TokenChecker } from './TokenChecker.js';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { NavLink } from 'react-router-dom';
import LensIcon from '@material-ui/icons/Lens';
import { TableAbsenAdminDashboard, TableKegiatanAdminDashboard } from './components/materials';

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

class Dashboardadmin extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        jumlahkegiatan: '',
        jumlahabsen: [],
        datajadwal: [],
        nama: '',
        jumlahpegawai: '',
        jumlahabsentoday: '',
        jumlahabsenpulang: '',
        tampilan1:'none',
        tampilan2:'none'
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
      TokenChecker("admin")
    }

    getData(para){

      const set = new Date();
      const date      = set.getDate() < 10 ? '0' + set.getDate() : set.getDate()
      const month     = (set.getMonth()+1) < 10 ? '0' + (set.getMonth()+1) : set.getMonth()
      const year      = set.getFullYear();
      const thisDate  = `${year}-${month}-${date}`;

      var weekday = new Array(7);
          weekday[0] = "MINGGU";
          weekday[1] = "SENIN";
          weekday[2] = "SELASA";
          weekday[3] = "RABU";
          weekday[4] = "KAMIS";
          weekday[5] = "JUMAT";
          weekday[6] = "SABTU";
          var n = weekday[set.getDay()];
          console.log(n)

      axios.get(url.api+"/admin/absen",{headers: { 'Authorization':  `token=${token}` }}).then(res=>{
        this.setState({jumlahabsen: res.data.data})
      })
      axios.get(url.api+"/admin/kegiatan?tgl_kegiatan="+thisDate,{headers: { 'Authorization':  `token=${token}` }}).then(res=>{
        if(res.data.data == "Empty"){
          this.setState({jumlahkegiatan: "0"})
        }else{
          this.setState({jumlahkegiatan:res.data.data.length})
        }
        
      })
      axios.get(url.api+`/admin/jadwal`,{headers: { 'Authorization':  `token=${token}`}})
      .then(res=>{
        this.setState({datajadwal:res.data.data})
      })
      axios.get(url.api+`/admin/jadwal?hari=${n}`,{headers: { 'Authorization':  `token=${token}`}}).then(res=>{
        console.log(res.data.data[0])
        if(res.data.data[0].keterangan_jadwal == 'normal'){
          this.setState({tampilan1:'block'})
          this.setState({tampilan2:'none'})
        } else {
          this.setState({tampilan1:'none'})
          this.setState({tampilan2:'block'})
        }
      })
      axios.get(url.api+"/admin/akun?nip="+para,{headers: { 'Authorization':  `token=${token}` }}).then(res=>{
        this.setState({nama : res.data.data[0].pegawai.nama})   
        console.log("nama", res.data.data)
      })
      axios.get(url.api+"/admin/pegawai", {headers: { 'Authorization':  `token=${token}`}}).then(res=>{
        this.setState({jumlahpegawai: res.data.data.length})
      })
      axios.get(url.api+"/admin/absen/today", {headers: { 'Authorization':  `token=${token}`}}).then(res=>{
        this.setState({jumlahabsentoday: res.data.data.length})
      })
      axios.get(url.api+"/admin/absen/pulang", {headers: { 'Authorization':  `token=${token}`}}).then(res=>{
        this.setState({jumlahabsenpulang: res.data.data.length})
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
          <Grid item xs={12} md={4} lg={4}>
          {/* Card Dashboard */}
          <Card className={fixedHeight}>
          <CardHeader className="text-center" id="tittle"><b>Jumlah Absen Datang</b></CardHeader>
            <CardBody>
              <p className='text-center' style={{display:`${this.state.tampilan2}`,fontSize:'20px', marginTop:"15px"}}>LIBUR</p>
              <p className="text-center" style={{display:`${this.state.tampilan1}`,fontSize:"35px"}}>{this.state.jumlahabsentoday} / {this.state.jumlahpegawai}</p>
            </CardBody>
              <Button id="button" component={NavLink} to="/absen-admin" size="small" endIcon={<ArrowForwardIosIcon />}>
                Selengkapnya
              </Button>
          </Card>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
          <Card className={fixedHeight}>
          <CardHeader className="text-center" id="tittle"><b>Jumlah Absen Pulang</b></CardHeader>
            <CardBody>
              <p className='text-center' style={{display:`${this.state.tampilan2}`,fontSize:'20px', marginTop:"15px"}}>LIBUR</p>
              <p className="text-center" style={{display:`${this.state.tampilan1}`,fontSize:"35px"}}>{this.state.jumlahabsenpulang} / {this.state.jumlahabsentoday}</p>
            </CardBody>
              <Button id="button" component={NavLink} to="/absen-admin" size="small" endIcon={<ArrowForwardIosIcon />}>
                Selengkapnya
              </Button>
          </Card>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
          <Card className={fixedHeight}>
          <CardHeader className="text-center" id="tittle"><b>Jumlah Kegiatan</b></CardHeader>
            <CardBody>
              <p className='text-center' style={{display:`${this.state.tampilan2}`,fontSize:'20px', marginTop:"15px"}}>LIBUR</p>
              <p className="text-center" style={{display:`${this.state.tampilan1}`,fontSize:"35px"}}>{this.state.jumlahkegiatan} / {this.state.jumlahpegawai}</p>
            </CardBody>
              <Button id="button" component={NavLink} to="/kegiatan-admin" size="small" endIcon={<ArrowForwardIosIcon />}>
                Selengkapnya
              </Button>
          </Card>
          {/* Card Dashboard */}
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
          {/* Tabel data jadwal */}
          <Card className={fixedHeightCard}>
            <CardHeader id="tittle">
              <b>Jadwal Kerja</b>
            </CardHeader>
            <CardBody>
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
          {/* Tabel data jadwal */}
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
          {/* Tabel data absen */}
            <TableAbsenAdminDashboard api={url.api+'/admin/absen'} token={token} />
          {/* Tabel data absen */}
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
          {/* Tabel data kegiatan */}
            <TableKegiatanAdminDashboard api={url.api+'/admin/kegiatan'} token={token} />
          {/* Tabel data kegiatan */}
        </Grid>
        </Grid>
      </Container>}/>
    </div>
    )
  }
}

Dashboardadmin.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Dashboardadmin);
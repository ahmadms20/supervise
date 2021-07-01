import React from 'react';
import { Container, Card, CardBody, CardHeader, Table, CardTitle } from 'reactstrap';
import { ResponsiveDrawer } from './Drawer-karyawan.js';
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
import { TableAbsenKaryawanDashboard, TableKegiatanKaryawanDashboard } from './components/materials';

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

class Dashboardkaryawan extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        datajadwal: [],
        datakegiatan: [],
        dataabsen: [],
        nama: '',
        teksabsendatang:'',
        teksabsenpulang:'',
        tekskegiatan:'',
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
      TokenChecker("pegawai")
    }

    getData(para){
      let date = new Date();
      let tahun = date.getFullYear();
      let bulan = date.getMonth() + 1;
      if (bulan < 10) {
        bulan = '0' + bulan;
      }
      let tanggal = date.getDate();
      if (tanggal < 10) {
        tanggal = '0' + tanggal;
      }
      let waktu = `${tahun}-${bulan}-${tanggal}`;
      console.log(waktu)

      var weekday = new Array(7);
          weekday[0] = "MINGGU";
          weekday[1] = "SENIN";
          weekday[2] = "SELASA";
          weekday[3] = "RABU";
          weekday[4] = "KAMIS";
          weekday[5] = "JUMAT";
          weekday[6] = "SABTU";
          var n = weekday[date.getDay()];
          console.log(n)
      console.log(waktu)
      axios.get(url.api+"/pegawai/jadwal",{headers: { 'Authorization':  `token=${token}` }}).then(res=>{
        this.setState({datajadwal:res.data.data})
      })
      axios.get(url.api+`/pegawai/jadwal?hari=${n}`,{headers: { 'Authorization':  `token=${token}` }}).then(res=>{
        console.log(res.data.data)
        if(res.data.data[0].keterangan_jadwal == 'normal'){
          this.setState({tampilan1:'block'})
          this.setState({tampilan2:'none'})
        } else {
          this.setState({tampilan2:'block'})
          this.setState({tampilan1:'none'})
        }
      })
      axios.get(url.api+"/pegawai/kegiatan?nip="+para,{headers: { 'Authorization':  `token=${token}` }}).then(res=>{
        this.setState({datakegiatan:res.data.data})
      })

      axios.get(url.api+"/pegawai/kegiatan?nip="+para+"&tgl_kegiatan="+waktu,{headers: { 'Authorization':  `token=${token}` }}).then(res=>{
        console.log(res.data.data)
        if(res.data.data == "Empty"){
          this.setState({tekskegiatan:'Anda Belum Mengisi Kegiatan'})
        } else {
          this.setState({tekskegiatan:'Anda Sudah Mengisi Kegiatan'})
        }
      })
      
      axios.get(url.api+"/pegawai/absen?nip="+para,{headers: { 'Authorization':  `token=${token}` }}).then(res=>{
        console.log(res.data)
        this.setState({dataabsen:res.data.data})
      })
      axios.get(url.api+"/pegawai/absen?nip="+para+"&tgl_absen="+waktu,{headers: { 'Authorization':  `token=${token}` }}).then(res=>{
        console.log(res.data.data)
        if(res.data.data == "Empty"){
          this.setState({teksabsendatang:'Anda Belum Absen'})
          this.setState({teksabsenpulang:'Anda Belum Absen'})
        } else {
          if(res.data.data[0].foto_absen_pulang == null){
            this.setState({teksabsendatang:'Anda Sudah Absen'})
            this.setState({teksabsenpulang:'Anda Belum Absen'})
          } else {
            this.setState({teksabsendatang:'Anda Sudah Absen'})
            this.setState({teksabsenpulang:'Anda Sudah Absen'})
          }
        }
      })
      
      axios.get(url.api+"/pegawai/akun?nip="+para,{headers: { 'Authorization':  `token=${token}` }})
      .then(res=>{
        this.setState({nama : res.data.data[0].pegawai.nama})     
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
        component = {<Container className="themed-container" fluid={true}>
        {/* Judul */}
        <li style={{ fontSize: "20px", color:"#5B69E3", fontWeight:"bold" }}>Dashboard</li>
        {/* Judul */}
        {/* Card Dashboard */}
        <h3 style={{marginTop:"10px"}}>Halo, {this.state.nama}</h3>
        <Grid container spacing={3} style={{marginTop:"5px"}}>
        <Grid item xs={12} md={4} lg={4}>
          <Card className={fixedHeight}>
          <CardHeader className="text-center" id="tittle"><b>Absen Datang</b></CardHeader>
            <CardBody>
              <p className="text-center" style={{display:`${this.state.tampilan2}`,fontSize:"20px", marginTop:"15px"}}>LIBUR</p>
              <p className="text-center" style={{display:`${this.state.tampilan1}`,fontSize:"20px", marginTop:"15px"}}>{this.state.teksabsendatang}</p>
            </CardBody>
              <Button id="button" component={NavLink} to="/absen-karyawan" size="small" endIcon={<ArrowForwardIosIcon />}>
                Selengkapnya
              </Button>
          </Card>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
          <Card className={fixedHeight}>
          <CardHeader className="text-center" id="tittle"><b>Absen Pulang</b></CardHeader>
            <CardBody>
              <p className="text-center" style={{display:`${this.state.tampilan2}`,fontSize:"20px", marginTop:"15px"}}>LIBUR</p>
              <p className="text-center" style={{display:`${this.state.tampilan1}`,fontSize:"20px", marginTop:"15px"}}>{this.state.teksabsenpulang}</p>
            </CardBody>
              <Button id="button" component={NavLink} to="/absen-karyawan" size="small" endIcon={<ArrowForwardIosIcon />}>
                Selengkapnya
              </Button>
          </Card>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
          <Card className={fixedHeight}>
          <CardHeader className="text-center" id="tittle"><b>Kegiatan</b></CardHeader>
            <CardBody>
              <p className="text-center" style={{display:`${this.state.tampilan2}`,fontSize:"20px", marginTop:"15px"}}>LIBUR</p>
              <p className="text-center" style={{display:`${this.state.tampilan1}`,fontSize:"20px", marginTop:"15px"}}>{this.state.tekskegiatan}</p>
            </CardBody>
              <Button id="button" component={NavLink} to="/kegiatan-karyawan" size="small" endIcon={<ArrowForwardIosIcon />}>
                Selengkapnya
              </Button>
          </Card>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
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
          <Grid item xs={12} md={6} lg={6}>
          {/* Tabel data absen */}
            <TableAbsenKaryawanDashboard api={url.api+'/pegawai/absen'} token={token} />  
          {/* Tabel data absen */}
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
          {/* Tabel data kegiatan */}
            <TableKegiatanKaryawanDashboard api={url.api+'/pegawai/kegiatan'} token={token} /> 
         {/* Tabel data kegiatan */}
          </Grid>
        </Grid>
        {/* Card Dashboard */}
      </Container>}/>
    </div>
      )
    }
  }

Dashboardkaryawan.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Dashboardkaryawan);
import React from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import { Container, Row, Col, FormGroup, Form, Input, Card, CardBody, CardFooter, ListGroup, ListGroupItem } from 'reactstrap';
import { ResponsiveDrawer } from './Drawer-admin.js';
import axios from 'axios';
import url from './Domain.json';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Redirect} from "react-router-dom";
import { TokenChecker } from './TokenChecker.js';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'

const token = localStorage.getItem('token')

class Detailabsen extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        redirect: '/absen/filter/'+this.props.match.params.id,
        bulan: '',
        tahun: '',
        detailabsen: {
          nip: '',
          nama: '',
          dinas: '0',
          hadir: '0',
          izin: '0',
          sakit: '0',
          tanpa_keterangan: '0',
          persentase_kehadiran: '0'
        },
        detail_absen: {
          rata_waktu_keterlambatan: '0'
        },
        identitas: {
          nip: '',
          nama: ''
        },
        disabled: true
      }
      this.handlePage = this.handlePage.bind(this)
      this.kirim = this.kirim.bind(this)
    }

    componentDidMount(){
      TokenChecker("admin")
      this.getIdentitas()
      localStorage.setItem('nip3', this.props.match.params.id)
    }

    getIdentitas(){
      axios.get(url.api+'/admin/pegawai?nip='+this.props.match.params.id, {headers : { 'Authorization': `token=${token}`},}).then(res => {
      this.setState({identitas: {...this.state.identitas, nip:res.data.data[0].nip, nama:res.data.data[0].nama}})
    })
    }

    getData(){
      var bulan = this.state.bulan
      if (bulan < 10) bulan = '0'+bulan;
      axios.get(url.api+'/admin/absen/laporan', {headers : { 'Authorization': `token=${token}`},
      params: {
        nip: this.props.match.params.id,
        bulan: bulan,
        tahun: this.state.tahun
      }
    })
    .then(res => {
      console.log("haha", res.data.data)
      if (res.data.data.length != 0){
        this.setState({detailabsen:{...this.state.detailabsen, nip:res.data.data[0].nip, nama:res.data.data[0].nama, hadir:res.data.data[0].hadir,
        dinas:res.data.data[0].dinas, izin:res.data.data[0].izin, sakit:res.data.data[0].sakit, tanpa_keterangan:res.data.data[0].tanpa_keterangan,
        persentase_kehadiran:res.data.data[0].persentase_kehadiran}})
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Data absen tidak ada',
        })
      }
    })
    var bulan = this.state.bulan
      if (bulan < 10) bulan = '0'+bulan;
    axios.get(url.api+'/admin/absen/laporan/kehadiran', {headers : { 'Authorization': `token=${token}`},
      params: {
        nip: this.props.match.params.id,
        bulan: bulan,
        tahun: this.state.tahun
      }
    })
    .then(res => {
      console.log("hihi", res.data.data)
      if (res.data.data.length != 0){
        this.setState({detail_absen:{...this.state.detail_absen, rata_waktu_keterlambatan:res.data.data[0].rata_waktu_keterlambatan}})
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Data absen tidak ada',
        })
        this.setState({disabled:true})
      }
    })
  }

    kirim(){
      this.getData()
      this.setState({disabled:false})
    }

    getTahun(){
      const years = []
      for(let yearNow = 2020; yearNow <= new Date().getFullYear(); yearNow++){
        years.push(yearNow)
      }
      return years
    }

    handlePage = (id) => {
      var bulan = this.state.bulan;
      if (bulan < 10) bulan = '0'+bulan;
      var tahun = this.state.tahun;
      console.log("kiki", bulan)
      this.props.history.push(`/absen/detail/${id}/${bulan}/${tahun}`)
    }

render(){
  return(
    <div id="font">
      <ResponsiveDrawer
        component = {
        <Container className="themed-container" fluid={true}>
        {/* Judul */}
        <li style={{ fontSize: "20px", color:"#5B69E3", fontWeight:"bold" }}>Filter Absen</li>
        {/* Judul */}
        {/* Form detail absen */}
        <Redirect to={this.state.redirect} />
        <Row style={{marginTop:"20px"}}>
          <Col sm="12" md="12" lg={{ size: 8, offset: 2 }}>
          <FormGroup>
            <Button
            component={NavLink} 
            to="/absen-admin"
            color="primary"
            size="small"
            startIcon={<ArrowBackIosIcon />}
            >
              Kembali
            </Button>
          </FormGroup>
            <Form>
              <Card>
                <CardBody>
                <ListGroupItem className="text-center">
                    <b style={{fontSize:"18px"}}>{this.state.identitas.nama}</b>
                    <br/>
                    <b style={{fontSize:"18px"}}>{this.state.identitas.nip}</b>
                </ListGroupItem>
                <ListGroup style={{marginTop:"10px"}}>
                  <ListGroupItem className="text-center">
                    <Form inline>
                      <FormGroup>
                        <Input type="select" value={this.state.bulan} name="waktu" onChange={ev=>this.setState({bulan:ev.target.value})}>
                          <option hidden>Pilih bulan</option>
                          <option value="1">Januari</option>
                          <option value="2">Februari</option>
                          <option value="3">Maret</option>
                          <option value="4">April</option>
                          <option value="5">Mei</option>
                          <option value="6">Juni</option>
                          <option value="7">Juli</option>
                          <option value="8">Agustus</option>
                          <option value="9">September</option>
                          <option value="10">Oktober</option>
                          <option value="11">November</option>
                          <option value="12">Desember</option>
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Input type="select" value={this.state.tahun} name="waktu" onChange={ev=>this.setState({tahun:ev.target.value})} style={{marginLeft:"10px"}}>
                          <option hidden>Pilih tahun</option>
                          {this.getTahun().map((tahun) => 
                            <option value={tahun}>{tahun}</option>
                          )}
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Button variant="contained" color="primary" size="medium" id="button" onClick={this.kirim} style={{marginLeft:"10px"}}>Kirim</Button>
                      </FormGroup>
                    </Form>
                  </ListGroupItem>
                  <ListGroupItem><b>Hadir</b><b style={{float:"right"}}>{this.state.detailabsen.hadir} Kali</b></ListGroupItem>
                  <ListGroupItem><b>Sakit</b><b style={{float:"right"}}>{this.state.detailabsen.sakit} kali</b></ListGroupItem>
                  <ListGroupItem><b>Izin</b><b style={{float:"right"}}>{this.state.detailabsen.izin} kali</b></ListGroupItem>
                  <ListGroupItem><b>Alfa</b><b style={{float:"right"}}>{this.state.detailabsen.tanpa_keterangan} kali</b></ListGroupItem>
                  <ListGroupItem><b>Dinas</b><b style={{float:"right"}}>{this.state.detailabsen.dinas} kali</b></ListGroupItem>
                  <ListGroupItem><b>Persentase</b><b style={{float:"right"}}>{this.state.detailabsen.persentase_kehadiran }%</b></ListGroupItem>
                  <ListGroupItem><b>Keterlambatan</b><b style={{float:"right"}}>{this.state.detail_absen.rata_waktu_keterlambatan == null ? '0' : this.state.detail_absen.rata_waktu_keterlambatan} menit</b></ListGroupItem>
                </ListGroup>
                </CardBody>
                <CardFooter>
                  <Button variant="contained" id="button" onClick={()=> this.handlePage(this.state.detailabsen.nip)} disabled={this.state.disabled} style={{float:"right", backgroundColor:"#21e758", color:"white"}}>Detail Absen</Button>
                </CardFooter>
              </Card>
            </Form>
          </Col>
        </Row>
        {/* Form detail absen */}
      </Container>}/>
    </div>
      )
    }
  }
  
export default withRouter(Detailabsen);
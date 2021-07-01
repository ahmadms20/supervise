import React from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import { Container, FormGroup, Form, Input, Card, CardBody, Col, Row, CardHeader, Table } from 'reactstrap';
import { ResponsiveDrawer } from './Drawer-admin.js';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import axios from 'axios';
import url from './Domain.json';
import { Redirect } from "react-router-dom";
import { TokenChecker } from './TokenChecker.js';
import { NavLink } from 'react-router-dom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Swal from 'sweetalert2'

const token = localStorage.getItem('token')

class Filteradmin extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        redirect: '/admin-kegiatan/filter/'+this.props.match.params.id,
        bulan: '',
        tahun: '',
        data_kegiatan: [],
        loading: true,
        page: 1,
        perPage: 5,
        search: '',
        nama: ''
      }
      this.handleMonth = this.handleMonth.bind(this)
      this.handleYear = this.handleYear.bind(this)
      this.handleRow = this.handleRow.bind(this)
      this.handleBack = this.handleBack.bind(this)
      this.handleNext = this.handleNext.bind(this)
      this.handlePage = this.handlePage.bind(this)
      this.filter = this.filter.bind(this)
    }

    componentDidMount(){
      TokenChecker("admin")
      this.getIdentitas()
      localStorage.setItem('nip', this.props.match.params.id)
    }

    componentDidUpdate(prevProps, prevState){
      if (prevState.page !== this.state.page || prevState.perPage !== this.state.perPage){
        this.getData()
      }  
    }

    getIdentitas(){
      axios.get(url.api+'/admin/pegawai?nip='+this.props.match.params.id, {headers : { 'Authorization': `token=${token}`},}).then(res => {
      this.setState({nama:res.data.data[0].nama})
    })
    }

    getData(){
      var set        = new Date();
      var monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
      var month      = monthNames[set.getMonth()];
      var year       = set.getFullYear();
      var bulan = ''
      var tahun = ''
      if(this.state.bulan && this.state.tahun != null){
        bulan = this.state.bulan;
        tahun = this.state.tahun;
      } else {
        bulan = month;
        tahun = year;
        console.log("bulan:", bulan, "tahun:", tahun)
      }
      axios.get(url.api+"/admin/kegiatan?nip="+this.props.match.params.id, {
        headers: { 'Authorization': `token=${token}`
      },params: { 
        page: this.state.page, 
        perPage: this.state.perPage,
        bulan: bulan,
        tahun: tahun
      }}).then(res => {
        console.log("kkkk", res.data.data)
        if (res.data.data != 'Empty'){
          this.setState({data_kegiatan: res.data.data, loading: false})
        } else if(res.data.data == 'Empty'){
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Data kegiatan tidak ada !',
          })
        } else {
          if( this.state.page >= 2) {
            this.setState({page : this.state.page - 1})
          }
        }
      })
    }

    filter(){
      this.getData()
    }

    getTahun(){
      const years = []
      for(let yearNow = 2020; yearNow <= new Date().getFullYear(); yearNow++){
        years.push(yearNow)
      }
      return years
    }

    handleMonth(e){
      this.setState({bulan: e.target.value})
    }

    handleYear(e){
      this.setState({tahun: e.target.value})
    }

    handleClick(){
      this.state.data_kegiatan.filter(item => {
        if ( item.tgl_kegiatan.match() ){

        }
      })
    }

    handleNext = () => {
      this.setState({page : this.state.page + 1})
    }

    handleBack = () => {
      if (this.state.page > 1){
        this.setState({page : this.state.page - 1})        
      }
    }
    
    handleRow = (e) => {
      this.setState({page:1, perPage: e.target.value })
    }

    handleSearch = (e) => {
      if (e.target.value != ''){
        axios.get(url.api+"/admin/kegiatan/search", {
          headers: {
            Authorization: `token=${token}`
          },
          params : {
            nip: this.props.match.params.id,
            keyword : e.target.value
          }
        })
        .then(res => {
          if (res.data.data != 'Empty'){
            let data = []
            res.data.data.map(item => data.push({kegiatan: item.kegiatan, tgl_kegiatan: item.tgl_kegiatan, waktu_kegiatan: item.waktu_kegiatan}))
            this.setState({data_kegiatan: data})
          }
        })
      }
    }
    
    handlePage = (id_keg) => {
      console.log("test")
      this.props.history.push(`/detail-kegiatan/detail/${id_keg}`)
    }

render(){
  // if (this.state.loading) return <p>Redirecting..</p>
  var data = this.state.data_kegiatan.map(item => {
    return (
      <tr>
        <td>{item.kegiatan}</td>
        <td>{item.tgl_kegiatan}</td>
        <td>{item.waktu_kegiatan}</td>
        <td>
        <IconButton id="button" size="small" onClick={()=>this.handlePage(item.id_kegiatan)}>
          <ArrowForwardIosIcon fontSize="inherit"/>
        </IconButton>
        </td>
      </tr>
    )
  })
  return(
    <div id="font">
      <ResponsiveDrawer
        component = {
        <Container className="themed-container" fluid={true}>
        {/* Judul */}
        <li style={{ fontSize: "20px", color:"#5B69E3", fontWeight:"bold" }}>Filter Kegiatan</li>
        {/* Judul */}
        {/* Tabel data kegiatan */}
        <Redirect to={this.state.redirect} />
        <Row style={{marginTop:"20px"}}>
        <Col sm="12" md="12" lg={{ size: 8, offset: 2 }}>
        <Form inline>
        <Button
        component={NavLink} 
        to="/kegiatan-admin"
        color="primary"
        size="small"
        startIcon={<ArrowBackIosIcon />}
        >
          Kembali
        </Button>
        <FormGroup className="ml-auto">
          <Input type="select" value={this.state.bulan} name="waktu" onChange={this.handleMonth}>
            <option hidden>Pilih bulan</option>
            <option value="01">Januari</option>
            <option value="02">Februari</option>
            <option value="03">Maret</option>
            <option value="04">April</option>
            <option value="05">Mei</option>
            <option value="06">Juni</option>
            <option value="07">Juli</option>
            <option value="08">Agustus</option>
            <option value="09">September</option>
            <option value="10">Oktober</option>
            <option value="11">November</option>
            <option value="12">Desember</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Input type="select" value={this.state.tahun} name="waktu" onChange={this.handleYear} style={{marginLeft:"10px"}}>
            <option hidden>Pilih tahun</option>
            {this.getTahun().map((tahun) => 
              <option value={tahun}>{tahun}</option>
            )}
          </Input>
        </FormGroup>
        <Button variant="contained" color="primary" size="medium" id="button" onClick={this.filter} style={{marginLeft:"10px"}}>Kirim</Button>
        </Form>
        <Card style={{marginTop:"2%"}}>
          <CardHeader>
            <Form inline>
              <h5>Kegiatan {this.state.nama}</h5>
              <FormGroup className="ml-auto">
                <Input
                  type="search"
                  name="search"
                  placeholder="Search..."
                  onChange={(e)=> this.setState({search: e.target.value})}
                  onInput={this.handleSearch}
                />
              </FormGroup>
            </Form>
          </CardHeader>
          <CardBody>
          <Table>
            <thead>
              <tr>
                <th>Judul</th>
                <th>Tanggal</th>
                <th>Waktu</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data}
            </tbody>
          </Table>
          <Form inline>
          <FormGroup>
              <Input type="select" name="select" onChange={this.handleRow}>
                <option hidden>{this.state.perPage}</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </Input>
            </FormGroup>
            <FormGroup className="ml-auto">
              <IconButton id="button" size="small" onClick={this.handleBack}>
                <ArrowBackIosIcon fontSize="inherit"/>
              </IconButton>
              <IconButton id="button" size="small" onClick={this.handleNext}>
                <ArrowForwardIosIcon fontSize="inherit"/>
              </IconButton>
            </FormGroup>
          </Form>
          </CardBody>
        </Card>
        </Col>
        </Row>
        {/* Tabel data kegiatan */}
      </Container>}/>
    </div>
      )
    }
  }
  
export default withRouter(Filteradmin);
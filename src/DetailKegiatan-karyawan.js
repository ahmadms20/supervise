import React from 'react';
import { Container, Row, Col, FormGroup, Card, CardBody, CardHeader, CardFooter, Input, Form } from 'reactstrap';
import { ResponsiveDrawer } from './Drawer-karyawan.js';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import url from './Domain.json';
import Grid from '@material-ui/core/Grid';
import { TokenChecker } from './TokenChecker.js';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { CardFileReader } from './components/materials/index.js';
import { NavLink } from 'react-router-dom';

const token = localStorage.getItem('token')

class DetailKegiatankaryawan extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        datakegiatan: {
          nip: '', 
          nama: '', 
          kegiatan: '', 
          foto_kegiatan: '', 
          file_kegiatan: '', 
          tgl_kegiatan: '', 
          waktu_kegiatan: '',
          catatan: '',
        },
        loading: true
      }
    }

    componentDidMount(){
      this.getData()
      TokenChecker("pegawai")
    }

    getData(){
      axios.get(url.api+"/pegawai/kegiatan?id_kegiatan="+this.props.match.params.id,{headers: { 'Authorization':  `token=${token}` }})
      .then(res => {
        const data = res.data.data[0]
        var linkFoto = data.foto_kegiatan;
        var linkFile = data.file_kegiatan;
        data.foto_kegiatan =  `${url.api}/assets/img/task/${linkFoto}`
        data.file_kegiatan =  `${url.api}/assets/files/task/${linkFile}`
        this.setState({
          datakegiatan:{...this.state.datakegiatan , nip:data.nip , nama:data.pegawai.nama , kegiatan:data.kegiatan , waktu_kegiatan:data.waktu_kegiatan , foto_kegiatan:data.foto_kegiatan , file_kegiatan:data.file_kegiatan, tgl_kegiatan:data.tgl_kegiatan , catatan:data.catatan_kegiatan }
        })
      })
    }

render(){
  return(
    <div id="font">
      <ResponsiveDrawer
        component = {
        <Container className="themed-container" fluid={true}>
        {/* Judul */}
        <li style={{ fontSize: "20px", color:"#5B69E3", fontWeight:"bold" }}>Detail Kegiatan</li>
        {/* Judul */}
        {/* Detail data kegiatan */}
        <FormGroup style={{marginTop:"20px"}}>
        <Button
        component={NavLink} 
        to="/histori-kegiatan"
        color="primary"
        size="small"
        startIcon={<ArrowBackIosIcon />}
        >
          Kembali
        </Button>
        </FormGroup>
        <Row>
          <Col lg="6">
          <Card style={{marginTop:"10px"}}>
            <CardBody>
            <img src={this.state.datakegiatan.foto_kegiatan} style={{objectFit:"contain", width:"100%", height:"225px"}}/>
            </CardBody>
          </Card>
          </Col>
          <Col lg="6">
          <Card style={{marginTop:"10px"}}>
            <CardBody>
            <Grid style={{height:'72px', marginTop:"10px"}} container>
                <Grid style={{width:'30%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'20px'}}>Judul</Typography></Grid>
                <Grid style={{width:'70%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'20px'}}>: {this.state.datakegiatan.kegiatan}</Typography></Grid>
            </Grid>
            <Grid style={{height:'72px'}} container>
                <Grid style={{width:'30%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'20px'}}>Tanggal</Typography></Grid>
                <Grid style={{width:'70%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'20px'}}>: {this.state.datakegiatan.tgl_kegiatan}</Typography></Grid>
            </Grid>
            <Grid style={{height:'72px'}} container>
                <Grid style={{width:'30%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'20px'}}>Waktu</Typography></Grid>
                <Grid style={{width:'70%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'20px'}}>: {this.state.datakegiatan.waktu_kegiatan}</Typography></Grid>
            </Grid>
            </CardBody>
          </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" className="mt-4">
            <CardFileReader file={this.state.datakegiatan.file_kegiatan} />
          </Col>
        </Row>
        <Row style={{marginTop:"10px"}}>
        <Col sm="12" md="12" lg={{ size: 8, offset: 2 }}>
          <Card>
          <CardHeader style={{fontSize:"18px", fontWeight:"bold", backgroundColor:"#808080", color:"white"}}>Catatan Kegiatan</CardHeader>
          <CardBody>
            <Form>
              <FormGroup>
              <Input type="textarea" name="text" value={this.state.datakegiatan.catatan} placeholder="Catatan..." readOnly/>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
        </Col>
        </Row>
        {/* Detail data kegiatan */}
      </Container>}/>
    </div>
      )
    }
  }
  
export default DetailKegiatankaryawan;
import React from 'react';
import { Container, Row, Col, FormGroup, Card, CardBody, CardHeader, CardFooter, Input, Form } from 'reactstrap';
import { ResponsiveDrawer } from './Drawer-admin.js';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import url from './Domain.json';
import Grid from '@material-ui/core/Grid';
import { TokenChecker } from './TokenChecker.js';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { CardFileReader } from './components/materials/index.js';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

const token = localStorage.getItem('token')

class Detailkegiatanadmin extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        detailkegiatan : {},
        loading: true,
        cat_kegiatan: ''
      }
    }

    componentDidMount(){
      this.getData()
      TokenChecker("admin")
      localStorage.setItem('nip2', this.props.match.params.id)
    }

    getData(){
      axios.get(url.api+"/admin/kegiatan?id_kegiatan="+this.props.match.params.id, {headers: {'Authorization': `token=${token}`}}).then(res => {
        if(res.data.data != null) {
          var data = res.data.data[0];
          var link = res.data.data[0].foto_kegiatan;
          var file = res.data.data[0].file_kegiatan;
          var tgl = res.data.data[0].tgl_kegiatan
          var datatgl = tgl.split('T')
          data.foto_kegiatan = `${url.api}/assets/img/task/${link}`
          data.file_kegiatan = url.api+"/assets/files/task/"+file
          data.tgl_kegiatan = datatgl
          this.setState({detailkegiatan:res.data.data[0]})
          this.setState({cat_kegiatan:res.data.data[0].catatan_kegiatan})
        }
         this.setState({loading: false})
      })
    }

    kirim(){
      const data = new FormData;
      data.append('catatan_kegiatan', this.state.cat_kegiatan)
      axios.put(url.api+"/admin/kegiatan/"+this.props.match.params.id, data, {headers: {'Authorization': `token=${token}`}}).then(res => {
        if(res.data.message == "Successfully"){
          Swal.fire({
              title: 'Sukses',
              text:  'Catatan berhasil dikirim!',
              icon:  'success',
              confirmButtonText: 'OK',
              backdrop: false
          }).then((result)=>{
            if(result.isConfirmed)
            window.location.href='/detail-kegiatan/detail/'+this.props.match.params.id
          })    
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ada Kesalahan!',
          })
        }
      })
    }

render(){
  console.log(this.state.detailkegiatan.file_kegiatan)
  if (this.state.loading || !this.state.detailkegiatan.file_kegiatan) return <h1>Loading...</h1>
  const nip = "/admin-kegiatan/filter/"+this.state.detailkegiatan.nip;
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
        to={nip}
        color="primary"
        size="small"
        startIcon={<ArrowBackIosIcon />}
        >
          Kembali
        </Button>
        </FormGroup>
        <Row>
          <Col lg="6">
          <Card>
            <CardBody>
            <img src={this.state.detailkegiatan.foto_kegiatan} style={{objectFit:"contain", width:"100%", height:"225px"}}/>
            </CardBody>
          </Card>
          </Col>
          <Col lg="6">
          <Card>
            <CardBody>
            <Grid style={{height:'45px'}} container>
                <Grid style={{width:'30%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'20px'}}>NIP</Typography></Grid>
                <Grid style={{width:'70%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'20px'}}>: {this.state.detailkegiatan.nip}</Typography></Grid>
            </Grid>
            <Grid style={{height:'45px'}} container>
                <Grid style={{width:'30%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'20px'}}>Nama</Typography></Grid>
                <Grid style={{width:'70%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'20px'}}>: {this.state.detailkegiatan.pegawai.nama}</Typography></Grid>
            </Grid>
            <Grid style={{height:'45px'}} container>
                <Grid style={{width:'30%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'20px'}}>Judul</Typography></Grid>
                <Grid style={{width:'70%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'20px'}}>: {this.state.detailkegiatan.kegiatan}</Typography></Grid>
            </Grid>
            <Grid style={{height:'45px'}} container>
                <Grid style={{width:'30%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'20px'}}>Tanggal</Typography></Grid>
                <Grid style={{width:'70%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'20px'}}>: {this.state.detailkegiatan.tgl_kegiatan}</Typography></Grid>
            </Grid>
            <Grid style={{height:'45px'}} container>
                <Grid style={{width:'30%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'20px'}}>Waktu</Typography></Grid>
                <Grid style={{width:'70%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'20px'}}>: {this.state.detailkegiatan.waktu_kegiatan}</Typography></Grid>
            </Grid>
            </CardBody>
          </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" className="mt-4">
            <CardFileReader file={this.state.detailkegiatan.file_kegiatan} />
          </Col>
        </Row>
        <Row style={{marginTop:"10px"}}>
        <Col sm="12" md="12" lg={{ size: 8, offset: 2 }}>
          <Card>
          <CardHeader style={{fontSize:"18px", fontWeight:"bold", backgroundColor:"#808080", color:"white"}}>Beri Catatan Disini</CardHeader>
          <CardBody>
            <Form>
              <FormGroup>
              <Input type="textarea" name="text" value={this.state.cat_kegiatan} onChange={(ev)=>this.setState({cat_kegiatan: ev.target.value})} placeholder="Tulis disini... (Opsional)"/>
              </FormGroup>
            </Form>
          </CardBody>
          <CardFooter>
            <Button variant="contained" color="primary" style={{float:"right"}} onClick={()=>this.kirim()}>Kirim</Button>
          </CardFooter>
        </Card>
        </Col>
        </Row>
        {/* Detail data kegiatan */}
      </Container>}/>
    </div>
      )
    }
  }
  
export default Detailkegiatanadmin;
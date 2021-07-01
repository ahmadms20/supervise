import React from 'react';
import {Container, Row, Col, Card, CardBody} from 'reactstrap';
import {ResponsiveDrawer} from './Drawer-admin.js';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import avatar from './img/avatar.png';
import axios from 'axios';
import url from './Domain.json';
import {TokenChecker} from './TokenChecker.js';
import { CardEditPassword } from './components/materials';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {MDBCard, MDBCardBody} from 'mdbreact';

const styles = theme => ({
  large: {
    width: theme.spacing(22),
    height: theme.spacing(22),
    margin: "0 auto"
  }
});
const token = localStorage.getItem('token')

class Profiladmin extends React.Component{
  constructor(props){
    super(props);
      this.state = {
        dataprofil: []
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

getData (para){
  axios.get(url.api+"/admin/akun?nip="+para,{headers: { 'Authorization':  `token=${token}` }})
  .then(res=>{
    console.log(res.data)
    var data = res.data.data[0].pegawai
    var link= res.data.data[0].pegawai.avatar
    var tgl = res.data.data[0].pegawai.tgl_lahir
    var datatgl = tgl.split('T')
    data.avatar = `${url.api}/assets/img/avatar/${link}`
    data.tgl_lahir = datatgl[0]
    this.setState({dataprofil : res.data.data[0].pegawai})   
    console.log("data", res.data.data[0])       
  })
}

updatePassword (data) {
  axios.patch(url.api+"/admin/akun/password",data,{headers: { 'Authorization':  `token=${token}` }}).then(res=>{
    console.log(res.data)
    if(!res.data.data){
      Swal.fire({
              title: 'Terjadi Kesalahan',
              text:  'Password lama tidak sesuai',
              icon:  'error',
          })   
    } else {
      Swal.fire({
        icon:'success',
        text:'Password berhasil diubah',
        title:'Sukses',
      })
    }
  })
}

render(){
  const { classes } = this.props;
  return(
    <div id="font">
        <ResponsiveDrawer
        component = {<Container className="themed-container" fluid={true}>
        {/* Judul */}
        <li style={{ fontSize: "20px", color:"#5B69E3", fontWeight:"bold" }}>Profil</li>
        {/* Judul */}
        {/* Detail data profil */}
        <Row style={{marginTop:"20px"}}>
          <Col sm="12" md="12" lg={{ size: 8, offset: 2 }}>
          <MDBCard testimonial>
            <MDBCardBody>
            <Row>
              <Col lg="6">
              <Avatar src={this.state.dataprofil.avatar} style={{marginTop:"40px"}} className={classes.large}/>
              </Col>
              <Col lg="6">
              <Grid style={{height:'45px', marginTop:"20px"}} container>
                <Grid style={{width:'30%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'17px'}}>NIP</Typography></Grid>
                <Grid style={{width:'70%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'17px'}}>: {this.state.dataprofil.nip}</Typography></Grid>
              </Grid>
              <Grid style={{height:'45px'}} container>
                <Grid style={{width:'30%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'17px'}}>Nama</Typography></Grid>
                <Grid style={{width:'70%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'17px'}}>: {this.state.dataprofil.nama}</Typography></Grid>
              </Grid>
              <Grid style={{height:'45px'}} container>
                  <Grid style={{width:'30%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'17px'}}>Lahir</Typography></Grid>
                  <Grid style={{width:'70%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'17px'}}>: {this.state.dataprofil.tgl_lahir}</Typography></Grid>
              </Grid>
              <Grid style={{height:'45px'}} container>
                  <Grid style={{width:'30%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'17px'}}>Telepon</Typography></Grid>
                  <Grid style={{width:'70%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'17px'}}>: {this.state.dataprofil.no_telp}</Typography></Grid>
              </Grid>
              <Grid style={{height:'45px'}} container>
                  <Grid style={{width:'30%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'17px'}}>Email</Typography></Grid>
                  <Grid style={{width:'70%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'17px'}}>: {this.state.dataprofil.email}</Typography></Grid>
              </Grid>
              <Grid style={{height:'45px'}} container>
                  <Grid style={{width:'30%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'17px'}}>Alamat</Typography></Grid>
                  <Grid style={{width:'70%'}}><Typography style={{fontFamily:'Larsseit',fontSize:'17px'}}>: {this.state.dataprofil.alamat}</Typography></Grid>
              </Grid>
              </Col>
            </Row>
            </MDBCardBody>
          </MDBCard>
          </Col>
        </Row>
        {/* Detail data profil */}
        {/* Form ubah password */}
        <Row>
          <Col sm="12" md="12" lg={{ size: 8, offset: 2 }}>
          <CardEditPassword onSubmit={this.updatePassword} id={this.state.dataprofil.nip} />
          </Col>
        </Row>
        {/* Form ubah password */}
      </Container>}/>
    </div>
      )
    }
  }
  
Profiladmin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profiladmin);
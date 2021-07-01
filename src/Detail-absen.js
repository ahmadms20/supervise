import React from 'react';
import { Container, FormGroup, Form, Input, Card, CardBody, Col, Row, CardHeader, Table } from 'reactstrap';
import { ResponsiveDrawer } from './Drawer-admin.js';
import axios from 'axios';
import url from './Domain.json';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { TokenChecker } from './TokenChecker.js';
import Foto from './img/photo.jpg';
import { NavLink } from 'react-router-dom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: "0 auto"
  }
});
const token = localStorage.getItem('token')

class Absenadmin extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        redirect: '/absen/detail/'+this.props.match.params.id,
        dataabsen: [],
        modal: false,   
        detail: {
          foto_absen_datang: '',
          foto_absen_pulang: '',
          tgl_absen: '',
          waktu_datang: '',
          waktu_pulang: '',
          status_absen: '',
          keterangan_absen: '',
          waktu_keterlambatan: ''
        },
        page: 1,
        perPage: 5,
        search: '',
        nama: ''
      }
      this.handleRow = this.handleRow.bind(this)
      this.handleBack = this.handleBack.bind(this)
      this.handleNext = this.handleNext.bind(this)
    }

    componentDidMount(){
      this.getData()
      TokenChecker("admin")
      localStorage.setItem('nip4', this.props.match.params.id)
      localStorage.setItem('bulan', this.props.match.params.bulan)
      localStorage.setItem('tahun', this.props.match.params.tahun)
    }

    componentDidUpdate(prevProps, prevState){
      if (prevState.page !== this.state.page || prevState.perPage !== this.state.perPage){
        this.getData()
      }  
    }

    getData(){
      var bulan = this.props.match.params.bulan
      if (bulan < 10) bulan = '0'+bulan;
      axios.get(url.api+'/admin/absen?nip='+this.props.match.params.id, {
        headers: { 'Authorization': `token=${token}`
      }, params: { 
        page: this.state.page, 
        perPage: this.state.perPage,
        bulan: bulan,
        tahun: this.props.match.params.tahun
      }}).then(res => {
        console.log("cece", res.data.data)
        if ( res.data.data != 'Empty'){
          this.setState({dataabsen: res.data.data})
          this.setState({nama:res.data.data[0].pegawai.nama})
        } else {
          if( this.state.page >= 2) {
          this.setState({page : this.state.page - 1})
          }
        }
      })
    }

    modalFunction(para, item){
      if(para === 'open'){
        this.setState({ modal:true, detail: {...this.state.detail, foto_absen_datang: item.foto_absen_datang, foto_absen_pulang: item.foto_absen_pulang, tgl_absen: item.tgl_absen, 
        waktu_datang: item.waktu_datang, waktu_pulang: item.waktu_pulang, status_absen: item.status_absen, keterangan_absen: item.keterangan_absen, waktu_keterlambatan: item.waktu_keterlambatan} })
      }else if(para === 'close'){
        this.setState({ modal:false })
      }
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
        axios.get(url.api+"/admin/absen/search", {
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
            res.data.data.map(item => data.push({tgl_absen: item.tgl_absen, status_absen: item.status_absen, keterangan_absen: item.keterangan_absen}))
            this.setState({dataabsen: data})
          }
        })
      }
    }

render(){
  var data = this.state.dataabsen.map(item => {
    return (
      <tr>
        <td>{item.tgl_absen}</td>
        <td>{item.status_absen == null ? '-' : item.status_absen}</td>
        <td>{item.keterangan_absen}</td>
        <td>
        <IconButton id="button" size="small" 
          onClick={()=> 
          this.modalFunction('open', item)
        }>
          <ArrowForwardIosIcon fontSize="inherit"/>
        </IconButton>
        </td>
      </tr>
    )
  })
  const redirect = '/absen/filter/'+this.props.match.params.id;
  const { classes } = this.props;
  var bulan =''
  if (this.props.match.params.bulan == '01'){bulan = 'Januari'}
  else if (this.props.match.params.bulan == '02'){bulan = 'Februari'}
  else if (this.props.match.params.bulan == '03'){bulan = 'Maret'}
  else if (this.props.match.params.bulan == '04'){bulan = 'April'}
  else if (this.props.match.params.bulan == '05'){bulan = 'Mei'}
  else if (this.props.match.params.bulan == '06'){bulan = 'Juni'}
  else if (this.props.match.params.bulan == '07'){bulan = 'Juli'}
  else if (this.props.match.params.bulan == '08'){bulan = 'Agustus'}
  else if (this.props.match.params.bulan == '09'){bulan = 'September'}
  else if (this.props.match.params.bulan == '10'){bulan = 'Oktober'}
  else if (this.props.match.params.bulan == '11'){bulan = 'November'}
  else if (this.props.match.params.bulan == '12'){bulan = 'Desember'}
  console.log("wewe", bulan)
  return(
    <div id="font">
      <ResponsiveDrawer
        component = {
        <Container className="themed-container" fluid={true}>
        {/* Judul */}
        <li style={{ fontSize: "20px", color:"#5B69E3", fontWeight:"bold" }}>Detail Absen</li>
        {/* Judul */}
        {/* Tabel data absen */}
        <Row style={{marginTop:"20px"}}>
        <Col sm="12" md="12" lg={{ size: 8, offset: 2 }}>
        <Form inline>
        <Button
        component={NavLink} 
        to={redirect}
        color="primary"
        size="small"
        startIcon={<ArrowBackIosIcon />}
        >
          Kembali
        </Button>
        <h5 className="ml-auto">{bulan} {this.props.match.params.tahun}</h5>
        </Form>
        <Card style={{marginTop:"2%"}}>
          <CardHeader>
          <Form inline>
              <h5>Absen {this.state.nama}</h5>
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
                <th>Tanggal</th>
                <th>Status</th>
                <th>Keterangan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {
                data
              }
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
        {/* Tabel data absen */}
        {/* Modal detail absen */}
        <Dialog onClose={()=>this.modalFunction('close')} aria-labelledby="customized-dialog-title" open={this.state.modal} fullWidth>
          <DialogTitle id="customized-dialog-title" onClose={()=>this.modalFunction('close')}>
            Detail Absen 
          </DialogTitle>
          <DialogContent dividers>
          <Row>
            <Col lg="6">
              <h6 className="text-center">Datang</h6>
              <Avatar src={'http://localhost:2408/assets/img/absen/'+this.state.detail.foto_absen_datang} variant="square" className={classes.large}/>
              <h6 className="text-center" style={{marginTop:"10px"}}>Pulang</h6>
              <Avatar src={'http://localhost:2408/assets/img/absen/'+this.state.detail.foto_absen_pulang} variant="square" className={classes.large}/>
            </Col>
            <Col lg="6">
            <Grid style={{width:'100%',height:'100%', marginTop:"10px"}} container direction='column' justify="space-around">
              <Grid style={{height:'30px'}} container>
                  <Grid style={{width:'30%'}}>Tanggal</Grid>
                  <Grid style={{width:'70%'}}>: {this.state.detail.tgl_absen}</Grid>
              </Grid>
              <Grid style={{height:'30px'}} container>
                  <Grid style={{width:'30%'}}>Datang</Grid>
                  <Grid style={{width:'70%'}}>: {this.state.detail.waktu_datang == null ? '-' : this.state.detail.waktu_datang}</Grid>
              </Grid>
              <Grid style={{height:'30px'}} container>
                  <Grid style={{width:'30%'}}>Pulang</Grid>
                  <Grid style={{width:'70%'}}>: {this.state.detail.waktu_pulang == null ? '-' : this.state.detail.waktu_pulang}</Grid>
              </Grid>
              <Grid style={{height:'30px'}} container>
                  <Grid style={{width:'30%'}}>Status</Grid>
                  <Grid style={{width:'70%'}}>: {this.state.detail.status_absen == null ? '-' : this.state.detail.status_absen}</Grid>
              </Grid>
              <Grid style={{height:'30px'}} container>
                  <Grid style={{width:'30%'}}>Keterangan</Grid>
                  <Grid style={{width:'70%'}}>: {this.state.detail.keterangan_absen}</Grid>
              </Grid>
              <Grid style={{height:'30px'}} container>
                  <Grid style={{width:'30%'}}>Lambat</Grid>
                  <Grid style={{width:'70%'}}>: {this.state.detail.waktu_keterlambatan == null ? '-' : this.state.detail.waktu_keterlambatan}</Grid>
              </Grid>
            </Grid>
            </Col>
          </Row>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>this.modalFunction('close')} id="button" color="primary">Kembali</Button>
          </DialogActions>
        </Dialog>
        {/* Modal detail absen */}
      </Container>}/>
    </div>
      )
    }
  }

Absenadmin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Absenadmin);
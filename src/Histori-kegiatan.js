import React from 'react';
import { Container, FormGroup, Form, Input, Card, CardBody, Label, CardHeader, Table, CustomInput, FormText } from 'reactstrap';
import { ResponsiveDrawer } from './Drawer-karyawan.js';
import axios from 'axios';
import url from './Domain.json';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {Grid} from '@material-ui/core';
import {TokenChecker} from './TokenChecker.js';
import Swal from 'sweetalert2';
import { NavLink}  from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { TableHistoriKegiatan } from './components/materials';

let set       = new Date();
let date      = set.getDate();
if (date < 10) {
  date = '0' + date;
}
let month     = set.getMonth()+1;
if (month < 10) {
  month = '0' + month;
}
let year      = set.getFullYear();
let thisDate  = `${year}-${month}-${date}`;

const styles = theme => ({
  square: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  }
})
const token = localStorage.getItem('token')

class Historikegiatan extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        modal: false, 
        data: {
          id_kegiatan: '',
          kegiatan: '',
          foto_kegiatan: null,
          file_kegiatan: null,
          tgl_kegiatan: '',
          waktu_kegiatan: '',
        },
        kegiatanHariIni: [],
      }
      this.handleImageChange = this.handleImageChange.bind(this);
      this.handleFileChange = this.handleFileChange.bind(this);
    }

    componentDidMount(){
      axios.get(url.api+'/api/tokenChecker', {
        headers: {
          'Authorization' : `token=${token}`
        }
      }).then(res => {
        var para = res.data.nip;
        this.getData(para)
      })
      TokenChecker("pegawai")
    }

    getData(para){
      axios.get(url.api+"/pegawai/kegiatan?nip="+para,{headers: { 'Authorization':  `token=${token}` }}).then(res=>{
        if (res.data.data != "Empty") { 
          var currentKegiatan = res.data.data.filter(item => {
            return item.tgl_kegiatan == thisDate;
          })  
          this.setState({currentKegiatan: currentKegiatan})	
        }
      })
      axios.get(url.api+"/pegawai/kegiatan?nip="+para+"&tgl_kegiatan="+thisDate,{headers: { 'Authorization':  `token=${token}` }}).then(res=>{
        if(res.data.data != "Empty"){
          const linkImage = res.data.data[0].foto_kegiatan
          res.data.data[0].foto_kegiatan = `${url.api}/assets/img/task/${linkImage}`
          this.setState({kegiatanHariIni:res.data.data})
        }
      })
    }

    updateData(id){
      const data = new FormData()
      data.append('kegiatan',this.state.data.kegiatan)
      if (this.state.data.foto_kegiatan != null) {
      data.append('foto_kegiatan',this.state.data.foto_kegiatan)
      }
      if (this.state.data.file_kegiatan != null) {
        data.append('file_kegiatan',this.state.data.file_kegiatan)
      }
      data.append('waktu_kegiatan',this.state.data.waktu_kegiatan)
    axios.put(url.api+"/pegawai/kegiatan/"+id,data,{headers: { 'Authorization':  `token=${token}` }}).then(res=>{
      if(res.data.message == "Successfully"){
        Swal.fire({
            title: 'Sukses',
            text:  'Data berhasil diubah!',
            icon:  'success',
            confirmButtonText: 'OK',
            backdrop: false
        }).then(()=>{
          window.location.reload()   
      })         
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
     this.setState({modal:false})
    })
  }

    modalFunction(para,item){
      if(para === 'open'){
        this.setState({ modal:true })
        this.setState({
          data:{...this.state.data, kegiatan:item.kegiatan , waktu_kegiatan:item.waktu_kegiatan , id_kegiatan:item.id_kegiatan}
        })
      }else if(para === 'close'){
        this.setState({ modal:false })
      }
    }

    handleImageChange(event) {
      this.setState({
        data:{...this.state.data, foto_kegiatan: event.target.files[0]}
      })
    };

    handleFileChange(event) {
      this.setState({
        data:{...this.state.data, file_kegiatan: event.target.files[0]}
      })
    };

render(){
  const { classes } = this.props;
  return(
    <div id="font">
      <ResponsiveDrawer
        component = {<Container className="themed-container" fluid={true}>
        {/* Judul */}
        <li style={{ fontSize: "20px", color:"#5B69E3", fontWeight:"bold" }}>Histori Kegiatan</li>
        {/* Judul */}
        {/* Tabel data kegiatan */}
         <Grid container spacing={3} style={{marginTop:"10px"}}>
         <Grid item xs={12} md={12} lg={12}>
         <FormGroup>
          <Button
            component={NavLink} 
            to="/kegiatan-karyawan"
            color="primary"
            size="small"
            startIcon={<ArrowBackIosIcon />}
            >
              Kembali
          </Button>
         </FormGroup>
         <Card style={{marginTop:"2%"}}>
          <CardHeader>
              <h5>Data Kegiatan Hari Ini</h5>
          </CardHeader>
          <CardBody>
          <Table>
            <thead>
              <tr>
                <th>Judul</th>
                <th>Foto</th>
                <th>File</th>
                <th>Tanggal</th>
                <th>Waktu</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {this.state.kegiatanHariIni.map((item,index)=>{
                return(
                  <tr>
                    <td>{item.kegiatan}</td>
                    <td>
                      <Avatar variant="square" src={item.foto_kegiatan} className={classes.square}/>
                    </td>
                    <td>{item.file_kegiatan}</td>
                    <td>{item.tgl_kegiatan}</td>
                    <td>{item.waktu_kegiatan}</td>
                    <td>
                      <IconButton id="button" size="small" onClick={()=> this.modalFunction('open',item)}>
                        <EditIcon fontSize="inherit"/>
                      </IconButton>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          </CardBody>
          </Card>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
          {/* Tabel data kegiatan */}
            <TableHistoriKegiatan api={url.api+'/pegawai/kegiatan'} token={token} /> 
          {/* Tabel data kegiatan */}
          </Grid>
          </Grid>
         {/* Modal edit kegiatan */}
         <Dialog onClose={()=>this.modalFunction('close')} aria-labelledby="customized-dialog-title" open={this.state.modal} fullWidth>
         <Form>
          <DialogTitle id="customized-dialog-title" onClose={()=>this.modalFunction('close')}>
            Ubah Kegiatan
          </DialogTitle>
          <DialogContent dividers>
            <FormGroup>
              <Label>Judul Kegiatan</Label>
              <Input type="text" placeholder="Masukan judul kegiatan" value={this.state.data.kegiatan} onChange={ev=>this.setState({data:{...this.state.data, kegiatan:ev.target.value}})} required/>
            </FormGroup>
            <FormGroup>
              <Label>Foto Kegiatan</Label>
              <CustomInput id="foto_kegiatan" type="file" name="foto" label="Pilih Foto" accept="image/*" onChange={this.handleImageChange} />
              <FormText style={{fontSize:"12px", fontWeight:"bold"}}>Format foto: JPG, JPEG dan PNG</FormText>
            </FormGroup>
            <FormGroup>
              <Label>File Kegiatan</Label>
              <CustomInput id="file_kegiatan" type="file" name="file" label="Pilih File" onChange={this.handleFileChange} />
              <FormText style={{fontSize:"12px", fontWeight:"bold"}}>Format file: Docx dan PDF</FormText>
            </FormGroup>
            <FormGroup>
              <Label>Waktu Kegiatan</Label>
              <Input type="time" name="time" id="exampleTime" placeholder="Masukan waktu kegiatan" value={this.state.data.waktu_kegiatan} onChange={ev=>this.setState({data:{...this.state.data, waktu_kegiatan:ev.target.value}})} required/>
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>this.updateData(this.state.data.id_kegiatan)} color="primary" id="button">Simpan</Button>
            <Button onClick={()=>this.modalFunction('close')} color="secondary" id="button">Batal</Button>
          </DialogActions>
          </Form>
        </Dialog>
        {/* Modal edit kegiatan */}
      </Container>}/>
    </div>
    )
  }
}
  
Historikegiatan.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Historikegiatan);
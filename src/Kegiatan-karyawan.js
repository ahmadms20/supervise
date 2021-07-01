import React from 'react';
import {Alert,CardFooter, Form, FormGroup, Label, FormText, Input, Container,  Card, CardBody, CustomInput} from 'reactstrap';
import {ResponsiveDrawer} from './Drawer-karyawan.js';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import url from './Domain.json';
import {TokenChecker} from './TokenChecker.js';
import Swal from 'sweetalert2';
import {NavLink} from 'react-router-dom';

const token = localStorage.getItem('token')
class Kegiatankaryawan extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        kegiatan: {
          kegiatan: '',
          foto_kegiatan: '',
          file_kegiatan: '',
          tgl_kegiatan: '',
          waktu_kegiatan: ''
        },
        tampilan1:'none',
        tampilan2:'none',
        tampilan3:'none',
        nip: ''
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
        this.setState({nip:para})
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
      axios.get(url.api+`/pegawai/jadwal?hari=${n}`,{headers: { 'Authorization':  `token=${token}` }})
      .then(res=>{
        console.log(res.data.data)
        if(res.data.data[0].keterangan_jadwal == 'normal'){
          this.setState({tampilan1:'block'})
          axios.get(url.api+"/pegawai/kegiatan?tgl_kegiatan="+waktu+"&nip="+para,{headers: { 'Authorization':  `token=${token}` }})
          .then(res=>{
            console.log(res.data.data)
            if(res.data.data == "Empty"){
              this.setState({tampilan1:'block'})
              this.setState({tampilan2:'none'})
            } else {
              this.setState({tampilan2:'block'})
              this.setState({tampilan1:'none'})
            }
        })
        } else {
          this.setState({tampilan1:'none'})
          this.setState({tampilan3:'block'})
        }
      })
    }

    kirim(e){
      e.preventDefault()
      const data = new FormData()
        data.append('nip', this.state.nip)
        data.append('kegiatan',this.state.kegiatan.kegiatan)
        data.append('foto_kegiatan',this.state.kegiatan.foto_kegiatan)
        data.append('file_kegiatan',this.state.kegiatan.file_kegiatan)
        data.append('tgl_kegiatan',this.state.kegiatan.tgl_kegiatan)
        data.append('waktu_kegiatan',this.state.kegiatan.waktu_kegiatan)
      axios.post(url.api+"/pegawai/kegiatan",data,{headers: { 'Authorization':  `token=${token}` }}).then(res=>{
        console.log(res)
        if(!res.data.data){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Terjadi Kesalahan',
          })
        }else{
          Swal.fire({
            title: 'Sukses',
            text:  'Data berhasil ditambahkan!',
            icon:  'success',
            confirmButtonText: 'OK',
            backdrop: false
        }).then(()=>{
          window.location.reload()
      })         
        }
      }).catch(err=> {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Terjadi Kesalahan',
        })
      })
    }

    handleImageChange(event) {
      this.setState({
        kegiatan:{...this.state.kegiatan, foto_kegiatan: event.target.files[0]}
      })
    };

    handleFileChange(event) {
      this.setState({
        kegiatan:{...this.state.kegiatan, file_kegiatan: event.target.files[0]}
      })
    };

render(){
  return(
    <div id="font">
      <ResponsiveDrawer
        component = {<Container className="themed-container" fluid={true}>
        {/* Judul */}
        <li style={{ fontSize: "20px", color:"#5B69E3", fontWeight:"bold" }}>Kegiatan</li>
        {/* Judul */}
        {/* Form kegiatan */}
        <Form>
        <Card style={{marginTop:"10px"}}>
        <CardBody>
        <Alert style={{display:`${this.state.tampilan2}`}}>
          Anda Sudah Mengisi Kegiatan !
        </Alert>
        <Alert color="warning" style={{display:`${this.state.tampilan3}`}}>
          Hari ini Libur
        </Alert>
        <FormGroup>
          <Button variant="contained" id="button" style={{backgroundColor:"#ff7235", color:"white"}} component={NavLink} to="/histori-kegiatan">Histori</Button>
        </FormGroup>
        <FormGroup style={{display:`${this.state.tampilan1}`}}>
          <Label>Judul Kegiatan</Label>
          <Input type="text" placeholder="Masukan judul kegiatan" onChange={ev=>this.setState({kegiatan:{...this.state.kegiatan, kegiatan:ev.target.value}})} required/>
        </FormGroup>
        <FormGroup style={{display:`${this.state.tampilan1}`}}>
          <Label>Foto Kegiatan</Label>
          <CustomInput id="foto_kegiatan" type="file" name="foto" label="Pilih Foto" accept="image/*" onChange={this.handleImageChange} required/>
          <FormText style={{fontSize:"12px", fontWeight:"bold"}}>Format foto: JPG, JPEG dan PNG</FormText>
        </FormGroup>
        <FormGroup style={{display:`${this.state.tampilan1}`}}>
          <Label>File Kegiatan</Label>
          <CustomInput id="file_kegiatan" type="file" name="file" label="Pilih File" onChange={this.handleFileChange} required/>
          <FormText style={{fontSize:"12px", fontWeight:"bold"}}>Format file: PDF</FormText>
        </FormGroup>
        <FormGroup style={{display:`${this.state.tampilan1}`}}>
          <Label>Waktu Kegiatan</Label>
          <Input type="time" name="time" id="exampleTime" placeholder="Masukan waktu kegiatan" onChange={ev=>this.setState({kegiatan:{...this.state.kegiatan, waktu_kegiatan:ev.target.value}})} required/>
        </FormGroup>
        </CardBody>
        <CardFooter style={{display:`${this.state.tampilan1}`}}>
          <Button type="submit" variant="contained" id="button" onClick={(e)=>this.kirim(e)} style={{float:"right", backgroundColor:"#4756DF", color:"white"}}>Kirim</Button>
        </CardFooter>
        </Card>
        </Form>
        {/* Form kegiatan*/}
      </Container>}/>
    </div>
      )
    }
  }
  
export default Kegiatankaryawan;
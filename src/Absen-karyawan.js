import React from 'react';
import { Container } from 'reactstrap';
import { ResponsiveDrawer } from './Drawer-karyawan.js';
import axios from 'axios';
import url from './Domain.json';
import {Grid} from '@material-ui/core';
import Swal from 'sweetalert2';
import { TokenChecker } from './TokenChecker.js';
import { CardAbsen } from './components/materials';
import { TableHistoriAbsenDatang, TableHistoriAbsenPulang } from './components/materials';

const token = localStorage.getItem('token')

class Absenkaryawan extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        nip: ''
      }
    }

    componentDidMount(){         
      axios.get(url.api+'/api/tokenChecker', {
        headers: {
          'Authorization' : `token=${token}`
        }
      }).then(res => {
        var para = res.data.nip;
        this.setState({nip:para})
      })
      TokenChecker("pegawai")
    }


    kirim (item){
      if(item.status == "masuk"){
        const data = new FormData()
        data.append('nip',item.nip)
        data.append('foto_absen',item.img)
        axios.post(url.api+'/pegawai/absen/datang',data,{headers: { 'Authorization':  `token=${token}`}})
        .then(res=>{
          if(!res.data.data){
            Swal.fire({
              icon:'error',
              text:'Anda sudah absen datang pada hari ini!',
              title:'Error',
              })
          } else if(res.data.message == "Successfully"){
            Swal.fire({
              icon:'success',
              text:'Anda berhasil absen',
              title:'Success',
              }).then((result)=>{
                  if(result.isConfirmed)
                  window.location.reload()
              })
          }
        }).catch(err=>{
          console.log(err)
        })
      } else if (item.status == 'pulang'){
        const data = new FormData()
        data.append('nip',item.nip)
        data.append('foto_absen',item.img)
        axios.post(url.api+'/pegawai/absen/pulang',data,{headers: { 'Authorization':  `token=${token}`}})
        .then(res=>{
          if(res.data.message == "Anda sudah absen pada hari ini!"){
            Swal.fire({
              icon:'error',
              text:'Anda sudah absen pada hari ini!',
              title:'Error',
              })
          } else if(res.data.message == "Successfully"){
            Swal.fire({
              icon:'success',
              text:'Anda berhasil absen',
              title:'Success',
              }).then((result)=>{
                  if(result.isConfirmed)
                  window.location.reload()
              })
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    }

render(){
  return(
    <div id="font">
      <ResponsiveDrawer
        component = {<Container className="themed-container" fluid={true}>
        {/* Judul */}
        <li style={{ fontSize: "20px", color:"#5B69E3", fontWeight:"bold", marginBottom:"10px" }}>Absen</li>
        {/* Judul */}
        {/* Card absen */}
        <CardAbsen onSend={this.kirim} nip={this.state.nip} />
        {/* Card absen */}
        {/* Tabel absen datang */}
        <Grid item>
          <TableHistoriAbsenDatang api={url.api+'/pegawai/absen'} token={token} />  
        </Grid>
        {/* Tabel absen datang */}
        {/* Tabel absen pulang */}
        <Grid item>
          <TableHistoriAbsenPulang api={url.api+'/pegawai/absen'} token={token} /> 
        </Grid>
        {/* Tabel absen pulang */}
      </Container>}/>
    </div>
    )
  }
}
    
export default Absenkaryawan;
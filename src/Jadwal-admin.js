import React from 'react';
import { Container, Table, Card, CardBody ,CardTitle, Form, FormGroup, Label, Input } from 'reactstrap';
import { ResponsiveDrawer } from './Drawer-admin.js';
import axios from 'axios';
import url from './Domain.json';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { TokenChecker } from './TokenChecker.js';
import Swal from 'sweetalert2';

const token = localStorage.getItem('token')

class Jadwaladmin extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        jadwal: {
          mulai: null,
          selesai: null,
          keterangan_jadwal: null,
        },
        datajadwal: [],
        modal: false,
        hari: '',
        id_jadwal: ''
      }
    }

    componentDidMount(){
      this.getData()
      TokenChecker("admin")
    }

    getData(){
      axios.get(url.api+"/admin/jadwal",{headers: { 'Authorization':  `token=${token}` }}).then(res=>{
        this.setState({datajadwal:res.data.data})
      })
    }

    updateData(id){
        const data = new FormData()
        data.append('mulai',this.state.jadwal.mulai)
        data.append('selesai',this.state.jadwal.selesai)
        data.append('keterangan_jadwal',this.state.jadwal.keterangan_jadwal)
      axios.put(url.api+"/admin/jadwal/"+id,data,{headers: { 'Authorization':  `token=${token}` }}).then(res=>{
        console.log("data", res.data)
        if(res.data.message == "Successfully"){
          Swal.fire({
              title: 'Sukses',
              text:  'Data berhasil diubah!',
              icon:  'success',
              confirmButtonText: 'OK',
              backdrop: false
          })    
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ada Kesalahan!',
          })
        }
      this.setState({ modal:false })
      this.getData()
      })
    }

    modalFunction(para, hari, id){
      if(para === 'open'){
        this.setState({ modal:true , hari:hari, id_jadwal:id})
      }else if(para === 'close'){
        this.setState({ modal:false, jadwal:{...this.state.jadwal, mulai: null, selesai: null,  keterangan_jadwal: null} })
      }
    }

render(){
  var data = this.state.datajadwal.map((x,i)=>{
    return(
    <tr>
      <td>{x.hari}</td>
      <td>{(x.mulai === null)?"-":x.mulai}</td>
      <td>{(x.selesai === null)?"-":x.selesai}</td>
      <td>{x.keterangan_jadwal}</td>
      <td>
      <Button variant="contained" size="small" id="button" style={{backgroundColor:"#21e758", color:"white"}} onClick={()=>this.modalFunction('open', this.state.datajadwal[i].hari, this.state.datajadwal[i].id_jadwal)}>Ubah</Button>
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
        <li style={{ fontSize: "20px", color:"#5B69E3", fontWeight:"bold" }}>Jadwal</li>
        {/* Judul */}
        {/* Data jadwal */}
        <Card style={{marginTop:"10px"}}>
        <CardBody>
          <CardTitle style={{fontSize:"20px"}}><b>Jadwal Kerja</b></CardTitle>
        <Table striped bordered>
        <thead className="text-center">
        <tr>
          <th><b>Hari</b></th>
          <th><b>Mulai</b></th>
          <th><b>Selesai</b></th>
          <th><b>Keterangan</b></th>
          <th><b>Aksi</b></th>
        </tr>
        </thead>
        <tbody className="text-center">
        {data}
        </tbody>
        </Table>
        </CardBody>
        </Card>
        {/* Data jadwal */}
        {/* Modal ubah jadwal */}
        <Dialog onClose={()=>this.modalFunction('close')} aria-labelledby="customized-dialog-title" open={this.state.modal} fullWidth>
          <DialogTitle id="customized-dialog-title" onClose={()=>this.modalFunction('close')}>
            Ubah Jadwal Kerja
          </DialogTitle>
          <Form>
          <DialogContent dividers>
            <FormGroup>
              <Label>Hari</Label>
              <Input type="text" name="hari" value={this.state.hari} disabled/>
            </FormGroup>
            <FormGroup>
              <Label>Mulai</Label>
              <Input type="time" name="mulai" placeholder="Masukan mulai kerja" onChange={ev=>this.setState({jadwal:{...this.state.jadwal, mulai:ev.target.value}})} required/>
            </FormGroup>
            <FormGroup>
              <Label>Selesai</Label>
              <Input type="time" name="selesai" placeholder="Masukan selesai" onChange={ev=>this.setState({jadwal:{...this.state.jadwal, selesai:ev.target.value}})} required/>
            </FormGroup>
            <FormGroup>
              <Label>Keterangan</Label>
              <Input type="select" name="keterangan" onChange={ev=>this.setState({jadwal:{...this.state.jadwal, keterangan_jadwal:ev.target.value}})}>
                 <option hidden>Pilih keterangan</option>
                 <option value="01">Normal</option>
                 <option value="02">Libur</option>
               </Input>
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>this.updateData(this.state.id_jadwal)} disabled={this.state.jadwal.mulai == null  && this.state.jadwal.selesai == null && this.state.jadwal.keterangan_jadwal == null ? true : false} color="primary" id="button">Simpan</Button>
            <Button onClick={()=>this.modalFunction('close')} color="secondary" id="button">Batal</Button>
          </DialogActions>
          </Form>
        </Dialog>
        {/* Modal ubah jadwal */}
      </Container>}/>
    </div>
      )
    }
  }
  
export default Jadwaladmin;
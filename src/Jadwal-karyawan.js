import React from 'react';
import { Container, Table, Card, CardBody , CardTitle } from 'reactstrap';
import { ResponsiveDrawer } from './Drawer-karyawan.js';
import axios from 'axios';
import url from './Domain.json';
import { TokenChecker } from './TokenChecker.js';

const token = localStorage.getItem('token')

class Jadwalkaryawan extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        datajadwal: []
      }
    }

    componentDidMount(){
      this.getData()
      TokenChecker("pegawai")
    }

    getData(){
      axios.get(url.api+"/pegawai/jadwal",{headers: { 'Authorization':  `token=${token}` }}).then(res=>{
        this.setState({datajadwal:res.data.data})
      })
    }

render(){
  var jadwal = this.state.datajadwal.map(item=>{
    return(
    <tr>
      <td>{item.hari}</td>
      <td>{item.mulai}</td>
      <td>{item.selesai}</td>
      <td>{item.keterangan_jadwal}</td>
    </tr>
    )
  })
  return(
    <div id="font">
      <ResponsiveDrawer
        component = {<Container className="themed-container" fluid={true}>
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
                </tr>
              </thead>
              <tbody className="text-center">
                {jadwal}
              </tbody>
            </Table>
          </CardBody>
        </Card>
        {/* Data jadwal */}
      </Container>}/>
    </div>
    )
  }
}
  
export default Jadwalkaryawan;
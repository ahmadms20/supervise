import React from 'react';
import { Container } from 'reactstrap';
import { ResponsiveDrawer } from './Drawer-superadmin.js';
import url from './Domain.json';
import { TokenChecker } from './TokenChecker.js';
import { TableKaryawan } from './components/materials';

const token = localStorage.getItem('token')

class Datakaryawan extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        
      }
    }

      componentDidMount(){
        TokenChecker("superadmin")
      }
  
render(){
  return(
    <div id="font">
      <ResponsiveDrawer
        component = {
        <Container className="themed-container" fluid={true}>
        {/* Judul */}
        <li style={{ fontSize: "20px", color:"#5B69E3", fontWeight:"bold" }}>Karyawan</li>
        {/* Judul */}
        {/* Tabel data karyawan */}
          <TableKaryawan api={url.api+'/superadmin'} token={token} />
        {/* Tabel data karyawan */}
      </Container>}/>
    </div>
    )
  }
}

export default Datakaryawan;
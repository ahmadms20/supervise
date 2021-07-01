import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { ResponsiveDrawer } from './Drawer-superadmin.js';
import url from './Domain.json';
import { TokenChecker } from './TokenChecker.js';
import { TableAkun } from './components/materials';

const token = localStorage.getItem('token')

class Akun extends React.Component{
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
            <li style={{ fontSize: "20px", color:"#5B69E3", fontWeight:"bold" }}>Akun</li>
          {/* Judul */}
          {/* Tabel data akun */}
            <Row style={{marginTop:"20px"}}>
              <Col sm="12" md="12" lg={{ size: 8, offset: 2 }}>
                <TableAkun api={url.api+'/superadmin'} token={token} />
              </Col>
            </Row>
          {/* Tabel data akun */}
      </Container>}/>
    </div>
    )
  }
}
  
export default Akun;
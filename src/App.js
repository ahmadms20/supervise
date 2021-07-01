import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Landingpage from './Landingpage.js';
import Login from './Login.js';
import Dashboardadmin from './Dashboard-admin.js';
import Kegiatanadmin from './Kegiatan-admin.js';
import Absenadmin from './Absen-admin.js';
import Jadwaladmin from './Jadwal-admin.js';
import Dashboardkaryawan from './Dashboard-karyawan.js';
import Kegiatankaryawan from './Kegiatan-karyawan.js';
import Detailkegiatankaryawan from './DetailKegiatan-karyawan.js';
import Absenkaryawan from './Absen-karyawan.js';
import Jadwalkaryawan from './Jadwal-karyawan.js';
import Historikegiatan from './Histori-kegiatan.js';
import Filterkegiatan from './Filter-kegiatan.js';
import Detailkegiatanadmin from './DetailKegiatan-admin.js';
import Filterabsen from './Filter-absen.js';
import Detailabsen from './Detail-absen.js';
import Dashboardsuperadmin from './Dashboard-superadmin.js';
import Akun from './Akun.js';
import Datakaryawan from './Data-karyawan.js';
import Profiladmin from './Profil-admin.js';
import Profilkaryawan from './Profil-karyawan.js';
import Profilsuperadmin from './Profil-superadmin.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

render(){
  return(
  <Router>
    <Switch>
      <Route exact path="/"><Landingpage/></Route>
      <Route path="/login"><Login/></Route>
      <Route path="/dashboard-admin"><Dashboardadmin/></Route>
      <Route path="/kegiatan-admin"><Kegiatanadmin/></Route>
      <Route path="/admin-kegiatan/filter/:id" component={Filterkegiatan}></Route>
      <Route path="/detail-kegiatan/detail/:id" component={Detailkegiatanadmin}></Route>
      <Route path="/absen-admin"><Absenadmin/></Route>
      <Route path="/absen/filter/:id" component={Filterabsen}></Route>
      <Route path="/absen/detail/:id/:bulan/:tahun" component={Detailabsen}></Route>
      <Route path="/jadwal-admin"><Jadwaladmin/></Route>
      <Route path="/dashboard-karyawan"><Dashboardkaryawan/></Route>
      <Route path="/kegiatan-karyawan"><Kegiatankaryawan/></Route>
      <Route path="/karyawan-kegiatan/detail/:id" component={Detailkegiatankaryawan}></Route>
      <Route path="/absen-karyawan"><Absenkaryawan/></Route>
      <Route path="/jadwal-karyawan"><Jadwalkaryawan/></Route>
      <Route path="/histori-kegiatan"><Historikegiatan/></Route>
      <Route path="/dashboard-superadmin"><Dashboardsuperadmin/></Route>
      <Route path="/akun"><Akun/></Route>
      <Route path="/data-karyawan"><Datakaryawan/></Route>
      <Route path="/profil-admin"><Profiladmin/></Route>
      <Route path="/profil-karyawan"><Profilkaryawan/></Route>
      <Route path="/profil-superadmin"><Profilsuperadmin/></Route>
    </Switch>
  </Router>
    )
  }
}

export default App;

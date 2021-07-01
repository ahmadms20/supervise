import React , {useState,useEffect} from 'react';
import { Container, FormGroup, Form, Input, Label, Col, Row } from 'reactstrap';
import { ResponsiveDrawer } from './Drawer-admin.js';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import url from './Domain.json';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Redirect } from "react-router-dom";
import { TokenChecker } from './TokenChecker.js';
import ReactExport from "react-data-export";
import { TableKegiatanAdmin } from './components/materials';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


const Kegiatanadmin = () => {

  const [redirect,setRedirect] = useState('/kegiatan-admin')
  const [modal,setModal] = useState(false)
  const [bulan,setBulan] = useState('')
  const [nBulan,setNBulan] = useState('')
  const [tahun,setTahun] = useState('')
  const [arrData,setArrData] = useState([])

  const token = localStorage.getItem('token')
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const dateObj = new Date();
  const month = monthNames[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();
  const output = day  + ' ' + month  + ' ' + year;

  useEffect(() => {
    TokenChecker("admin")
    getNBulan()
    getData()
  }, [bulan,tahun])

  const getNBulan = () => {
    if(bulan == 1){
      setNBulan("Januari")
    } else if( bulan == 2){
      setNBulan("Februari")
    } else if( bulan == 3){
      setNBulan("Maret")
    } else if( bulan == 4){
      setNBulan("April")
    } else if( bulan == 5){
      setNBulan("Mei")
    } else if( bulan == 6){
      setNBulan("Juni")
    } else if( bulan == 7){
      setNBulan("Juli")
    } else if( bulan == 8){
      setNBulan("Agustus")
    } else if( bulan == 9){
      setNBulan("September")
    } else if( bulan == 10){
      setNBulan("Oktober")
    } else if( bulan == 11){
      setNBulan("November")
    } else if( bulan == 12){
      setNBulan("Desember")
    }
  } 

  const getData = async () => {
    arrData.length = 0
    await axios.get(url.api+`/admin/kegiatan/laporan`,
    {
      headers:{ 'Authorization':  `token=${token}` },
      params : {
        bulan:bulan,
        tahun:tahun                                                                                         
        }
    }
    ).then(res=>{
      const data = res.data.data
      data.map((res,i)=>{
        arrData.push([
          {value:`${nBulan} ${tahun}`},
          {value:`${i+1}`},
          {value:`${res.nip}`},
          {value:`${res.nama}`},
          {value:`${res.jumlah_kegiatan}`},
          {value:`${res.jumlah_file}`},
          {value:`${res.jumlah_foto}`},
        ])
      })
    })
  }

  let getTahun = () => {
    const years = []
    for(let yearNow = 2020; yearNow <= new Date().getFullYear(); yearNow++){
      years.push(yearNow)
    }
    return years
  }

  const modalFunction = (para) => {
    if(para === 'open'){
      setModal(true)
    }else if(para === 'close'){
      setModal(false)
    }
  }

  console.log(arrData)
  const dataSet = [
    {
        ySteps:2,
        columns: [
            {title: "Periode", width: {wpx: 120},style: {fill: {patternType: "solid", fgColor: {rgb: "a2d2ff"}}}},
            {title: "No", width: {wpx: 40},style: {fill: {patternType: "solid", fgColor: {rgb: "a2d2ff"}}}},
            {title: "NIP", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "a2d2ff"}}}},
            {title: "Nama", width: {wpx: 200},style: {fill: {patternType: "solid", fgColor: {rgb: "a2d2ff"}}}},
            {title: "Jumlah Kegiatan", width: {wpx: 120},style: {fill: {patternType: "solid", fgColor: {rgb: "a2d2ff"}}}},
            {title: "Jumlah File", width: {wpx: 120},style: {fill: {patternType: "solid", fgColor: {rgb: "a2d2ff"}}}},
            {title: "Jumlah Foto", width: {wpx: 120},style: {fill: {patternType: "solid", fgColor: {rgb: "a2d2ff"}}}},
        ],
        data: arrData
    }
];
  return (
      <ResponsiveDrawer
        component={
          <Container className="themed-container" fluid={true}>
          {/* Judul */}
          <li style={{ fontSize: "20px", color:"#5B69E3", fontWeight:"bold" }}>Kegiatan</li>
          {/* Judul */}
          <Redirect to={redirect} />
          <Row style={{marginTop:"20px"}}>
          <Col sm="12" md="12" lg={{ size: 8, offset: 2 }}>
          <Form inline>
           <Button variant="contained" id="button" onClick={()=>modalFunction('open')} style={{backgroundColor:"#ff7235", color:"white"}}>Rekap Kegiatan</Button>
           <h5 className="ml-auto">{output}</h5>
         </Form>
         <TableKegiatanAdmin api={url.api+'/admin'} token={token} />
         </Col>
         </Row>
         {/* Modal rekap absen */}
         <Dialog onClose={()=>modalFunction('close')} aria-labelledby="customized-dialog-title" open={modal} fullWidth>
           <DialogTitle id="customized-dialog-title" onClose={()=>modalFunction('close')}>
             Rekap Absen 
           </DialogTitle>
           <Form>
           <DialogContent dividers>
           <FormGroup>
           <Label>Bulan</Label>
             <Input type="select" value={bulan} name="waktu" onChange={ev=>setBulan(ev.target.value)}>
               <option hidden>Pilih bulan</option>
               <option value="1">Januari</option>
               <option value="2">Februari</option>
               <option value="3">Maret</option>
               <option value="4">April</option>
               <option value="5">Mei</option>
               <option value="6">Juni</option>
               <option value="7">Juli</option>
               <option value="8">Agustus</option>
               <option value="9">September</option>
               <option value="10">Oktober</option>
               <option value="11">November</option>
               <option value="12">Desember</option>
             </Input>
           </FormGroup>
           <FormGroup>
           <Label>Tahun</Label>
             <Input type="select" value={tahun} name="waktu" onChange={ev=>setTahun(ev.target.value)}>
               <option hidden>Pilih tahun</option>
               {getTahun().map((tahun) => 
                <option>{tahun}</option>
              )}
            </Input>
          </FormGroup>
          </DialogContent>
          </Form>
          <DialogActions>
            <ExcelFile filename="Laporan Data Kegiatan" element={<Button type="submit" color="primary" size="medium" id="button" onClick={()=>modalFunction('close')}>Download</Button>}>
              <ExcelSheet dataSet={dataSet} name={`Kegiatan ${nBulan} ${tahun}`} />
            </ExcelFile>
            <Button onClick={()=>modalFunction('close')} id="button" color="primary">Kembali</Button>
          </DialogActions>
        </Dialog>
        {/* Modal rekap absen */}
          </Container>
        } 
      />
  )
}

export default Kegiatanadmin

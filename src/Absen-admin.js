import React , {useState,useEffect} from 'react';
import { Container, FormGroup, Form, Input, Card, CardBody, CardFooter, Label, Col, Row, CardHeader } from 'reactstrap';
import { ResponsiveDrawer } from './Drawer-admin.js';
import axios from 'axios';
import url from './Domain.json';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Swal from 'sweetalert2';
import { Redirect } from "react-router-dom";
import { TokenChecker } from './TokenChecker.js';
import ReactExport from "react-data-export";
import { TableAbsenAdmin } from './components/materials';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function Absenadmin() {

  const [redirect,setRedirect] = useState('/absen-admin')
  const [modal,setModal] = useState(false)
  const [bulan,setBulan] = useState('')
  const [nBulan,setNBulan] = useState('')
  const [tahun,setTahun] = useState('')
  const [arrData,setArrData ] = useState([])
  const [dataNip,setDataNip ] = useState([])
  const [dataAbsen , setDataAbsen] = useState({})

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
    await axios.get(url.api+"/admin/pegawai",{headers: { 'Authorization':  `token=${token}` }})
      .then(res => {
        for(let i = 0; i < res.data.data.length; i++){
          let data = res.data.data[i].nip;
          console.log(data)
          dataNip.push({title: data, value: data})
          }
        })
    arrData.length = 0
    await axios.get(url.api+`/admin/absen/laporan`,
      {
      headers: { 'Authorization':  `token=${token}` },
      params : {
      bulan:bulan,
      tahun:tahun                                                                                         
      }
      }
      ).then(res=>{
        const data = res.data.data
        console.log(data)
        data.map((res,i)=>{
          arrData.push([
            {value:`${nBulan} ${tahun}`},
            {value:`${i+1}`},
            {value:`${res.nip}`},
            {value:`${res.nama}`},
            {value:`${res.sakit}`},
            {value:`${res.izin}`},
            {value:`${res.tanpa_keterangan}`},
            {value:`${res.hadir}`},
            {value:`${res.dinas}`},
            {value:`${res.persentase_kehadiran}%`},
          ])
        })
      })
      
    }

    const modalFunction = (para) => {
      if(para === 'open'){
        console.log(arrData)
        setModal(true)
      }else if(para === 'close'){
        setModal(false)
      }
    }

    let getTahun = () => {
      const years = []
      for(let yearNow = 2020; yearNow <= new Date().getFullYear(); yearNow++){
        years.push(yearNow)
      }
      return years
    }

    const dataSet = [
      {
          ySteps:2,
          columns: [
              {title: "Periode", width: {wpx: 120},style: {fill: {patternType: "solid", fgColor: {rgb: "a2d2ff"}}}},
              {title: "No", width: {wpx: 20},style: {fill: {patternType: "solid", fgColor: {rgb: "a2d2ff"}}}},
              {title: "NIP", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "a2d2ff"}}}},
              {title: "Nama", width: {wpx: 200},style: {fill: {patternType: "solid", fgColor: {rgb: "a2d2ff"}}}},
              {title: "S", width: {wpx: 30},style: {fill: {patternType: "solid", fgColor: {rgb: "4400FF"}}}},
              {title: "I", width: {wpx: 30},style: {fill: {patternType: "solid", fgColor: {rgb: "F7FF00"}}}},
              {title: "A", width: {wpx: 30},style: {fill: {patternType: "solid", fgColor: {rgb: "FFFF0000"}}}},
              {title: "Hadir", width: {wpx: 40},style: {fill: {patternType: "solid", fgColor: {rgb: "06d6a0"}}}},
              {title: "Dinas", width: {wpx: 40},style: {fill: {patternType: "solid", fgColor: {rgb: "ffb5a7"}}}},
              {title: "Persentase Kehadiran", width: {wpx: 200},style: {fill: {patternType: "solid", fgColor: {rgb: "ffb5a7"}}}},
            ],
          data: arrData                     
                
      }
  ];

  const onSelectTag =(e)=>{
    setDataAbsen({...dataAbsen, nip:e.target.value})
  }

  const kirim=()=>{
    var data = {
      nip: dataAbsen.nip,
      keterangan_absen: dataAbsen.keterangan_absen
    }
    axios.post(url.api+"/admin/absen",data,{headers: { 'Authorization':  `token=${token}` }}).then(res=>{
      console.log("data", res )
      
      if(!res.data.data){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Anda sudah mengisi absen hari ini',
        })
      } else {
        Swal.fire({
            icon:'success',
            text:`Absen ${dataAbsen.keterangan_absen} Karyawan Yang Ber-NIP ${dataAbsen.nip} Berhasil !`,
            title:'Sukses',
            backdrop: false
          }).then((result)=>{
              if(result.isConfirmed)
              window.location.href="/absen-admin"
              this.getData()
          })
      }
    }).catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Anda harus mengisi data dengan lengkap!',
        })
    })
  }

console.log(dataAbsen)

  return (
    <div>
      <ResponsiveDrawer
      component={
          <Container className="themed-container" fluid={true}>
          {/* Judul */}
          <li style={{ fontSize: "20px", color:"#5B69E3", fontWeight:"bold" }}>Absen</li>
          {/* Judul */}
          <Redirect to={redirect} />
          <Row style={{marginTop:"20px"}}>
          <Col sm="12" md="12" lg={{ size: 8, offset: 2 }}>
            <Form inline>
             <Button variant="contained" id="button" onClick={()=>modalFunction('open')} style={{backgroundColor:"#ff7235", color:"white"}}>Rekap Absen</Button>
             <h5 className="ml-auto">{output}</h5>
            </Form>
            <TableAbsenAdmin api={url.api+'/admin'} token={token} />
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
            <ExcelFile filename="Laporan Data Absen" element={<Button type="submit" color="primary" size="medium" id="button" onClick={()=>modalFunction('close')}>Download</Button>}>
              <ExcelSheet dataSet={dataSet} name={`Absen ${nBulan} ${tahun}`} />
            </ExcelFile>
            <Button onClick={()=>modalFunction('close')} id="button" color="primary">Kembali</Button>
          </DialogActions>
        </Dialog>
        {/* Modal rekap absen */}
        {/* Form absen */}
         <Row>
         <Col sm="12" md="12" lg={{ size: 8, offset: 2 }}>
         <Form>
         <Card style={{marginTop:"2%"}}>
         <CardHeader style={{fontSize:"18px", fontWeight:"bold", backgroundColor:"#808080", color:"white"}}>Tambah Absen</CardHeader>
         <CardBody>
         <FormGroup>
           <Label>NIP</Label>
           <Autocomplete
            id="combo-box-demo"
            options={dataNip}
            getOptionLabel={(option) => option.title}
            style={{ width:"100%" }}
            renderInput={(params) => <TextField {...params} label="Pilih NIP" variant="outlined" onSelect={onSelectTag}/>}
          />
        </FormGroup>
        <FormGroup>
          <Label>Keterangan</Label>
          <Input type="select" name="keterangan" onChange={ev=>setDataAbsen({...dataAbsen, keterangan_absen:ev.target.value})}>
             <option hidden>Pilih keterangan</option>
             <option value="sakit">Sakit</option>
             <option value="izin">Izin</option>
             <option value="dinas">Dinas</option>
           </Input>
        </FormGroup>
        </CardBody>
        <CardFooter>
          <Button variant="contained" id="button" onClick={()=>kirim()} style={{float:"right", backgroundColor:"#4756DF", color:"white"}}>Kirim</Button>
        </CardFooter>
        </Card>
        </Form>
        </Col>
        </Row>
        {/* Form absen */}
        </Container>
      } 
      />
    </div>
  )
}

export default Absenadmin;

import React, { useRef, useState, useCallback , useEffect } from 'react';
import { Card, CardBody, Button, Row, Col, Alert } from 'reactstrap';
import Webcam from 'react-webcam';
import Axios from 'axios';
import url from '../../Domain.json';

const token = localStorage.getItem('token')

function CardAbsen(props) {

    const { onSend, nip } = props

    const[img, setImg]          = useState(null)
    const[para, setPara]          = useState("")
    const[takeMasuk, setTakeMasuk]  = useState(false)
    const[tampilan1 , setTampilan1] = useState('none')
    const[tampilan2 , setTampilan2] = useState('none')
    const[tampilan3 , setTampilan3] = useState('none')
    const[tampilan4 , setTampilan4] = useState('none')
    const[tampilan5 , setTampilan5] = useState('none')
    const[takePulang, setTakePulang]= useState(false)
    const[jadwal , setJadwal] = useState([]);
    const webCamRef             = useRef(null)

    const handleCapture = useCallback(() => {
        const imgSrc = webCamRef.current.getScreenshot()
        setImg(imgSrc)
    
    },[webCamRef, setImg])

    const handleSendMasuk = () => {
        onSend({img: img, nip: nip,status:'masuk'})
    }
    const handleSendPulang = () => {
        onSend({img: img, nip: nip,status:'pulang'})
    }

    useEffect( async () => {
        
        let date = new Date()
        const jam = date.getHours()
        const menit = date.getMinutes()
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

        Axios.get(url.api+'/api/tokenChecker', {
            headers: {
              'Authorization' : `token=${token}`
            }
          })
          .then(res=>{
              console.log(res.data.nip)
              setPara(res.data.nip)
          })
          
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
                
                await Axios.get(url.api+`/pegawai/jadwal?hari=${n}`,{headers: { 'Authorization':  `token=${token}` }})
                .then(res=>{
                    const jj = res.data.data
                    for(var i= 0; i < jj.length; i++){
                        var data = res.data.data[i];
                        setJadwal(data)
                    }
                    if(jj[0].keterangan_jadwal == 'libur'){
                        setTampilan1('none')
                        setTampilan2('none')
                        setTampilan3('inline-block')
                    } else if(jj[0].keterangan_jadwal == 'normal') {
                        
                        Axios.get(url.api+"/pegawai/absen?nip="+para+"&tgl_absen="+waktu,{headers: { 'Authorization':  `token=${token}` }})
                .then(res=>{
                console.log("haha", res.data.data)
                if(res.data.data[0].waktu_datang != null){
                    setTampilan1('none')
                    setTampilan4('block')
                    setTampilan5('inline-block')
                } else if(res.data.data[0].keterangan_absen == "tanpa keterangan"){
                    setTampilan4('none')
                    setTampilan5('none')
                } else if(res.data.data[0].keterangan_absen == "sakit"){
                    setTampilan1('none')
                    setTampilan4('block')
                    setTampilan5('none')
                    setTampilan2('none')
                } else if(res.data.data[0].keterangan_absen == "izin"){
                    setTampilan1('none')
                    setTampilan4('block')
                    setTampilan5('none')
                    setTampilan2('none')
                } else if(res.data.data[0].keterangan_absen == "dinas"){
                    setTampilan1('none')
                    setTampilan4('block')
                    setTampilan5('none')
                    setTampilan2('none')
                }
                })

                        const masuk = jj[0].mulai
                        const selesai = jj[0].selesai
                        const [jm,mm,dm] = masuk.split(":")
                        const [js,ms,ds] = selesai.split(":")
                        console.log(parseInt(js))
                        console.log(parseInt(ms))
                        console.log(jam)
                        console.log(menit)
                        console.log(parseInt(jm))
                        console.log(parseInt(mm))
                        if(jam >= parseInt(jm) && menit >= parseInt(mm) && jam < parseInt(js)){
                            setTampilan1('inline-block')
                            setTampilan2('none')
                        } else if(jam >= parseInt(js) && menit >= parseInt(ms)){
                            setTampilan1('none')
                            setTampilan2('inline-block')
                            setTampilan4('none')
                            setTampilan5('none')
                        }
                    }
                })
                

            },[console.log(tampilan1),console.log(tampilan2)])

            
            
            if (takeMasuk) {
                return(
                    <>
                <Card>
                    <CardBody>
                        <Row>
                            <Col xs="12">
                                <h3>Absen Masuk</h3>
                            </Col>
                            <Col xs="12">
                                {!img ? <Webcam audio={false} ref={webCamRef} screenshotFormat="image/jpeg" width="100%"  /> : null}
                            </Col>
                            <Col xs="12">
                                <img src={img} className="img-fluid" />
                            </Col>
                            <Col xs="12">
                                {!img ? <Button onClick={handleCapture}>Capture</Button> : (
                                    <>
                                        <div className="form-inline">
                                            <div className="mr-1">
                                                <Button onClick={() => setImg(null)} style={{marginTop:"25px"}}>Ulangi</Button>
                                            </div>
                                            <div>
                                                <Button onClick={handleSendMasuk} style={{marginTop:"25px"}}>Kirim</Button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </>
        )
    }
    if (takePulang) {
        return(
            <>
                <Card>
                    <CardBody>
                        <Row>
                            <Col xs="12">
                                <h3>Absen Pulang</h3>
                            </Col>
                            <Col xs="12">
                                {!img ? <Webcam audio={false} ref={webCamRef} screenshotFormat="image/jpeg" width="100%"  /> : null}
                            </Col>
                            <Col xs="12">
                                <img src={img} className="img-fluid" />
                            </Col>
                            <Col xs="12">
                                {!img ? <Button onClick={handleCapture}>Capture</Button> : (
                                    <>
                                        <div className="form-inline">
                                            <div className="mr-1">
                                                <Button onClick={() => setImg(null)} style={{marginTop:"25px"}}>Ulangi</Button>
                                            </div>
                                            <div>
                                                <Button onClick={handleSendPulang} style={{marginTop:"25px"}}>Kirim</Button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </>
        )
    }

    return(
        <>
            <Card>
                <CardBody>
                    <div className="text-center">
                        <Alert style={{display:`${tampilan4}`}}>Anda Sudah Absen Datang !</Alert>
                        <Button color="primary" style={{display:`${tampilan1}`}} onClick={() => setTakeMasuk(true)}>Absen Datang</Button>
                        <Button color="primary" style={{display:`${tampilan2}`}} onClick={() => setTakePulang(true)}>Absen Pulang</Button>
                        <Alert color="warning" style={{display:`${tampilan3}`}}>Hari ini libur</Alert>
                        <i style={{position:'absolute',color:'grey',bottom:0,left:0,fontSize:'12px',paddingBottom:'2px',paddingLeft:'2px',display:`${tampilan5}`}}>*Catatan : Tunggu Sampai Waktu Pulang Untuk Absen Pulang</i>
                    </div>
                </CardBody>
            </Card>
        </>
    )
}

export default CardAbsen
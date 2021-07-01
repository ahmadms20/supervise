import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import back from "./img/bc.jpg"
import hero from "./img/loghero.jpg"
import back2 from "./img/back.png"
import Card from '@material-ui/core/Card';
import ScrollAnimation from 'react-animate-on-scroll';
import logo2 from './img/Logo.png'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "animate.css/animate.min.css";
import axios from 'axios';
import url from './Domain.json';
import Swal from 'sweetalert2'

function Login(props) {
    const[nip, setNip]              = useState('')
    const[password, setPassword]    = useState('')
    const[items, setItems]          = useState([])
    
    useEffect(()=>{
        const token = localStorage.getItem('token')

        if(token !== null){
            axios.get(url.api+'/api/tokenChecker',{ 
                headers: {
                    'Authorization' : `token=${token}`
                } 
        }).then(res=>{
            if(res.data.tipe_data == 'pegawai'){
                window.location.href = "/dashboard-karyawan"
            }else if(res.data.tipe_data == 'admin'){
                window.location.href = "/dashboard-admin"
            }else if(res.data.tipe_data == 'superadmin'){
                window.location.href = "/dashboard-superadmin"
            }
        }).catch(err => {
            return null
        })
        }else{
            return null
        }
    })

    const login = e => {
        e.preventDefault()
        const data ={
            nip: nip,
            password: password
        }
        
        axios.post(url.api+"/api/login",data)
        .then( res => {
            if(data){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Username atau Password salah',
                  })
            }
            if (res.data.login === true) {
            localStorage.clear()

            localStorage.setItem('token',res.data.token)
                
                if(res.data.level == "pegawai"){

                    Swal.fire({
                        icon:'success',
                        text:'Sukses',
                        title:'Anda Berhasil Login',
                    }).then((result)=>{
                        if(result.isConfirmed)
                        window.location.href="/dashboard-karyawan"
                    })

                }else if(res.data.level == "admin"){

                    Swal.fire({
                        icon:'success',
                        text:'Sukses',
                        title:'Anda Berhasil Login',
                    }).then((result)=>{
                        if(result.isConfirmed)
                        window.location.href="/dashboard-admin"
                    })

                }else if(res.data.level == "superadmin"){

                    Swal.fire({
                        icon:'success',
                        text:'Sukses',
                        title:'Anda Berhasil Login',
                    }).then((result)=>{
                        if(result.isConfirmed)
                        window.location.href="/dashboard-superadmin"
                    })
                    
                }

            } 
        }).catch(err=>{
            Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Username atau Password harus diisi',
                      })
        })
     }

     const infoPassword = () => {
        Swal.fire({
            icon:'info',
            text:'Silahkan hubungi admin',
            title:'Lupa password?',
        })
     }

    return(
        <ScrollAnimation animateIn="fadeIn" duration={2}>
        <Grid style={{height:'100vh',width:'100%',backgroundImage:`url(${back})`}} container justify="center" alignItems="center">
            <Grid style={{height:'550px',width:"850px"}} container justify="center" alignItems="center">
                <Grid xs={12} sm={5} md={5} lg={5} style={{height:'100%'}} container>
                    <Card style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Grid style={{width:'85%',height:'90%'}} container direction="column">
                            <Grid style={{height:'150px'}} container direction="column" justify="center" alignItems="center">
                                <img style={{height:'60px',width:"60px"}} src={logo2}></img>
                                <Typography style={{marginTop:'10px',fontSize:'2rem',color:'#2E40A4'}}>SUPERVISE</Typography>
                            </Grid>
                            <form onSubmit={login}>
                            <Grid style={{height:'170px'}} container alignItems="center">
                                <TextField value={nip} onChange={e => setNip(e.target.value)} style={{width:'100%'}} id="filled-basic" label="Username" variant="filled" size="small" />
                                <TextField value={password} onChange={e => setPassword(e.target.value)} style={{width:'100%'}} id="filled-basic" label="Password" variant="filled" size="small" type="password" />
                            </Grid>
                            <Grid style={{height:'103px'}} container justify="center" alignItems="center">
                                <Button id="button" type="Submit" style={{width:'80%',backgroundColor:'#4656E1',color:'white',borderRadius:"20px"}}>LOGIN</Button>
                                <a onClick={infoPassword}><p style={{color:"blue"}}>Lupa password?</p></a>
                            </Grid>
                                </form>
                        </Grid>
                    </Card>
                </Grid>
                <Grid xs={12} sm={7} md={7} lg={7} style={{height:'100%',backgroundImage:`url(${hero})`,backgroundSize:'cover'}} container justify="flex-end">
                        <a style={{width:'23px',height:'20px',marginRight:'15px'}} href="/"><img id='back' src={back2}></img></a>
                </Grid>
            </Grid>
        </Grid>
        </ScrollAnimation>
    )
}

export default Login;
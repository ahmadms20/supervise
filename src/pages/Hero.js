import React from 'react'
import styled from 'styled-components'
import HeroIllustration from '../img/illustration01.svg'

const HeroContainer = styled.div`
height:100vh;
max-height:1100px;
position:relative;
display:flex;
justify-content:center;
align-items:center;
margin-bottom:10rem;
`

const HeroWrapper = styled.div`
height:100%;
width:100%;
overflow:hidden;
display:grid;
grid-template-columns:auto auto;

@media screen and (max-width:768px){
    display:flex;
    justify-content:center;
    align-items:center;
}
`

const ColumnLeft = styled.div`
position:relative;
top:30px;
transition:0.3s;

@media screen and (max-width:768px){
    height:100%;
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-left:-100px;
}
`
const ColumnRight = styled.div`
position: relative;
width: 755.5px;
height: 592.52px;
right: -40px;
top: 90px;

@media screen and (max-width:1400px){
    width:692px;
    height:586px;
    position:relative;
    top:100px;
    right:10px;
}

@media screen and (max-width:1100px){
    display:none;
}

img{
    width:762px;
    height:656px;
    transition:0.3s;
@media screen and (max-width:1400px){
    width:692px;
    height:586px;
    position:absolute;
}
}
`

const HeroContent = styled.div`
position:relative;
z-index:10;
display:flex;
flex-direction:column;
max-width:600px;
height:100%;
width:100%;
margin-left:70px;
justify-content:center;

@media screen and (max-width:768px){
    position:absolute;
    margin-left:-200;
}

h7{
    margin-bottom:-4rem;
    font-family: 'Fira Sans', sans-serif;
    font-weight: 300;
    font-size:1.5rem;
    text-align: left;
    transition:0.3s;
    margin-top:-320px;

    @media screen and (max-width:768px){
    font-size:1.2rem;
    margin-bottom:-4rem;
    margin-top:-250px;
    }
}

h1{
    font-size:6rem;
    font-weight:700;
    text-transform:uppercase;
    font-family: 'Fira Sans', sans-serif;
    text-align: left;
    margin-bottom:-1rem;
    position:relatve;

    @media screen and (max-width:768px){
        font-size:4.2rem;
        margin-bottom:-10px;
    }
}
p{
    font-family: 'Merriweather', serif;
    font-weight:300;
    color:grey;
    font-size:18px;

    @media screen and (max-width:768px){
        font-size:16px;
    }
}




`

const Hero = () => {
    return (
        <HeroContainer id='homes'>
            <HeroWrapper>
                <ColumnLeft>
                    <HeroContent id='heroContent'>
                        <h7 style={{position:'absolute'}}>WORK FROM HOME</h7>
                        <h1>SOLUTION</h1>
                        <p> 
                        Aplikasi ini akan menjadi solusi untuk anda yang masih bekerja disaat pandemi seperti saat ini , atau bisa disebut juga dengan remote (bekerja dari jauh / rumah )
                        aplikasi ini akan sangat memudahkan bagi para pekerja maupun pengawas karyawan , karena didalam nya telah terdapat fitur - fitur yang akan membantu pekerjaan mereka menjadi lebih mudah
                        </p>
                    </HeroContent>
                </ColumnLeft>
                <ColumnRight>
                    <img alt="img" src={HeroIllustration}></img>
                </ColumnRight>
            </HeroWrapper>
        </HeroContainer>
    )
}

export default Hero

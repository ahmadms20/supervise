import React from 'react'
import styled from 'styled-components'
import AboutIllustration from '../img/illustration02.svg'

const AboutContainer = styled.div`
height:100vh;
width:100%;
margin-bottom:10rem;
`

const AboutWrapper = styled.div`
height:100%;
width:100%;
display:grid;
grid-template-columns:45% auto;
overflow:hidden;

@media screen and (max-width:1100px){
    display:flex;
    flex-direction:column;
}
`

const ColumnLeft = styled.div`
display:flex;
justify-content:center;
align-items:center;

img{
    height:668px;
    width:668px;

@media screen and (max-width:1100px){
    width:100%;
    height:100%;
}
}
`
const ColumnRight = styled.div`
display:flex;
justify-content:center;
align-items:flex-start;
flex-direction:column;

h1{
    font-size:4rem;
    line-height:1;
    font-family: Fira Sans;
    font-style: normal;
    font-weight: bold;

    @media screen and (max-width:1100px){
        font-size:2.5rem;
        margin-left:20px;
    }
}

p{
    font-family: Merriweather;
    font-style: normal;
    font-weight: 300;
    font-size:1.5rem;
    color:grey;

    @media screen and (max-width:1100px){
        font-size:1rem;
        margin-left:20px;
    }
}
`

const AboutSection = () => {
    return (
        <AboutContainer id='about'>
            <AboutWrapper>
                <ColumnLeft>
                    <img src={AboutIllustration} />
                </ColumnLeft>
                <ColumnRight>
                    <h1>
                        Kita Akan <br /> Mengatur Karyawan Anda!
                    </h1>
                    <p>
                    Supervise pasti akan mengatur aktivitas karyawan Anda selama BEKERJA DARI RUMAH, mereka tidak perlu pergi ke kantor setiap hari untuk melaporkan tugas yang mereka buat saat itu, cukup unggah di sini dan otomatis kirim ke Supervisor
                    </p>
                </ColumnRight>
            </AboutWrapper>
        </AboutContainer>
    )
}

export default AboutSection

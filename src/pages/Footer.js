import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const FooterContainer = styled.div`
height:100%;
width:100%;
background:#178DFF;
padding-top:20px;
`

const FooterWrapper = styled.div`
height:100%;
width:100%;
display:grid;
grid-template-columns:30% auto auto auto auto auto;

@media screen and (max-width:768px){
    display:flex;
    flex-wrap:wrap;
}
`

const CopyrightContainer = styled.div`
width:100%;
height:20%;
background:#0578E7;
`

const CopyrightWrapper = styled.div`
height:100%;
width:100%;
display:flex;
justify-content:center;
align-items:center;

p{
    color:#fff;
}
`

const TitleColumn = styled.div`
display:flex;
justify-content:center;

h1{
    color:#fff;
}

@media screen and (max-width:768px){
    width:100%;
}
`
const ExploreColumn = styled.div`
text-align:left;

h3{
    color:#fff
}
p{
    color:#fff;
}

@media screen and (max-width:768px){
    margin-left:20px;
    width:45%;
}
`
const VisitColumn = styled.div`

h3{
    color:#fff
}
p{
    color:#fff;
}

@media screen and (max-width:768px){
    width:45%;
}
`
const FollowColumn = styled.div`

h3{
    color:#fff
}
p{
    color:#fff;
}
@media screen and (max-width:768px){
    margin-left:20px;
    width:45%;
}
`
const LegalColumn = styled.div`

h3{
    color:#fff
}
p{
    color:#fff;
}
@media screen and (max-width:768px){
    width:45%;
}
`
const EmailColumn = styled.div`

h3{
    color:#fff
}
p{
    color:#fff;
}
@media screen and (max-width:768px){
    padding-left:20px;
    width:45%;
}
`

const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrapper>
                <TitleColumn>
                    <h1>SUPERVISE</h1>
                </TitleColumn>
                <ExploreColumn>
                    <h3>Jelajahi</h3>
                    <p>Halaman Awal</p>
                    <p>Tentang</p>
                    <p>Fitur</p>
                </ExploreColumn>
                <VisitColumn>
                    <h3>Kunjungi Kami !</h3>
                    <p>Sumber Sari , Bandung</p>
                    <p>34 Tesla , Site 8</p>
                    <p>Jawa Barat , Indonesia , 40222</p>
                </VisitColumn>
                <FollowColumn>
                    <h3>Ikuti Kami !</h3>
                    <p>Instagram</p>
                    <p>Twitter</p>
                    <p>Facebook</p>
                </FollowColumn>
                <LegalColumn>
                    <h3>Legal</h3>
                    <p>Hukum</p>
                    <p>Privasi</p>
                    <p> </p>
                </LegalColumn>
                <EmailColumn>
                    <h3>Surel</h3>
                    <p>supervise@gmail.com</p>
                </EmailColumn>
            </FooterWrapper>
            <CopyrightContainer>
                <CopyrightWrapper>
                    <p>copyright@2021 - Supervise</p>
                </CopyrightWrapper>
            </CopyrightContainer>
        </FooterContainer>
    )
}

export default Footer

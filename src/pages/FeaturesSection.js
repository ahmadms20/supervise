import React from 'react'
import styled from 'styled-components'
import { Button } from '../components/Button'
import { Icon } from '@iconify/react';
import playIcon from '@iconify/icons-mdi-light/play';
import checkmarkDone from '@iconify/icons-ion/checkmark-done';
import calendarOutline from '@iconify/icons-ion/calendar-outline';
import briefcaseOutline from '@iconify/icons-ion/briefcase-outline';

const FeaturesContainer = styled.div`
height:100vh;
width:100%;
background:#FFE0B0;

@media screen and (max-width:768px){
    height:100%;
    padding:40px 0px;
}
`
const FeaturesWrapper = styled.div`
height:100%;
width:100%;
display:grid;
grid-template-columns:45% auto;
overflow:hidden;

@media screen and (max-width:768px){
    display:flex;
    flex-direction:column;
}
`

const ColumnLeft = styled.div`
display:flex;
justify-content:center;
flex-direction:column;
padding-left:50px;

h1{
    font-size:4rem;
    font-family: Fira Sans;
    margin-bottom:-1rem;
}

p{
    font-family: Merriweather;
    font-style: normal;
    font-weight: 300;
    color:grey;
    font-size:1.5rem;
}

@media screen and (max-width:768px){
    h1{
        font-size:2.5rem;
        margin-bottom:40px;
    }
    .btn-1{
        display:none;
    }
    p{
        display:none;
    }
}
`
const ColumnRight = styled.div`
display:flex;
justify-content:center;
align-items:center;

@media screen and (max-width:768px){
    flex-wrap:wrap;
}
`

const ItemOne = styled.div`
height:90%;
width:30%;
display:flex;
flex-direction:column;
justify-content:space-evenly;
align-items:center;

@media screen and (max-width:768px){
    width:70%;
}
`
const ItemTwo = styled.div`
height:90%;
width:30%;
display:flex;
justify-content:center;
align-items:center;
margin-left:5px;

@media screen and (max-width:768px){
    width:70%;
}
`

const CardOne = styled.div`
width:90%;
height:45%;
border-radius:15px;
background:#fff;
display:flex;
flex-direction:column;
justify-content:space-evenly;
padding:10px;

h2{
    position:relative;
    top:30px;
}

@media screen and (max-width:768px){
    height:350px;
    margin-bottom:20px;
}
`
const CardTwo = styled.div`
width:90%;
height:45%;
border-radius:15px;
background:#fff;
display:flex;
flex-direction:column;
justify-content:space-evenly;
padding:10px;

h2{
    position:relative;
    top:30px;
}

@media screen and (max-width:768px){
    height:350px;
    margin-bottom:20px;
}
`
const CardThree = styled.div`
width:90%;
height:45%;
border-radius:15px;
background:#fff;
display:flex;
flex-direction:column;
justify-content:space-evenly;
padding:10px;

h2{
    position:relative;
    top:30px;
}

@media screen and (max-width:768px){
    height:350px;
    margin-bottom:20px;
}
`

const FeaturesSection = () => {
    return (
        <FeaturesContainer id='features'>
            <FeaturesWrapper>
                <ColumnLeft>
                    <h1 style={{marginBottom:10}}>
                        Apa saja fitur kita?
                    </h1>
                    <p>
                    Kita memiliki 3 fitur utama yaitu <br /> Kehadiran , Kegiatan , dan Jadwal
                    </p>
                    <Button className='btn-1' to='/login' primary='true'>
                        MULAI SEKARANG ! <Icon icon={playIcon} style={{color: '#ffffff', fontSize: '24px'}} />
                    </Button>
                </ColumnLeft>
                <ColumnRight>
                    <ItemOne>
                        <CardOne>
                            <Icon icon={checkmarkDone} style={{color: '#dc77ff', fontSize: '80px'}} />
                            <h2 style={{marginBottom:20}} >Kehadiran</h2>
                            <p>Fungsi dari fitur kehadiran adalah untuk melihat apakah karyawan tertentu hadir atau tidak</p>
                        </CardOne>
                        <CardTwo>
                            <Icon icon={calendarOutline} style={{color: '#178dff', fontSize: '80px'}} />
                            <h2 style={{marginBottom:20}}>Jadwal</h2>
                            <p>Fungsi dari fitur ini adalah supaya para karyawan tahu jadwal sehari - hari mereka</p>
                        </CardTwo>
                    </ItemOne>
                    <ItemTwo>
                        <CardThree>
                            <Icon icon={briefcaseOutline} style={{color: '#ffbd59', fontSize: '80px'}}/>
                            <h2 style={{marginBottom:30}} >Kegiatan</h2>
                            <p>Fungsi dari fitur kegiatan adalah agar bisa tahu hal apa saja yang dikerjakan oleh karyawan selama waktu bekerja</p>
                        </CardThree>
                    </ItemTwo>
                </ColumnRight>
            </FeaturesWrapper>
        </FeaturesContainer>
    )
}

export default FeaturesSection

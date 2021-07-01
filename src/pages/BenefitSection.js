import React from 'react'
import styled from 'styled-components'
import { Icon, InlineIcon } from '@iconify/react';
import unfoldMoreVertical from '@iconify/icons-mdi-light/unfold-more-vertical';
import alarmIcon from '@iconify/icons-mdi-light/alarm';
import currencyUsd from '@iconify/icons-mdi-light/currency-usd';

const BenefitContainer = styled.div`
height:100%;
width:100%;
margin-bottom:10rem;
`

const BenefitWrapper = styled.div`
height:100%;
width:100%;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
overflow:hidden;
`

const ColumnOne = styled.div`
margin-bottom:2rem;
`
const ColumnTwo = styled.div`
height:100%;
width:100%;
display:flex;
align-items:center;
justify-content:space-evenly;
flex-wrap:wrap;
`
const Box1 = styled.div`
width:364px;
height:374px;
background:#FFBD59;
transition:1s;
display:flex;
justify-content:center;
align-items:center;
margin-bottom:10px;


h1{
    position:absolute;
    color:#fff
}

div{
    opacity:1;
    background:#FFBD59;
    height:100%;
    width:100%;
    position:relative;
    top:0;
    left:0;
    z-index:1;
    transition:1s;
    display:flex;
    align-items:center;
    justify-content:center;
}

&:hover{
    div{
        opacity:0;
        z-index:-1;
    }
}
`

const Box2 = styled.div`
width:364px;
height:374px;
background:#21E758;
display:flex;
justify-content:center;
align-items:center;
margin-bottom:10px;

h1{
    position:absolute;
    color:#fff;
}

div{
    opacity:1;
    background:#21E758;
    height:100%;
    width:100%;
    position:relative;
    top:0;
    left:0;
    z-index:1;
    transition:1s;
    display:flex;
    align-items:center;
    justify-content:center;
}

&:hover{
    div{
        opacity:0;
        z-index:-1;
    }
}
`
const Box3 = styled.div`
width:364px;
height:374px;
background:#178DFF;
display:flex;
justify-content:center;
align-items:center;
margin-bottom:10px;

h1{
    position:absolute;
    color:#fff
}

div{
    opacity:1;
    background:#178DFF;
    height:100%;
    width:100%;
    position:relative;
    top:0;
    left:0;
    z-index:1;
    transition:1s;
    display:flex;
    align-items:center;
    justify-content:center;
}

&:hover{
    div{
        opacity:0;
        z-index:-1;
    }
}
`

const BenefitSection = () => {
    return (
        <BenefitContainer>
            <BenefitWrapper>
                <ColumnOne>
                    <h1>Kenapa Memilih Kita?</h1>
                </ColumnOne>
                <ColumnTwo>
                    <Box1>
                        <h1>desain simpel</h1>
                        <div>
                            <Icon icon={unfoldMoreVertical} style={{color: '#ffffff', fontSize: '300px'}} />
                        </div>
                    </Box1>
                    <Box2>
                        <h1>terjangkau</h1>
                        <div>
                            <Icon icon={currencyUsd} style={{color: '#ffffff', fontSize: '300px'}} />
                        </div>
                    </Box2>
                    <Box3>
                        <h1>hemat waktu</h1>
                        <div>
                        <Icon icon={alarmIcon} style={{color: '#ffffff', fontSize: '300px'}} />
                        </div>
                    </Box3>
                </ColumnTwo>
            </BenefitWrapper>
        </BenefitContainer>
    )
}

export default BenefitSection

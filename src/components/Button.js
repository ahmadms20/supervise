import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const Button = styled(Link)`
color:#fff;
background: ${({ primary }) => (primary ? '#178DFF' : '#21E758') };
white-space: nowrap;
outline:none;
border:none;
min-width:100px;
max-width:200px;
cursor:pointer;
text-decoration:none;
transition:0.3s;
display:flex;
justify-content:center;
align-items:center;
padding: ${({ big }) => (big ? '16px 40px' : '14px 24px') };
color : ${({ primary }) => (primary ? '#fff' : '#fff') };
font-size: ${({ big }) => (big ? '20px' : '14px') };

&:hover{
    transform : translateY(-2px)
}
`
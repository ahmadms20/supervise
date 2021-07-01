import React ,{useState,useEffect} from 'react'
import styled,{css} from 'styled-components/macro'
import {Link} from 'react-router-dom'
import { Button } from './Button'
import {menuData} from '../data/menuData'
import Shape1 from '../img/shape02.png'
import {FaBars} from 'react-icons/fa'
import {Link as LinkScroll} from 'react-scroll'

const Nav = styled.nav`
width:100%;
display:flex;
justify-content:space-between;
padding:1rem 2rem;
z-index:100;
position:fixed; 
transition:0.3s;

@media screen and (max-width:768px){
height:30px;
width:100%;
position:fixed;
}
`
const NavLink = css`
display:flex;
align-items:center;
padding:0 1rem;
height:100%;
cursor:pointer;
text-decoration:none;
`

const Logo = styled(Link)`
${NavLink}
color:#fff;
font-style:italic;
font-weight:bold;
font-size:1.5rem;
`
const NavMenu = styled.div`
display:flex;
align-items:center;
margin-right:-508px;

@media screen and (max-width : 1100px){
    margin-right:-208px;   
}
@media screen and (max-width : 768px){
    display:none
}
`
const NavBtn = styled.div`
display:flex;
align-items:center;
margin-right:70px;

@media screen and (max-width : 768px){
    display:none
}
`

const NavMenuLink = styled(Link)`
${NavLink};
color:${({ primary }) => (primary ? '#000d1a' : '#fff') };
transition:0.3s;

&:hover{
    color:#178DFF;
    transform:scale(1.1)
}
`

const Shape = styled.div`
position: absolute;
width: 492px;
height: 235.4px;
left: -20px;
top: -90px;
z-index:-1;

@media screen and (max-width : 768px){
    top:-150px;
    overflow:hidden;
    width: 392px;
    left:-80px;
}
`

const MenuBars = styled(FaBars)`
display:none;

@media screen and (max-width:768px){
    display:block;
    height:40px;
    width:40px;
    cursor:pointer;
    position:absolute;
    top:0;
    right:0;
    transform:translate(-50%,25%);
    color:#178DFF;
    margin-right:60px
}

`

const Navbar = ({toogle}) => {

    let listener = null
    const [navColor, setNavColor] = useState("none")
    const [linkColor, setLinkColor] = useState(true)

useEffect(() => {
  listener = document.addEventListener("scroll", e => {
    var scrolled = document.scrollingElement.scrollTop
    if (scrolled >= 120) {
      setNavColor('#FFBD59')
      setLinkColor(false)
    } else {
      setNavColor('none')
      setLinkColor(true)
    }
  })
}
,)


    return (
        <>
            <Shape>
                <img src={Shape1}></img>
            </Shape>
        <Nav id='navbarContainer' style={{background:`${(navColor)}`,paddingTop:'40px',paddingBottom:'40px'}}>
            <Logo>SUPERVISE</Logo>
            <MenuBars onClick={toogle} style={{position:'absolute',transform:'translateY(20px)'}} />
            <NavMenu>
                {menuData.map((item,index)=> (
                    <NavMenuLink primary={linkColor} key={index}><LinkScroll to={item.link} spy={true} smooth={true}>{item.title}</LinkScroll></NavMenuLink>
                    ))
                    }
            </NavMenu>
            <NavBtn>
                <Button primary='true' to='/login'>Login</Button>
            </NavBtn>
        </Nav>
        </>
    )
}

export default Navbar

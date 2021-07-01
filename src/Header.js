import React from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import logo2 from './img/Logo-2-font.png'
import {Link} from 'react-scroll'

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.listener = null;
        this.state = {
            status: "top"
        };
    }

    componentDidMount() {
        this.listener = document.addEventListener("scroll", e => {
            var scrolled = document.scrollingElement.scrollTop;
            if (scrolled >= 100) {
                if (this.state.status !== "amir") {
                    this.setState({ status: "amir" });
                }
            } else {
                if (this.state.status !== "top") {
                    this.setState({ status: "top" });
                }
            }
        });
    }

    componentDidUpdate() {
        document.removeEventListener("scroll", this.listener);
    }

    render() {
        return (
            <>
                <Grid style={{ backgroundColor: this.state.status === "top" ? "rgba(0,0,0,0)" : "#FFFFFF", transition: 'ease all 0.5s', position: 'relative', zIndex: 99, width: '100%', height: '9vh', position: 'fixed' }} container justify="center" alignItems='center'>
                    <Grid style={{ display: 'flex', flexWrap: 'nowrap',width:'90%' }}container>
                        <Grid style={{height: '8vh'}} sm={7} container alignItems='center'>
                            <img src={logo2} ></img>
                        </Grid>
                        <Grid style={{height: '8vh'}} sm={5} container alignItems='center' justify="space-around">
                            <Link activeClass="active" to="home" spy={true} smooth={true}><Typography id='likk' style={{fontSize:'1.2rem'}}>Home</Typography></Link>
                            <Link to="penjelasan" spy={true} smooth={true}><Typography id='likk' style={{fontSize:'1.2rem'}}>Penjelasan</Typography></Link>
                            <Link to="alur" spy={true} smooth={true}><Typography id='likk' style={{fontSize:'1.2rem'}}>Alur</Typography></Link>
                            <Link to="teknologi" spy={true} smooth={true}><Typography id='likk' style={{fontSize:'1.2rem'}}>Teknologi</Typography></Link>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    }
}
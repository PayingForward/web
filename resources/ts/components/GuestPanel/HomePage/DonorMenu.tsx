import * as React from 'react';
import Slider, { Settings } from 'react-slick';
import { ThunkDispatch } from "redux-thunk";
import {connect} from 'react-redux';

import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

import {avatar} from '../../../helpers';
import {CompleteChildInformations} from '../../../store/mainTypes';
import {DonorMenuState} from '../../../store/DonorMenu/types';
import {AppState} from '../../../rootReducer';
import {fetchInformations} from '../../../store/DonorMenu/actions'


const styler = withStyles(theme=>({
    slide: {
        textAlign: "center",
        margin: "auto",
        position:'relative'
    },
    slideAvatar: {
        width: 100,
        height: 100,
        margin: "auto"
    },
    marginTop: {
        marginTop: 68
    },
    countryFlag:{
        position: 'absolute',
        top:2,
        left:0,
        paddingLeft:'50%',
        marginLeft:-50
    },
    donateButton:{
        color:"#fff",
        border: 'solid 2px #fff'
    },
    title: {
        paddingTop: 24
    }
}))

const sliderSettings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    responsive:[
        {
            breakpoint:900,
            settings:{
                slidesToShow:3
            }
        },
        {
            breakpoint:600,
            settings:{
                slidesToShow:2
            }
        }
    ]
};

const mapStateToProps = (state:AppState)=>({
    ...state.donorMenu
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>)=>({
    onLoad: ()=>dispatch(fetchInformations())
})

interface Props extends DonorMenuState {
    classes:{
        slide:string;
        slideAvatar:string;
        marginTop:string;
        countryFlag:string;
        donateButton:string;
        title:string;
    },
    onLoad: ()=>void
}

class DonorMenu extends React.Component<Props> {

    constructor(props:Props){
        super(props);

        props.onLoad();
    }

    handleChildDonateClick(child:CompleteChildInformations){
        return (e:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
            console.log(child);
        }
    }


    public renderSliderItems() {
        const { childs, classes } = this.props;

        return childs.map((child, key) => (
            <div className={classes.slide} key={key}>
                <Avatar
                    src={avatar(200, child.avatar)}
                    className={classes.slideAvatar}
                />
                <Divider />
                <Typography color="textPrimary" align="center" variant="h6">
                    {child.name}
                </Typography>
                <span className={classes.countryFlag}>
                    <img width="24px"  src={"https://www.countryflags.io/"+(child.country?child.country.code.toLowerCase():'us')+"/shiny/64.png"} />
                </span>
                <Button
                    variant="outlined"
                    className={classes.donateButton}
                    onClick={this.handleChildDonateClick(child)}
                >
                    Donate
                </Button>
            </div>
        ));
    }


    public render(){

        const {classes} = this.props;

        return (
            <div className={classes.marginTop} >
                <Slider {...sliderSettings}>
                    {this.renderSliderItems()}
                </Slider>
                <Typography color="textPrimary" className={classes.title} variant="h4" >
                    These childs want your help...
                </Typography>
                <Divider/>

            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (styler (DonorMenu));
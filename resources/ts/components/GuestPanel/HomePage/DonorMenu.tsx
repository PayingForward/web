import * as React from 'react';
import Slider, { Settings } from 'react-slick';

import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

import {avatar} from '../../../helpers';
import {CompleteUserInformations} from '../../../store/mainTypes';
import {DonorMenuState} from '../../../store/DonorMenu/types';


const styler = withStyles(theme=>({
    slide: {
        textAlign: "center",
        margin: "auto"
    },
    slideAvatar: {
        width: 100,
        height: 100,
        margin: "auto"
    },
}))

const sliderSettings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true
};

interface Props extends DonorMenuState {
    classes:{
        slide:string;
        slideAvatar:string;
    },

}

class DonorMenu extends React.Component<Props> {

    handleChildDonateClick(child:CompleteUserInformations){
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

                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={this.handleChildDonateClick(child)}
                >
                    Donate
                </Button>
            </div>
        ));
    }


    public render(){
        return (
            <div>
                <Slider {...sliderSettings}>
                    {this.renderSliderItems()}
                </Slider>
            </div>
        )
    }
}

export default styler (DonorMenu);
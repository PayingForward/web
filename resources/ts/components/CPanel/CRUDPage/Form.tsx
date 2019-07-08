import * as React from 'react';
import { Modal, Typography, Divider, Grid } from '@material-ui/core';

interface Props {
    open:boolean,
    values:{
        [x:string] :any
    },
    title:string
}

class Form extends React.Component<Props> {

    
    public render(){
        const {open,title} = this.props;

        return (
            <Modal open={open}>
                <form>
                    <Typography variant="h6" align="center">{title}</Typography>
                    <Divider/>
                    <Grid container>
                        
                    </Grid>
                </form>
            </Modal>
        )
    }
}

export default Form;
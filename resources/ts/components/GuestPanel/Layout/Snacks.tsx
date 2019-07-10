import Button from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import withStyles from "@material-ui/core/styles/withStyles";
import CloseIcon from "@material-ui/icons/Close";
import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../rootReducer';
import { closeSnack } from '../../../store/SnackController/actions';
import { SnackState, Snack } from '../../../store/SnackController/types';

const styles = withStyles(theme => ({
	close: {
		padding: theme.spacing(0.5),
		position: "absolute",
		right:0,
		top:0,
	},
	error:{
		color:red[500]
	},
	info:{
		color:theme.palette.common.white
	},
	snack: {
		maxWidth: theme.spacing(50),
	},
	success:{
		color: green[500]
	},
}));


const mapStateToProps = (state: AppState) => ({
	...state.snackController
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
	onCloseSnack:(snack:Snack)=>dispatch(closeSnack(snack))
});

interface IProps extends SnackState {
	classes:{
		close:string,
		error:string,
		info:string,
		snack:string
		success:string,
	},
	onCloseSnack:(snack:Snack)=>void
}

class Snacks extends React.Component<IProps> {

	public render() {
		return (
			<div>
				{this.renderSnacks()}
			</div>
		);
	}

	protected renderSnacks() {
		const { snacks, classes } = this.props;

		const sortedSnacks = snacks.sort((a, b) => a.time > b.time ? -1 : 1);

		return sortedSnacks.slice(0, 3).map((snack, index) => (
			<Snackbar
				className={ classes.snack}
				style={{bottom:this.getNextPosition(sortedSnacks,index)}}
				message={<span className={classes[snack.type]}>{snack.message}</span>}
				open={typeof snack.timeout === "undefined" ? snack.open : false}
				key={index}
				anchorOrigin={{
					horizontal: "right",
					vertical: "bottom",
				}}
				autoHideDuration={snack.time}
				action={[
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						className={classes.close}
						onClick={this.handleClose(snack)}
					>
						<CloseIcon />
					</IconButton>
					,
					this.renderConfirmButton(snack)
				]}
			/>
		));
	}

	protected renderConfirmButton(currentSnack:Snack){
		if(currentSnack.type!=="confirm"){
			return null;
		}

		return (
			<Button key="confirm" color="secondary" onClick={this.handleConfrim(currentSnack)}>Confirm</Button>
		);
	}

	protected getNextPosition(snacks:Snack[],index:number){

		let bottom = 32;

		snacks.slice(0,index).forEach(({open,message,type})=>{
			if(open){
				bottom += Math.ceil(message.length/46)*24;
				bottom +=42;
				if(type==="confirm"){
					bottom +=48;
				}
			}
		});

		return bottom;
	}

	protected handleClose(snack:Snack){
		const {onCloseSnack} = this.props;
		return (e:React.MouseEvent)=>{
            
            if(snack.onCancel){
                snack.onCancel();
            }

			onCloseSnack(snack);
		}
    }
    
    protected handleConfrim(snack:Snack){
        const {onCloseSnack} = this.props;

        return (e:React.MouseEvent)=>{
            if(snack.onConfirm){
                snack.onConfirm();
            }
			onCloseSnack(snack);
		}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(styles(Snacks));
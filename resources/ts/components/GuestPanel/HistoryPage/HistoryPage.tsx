import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TablePagination from "@material-ui/core/TablePagination";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import withStyles from '@material-ui/styles/withStyles';

import { HistoryPageState } from '../../../store/HistoryPage/types';
import MainLayout from '../Layout/MainLayout';
import { AppState } from '../../../rootReducer';
import { changeKeyword, changeSort, changePage, changePerPage, fetchResults } from '../../../store/HistoryPage/actions';
import { avatar } from '../../../helpers';
import { UserInformations } from '../../../store/AuthController/types';

const styler = withStyles(theme=>({
    paper:{
        margin:theme.spacing(4),
        padding:theme.spacing(4)
    },
    grow:{
        flexGrow:1
    },
    textSecondary:{
        color:theme.palette.secondary
    }
}))

interface Props extends HistoryPageState {
    classes:{
        paper:string,
        grow:string,
        textSecondary:string
    },
    onChangeKeyword:(keyword:string)=>void,
    onChangeSort:(sortBy:string,sortMode:string)=>void,
    onChangePage:(page:string|number)=>void,
    onChangePerPage:(perPage:string|number)=>void,
    onSearch:(keyword:string,sortBy:string,sortMode:string,page:string|number,perPage:string|number)=>void,
}

export const mapStateToProps = (state:AppState)=>({
    ...state.historyPage
})

export const mapDispatchToProps = (dispatch:ThunkDispatch<{},{},any>)=>({
    onChangeKeyword:(keyword:string)=>dispatch(changeKeyword(keyword)),
    onChangeSort:(sortBy:string,sortMode:string)=>dispatch(changeSort(sortBy,sortMode)),
    onChangePage:(page:string|number)=>dispatch(changePage(page)),
    onChangePerPage:(perPage:string|number)=>dispatch(changePerPage(perPage)),
    onSearch:(keyword:string,sortBy:string,sortMode:string,page:string|number,perPage:string|number)=>dispatch(fetchResults(keyword,sortBy,sortMode,page,perPage))
})

class HistoryPage extends React.Component<Props> {

    constructor(props:Props){
        super(props);

        this.props.onSearch("","dateTime",'desc',1,30);
        this.handleChangeSort = this.handleChangeSort.bind(this);
        this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangePerPage = this.handleChangePerPage.bind(this);
    }

    handleChangePage(e:React.MouseEvent<HTMLButtonElement>,page:number){
        this.props.onChangePage(page+1);

        this.handleSearch({page:page+1});
    }

    handleChangePerPage(e:React.ChangeEvent<HTMLInputElement>){
        this.props.onChangePerPage(e.target.value);

        this.handleSearch({perPage:e.target.value})
    }

    handleChangeSort(e:React.ChangeEvent<HTMLInputElement>){
        const sortValue = parseInt(e.target.value);

        const sortMode = sortValue%2==1?'desc':'asc';
        const sortBy = sortValue>2?'amount':'dateTime';

        this.handleSearch({sortMode,sortBy});
        this.props.onChangeSort(sortBy,sortMode);
        
    }

    handleChangeKeyword(e:React.ChangeEvent<HTMLInputElement>){
        this.props.onChangeKeyword(e.target.value);

        this.handleSearch({keyword:e.target.value});
    }

    handleSearch(newParams:{[x:string]:string|number}){
        const {sortBy,sortMode,page,perPage,keyword} = this.props;

        const newValues = {sortBy,sortMode,page,perPage,keyword,...newParams};

        this.props.onSearch(newValues.keyword,newValues.sortBy,newValues.sortMode,newValues.page,newValues.perPage);
    }

    renderMode(mode:string|number,child?:UserInformations){
        switch (parseInt(mode.toString())) {
            case 0:
                return child? child.name:"Deleted child";
            case 1:
                return "server maintainace";
            case 2:
                return "staff members";
            case 3:
                return "other childrens";
            default:
                return "other purposes";
        }
    }

    renderChildAvatar(child?:UserInformations){
        if(!child){
            return null;
        }

        return (
            <Avatar src={avatar(32,child.avatar)}/>
        );
    }

    renderResults(){
        const {results} = this.props;

        return results.map((record,key)=>(
            <ListItem key={key} dense divider >
                <ListItemAvatar >
                    <Avatar src={avatar(32,record.user.avatar)} />
                </ListItemAvatar>
                <ListItemText secondary={"At "+record.dateTime+" for "+this.renderMode(record.mode,record.child)} primaryTypographyProps={{color:"textSecondary"}} primary={record.user.name + " is donated "+record.amount+" USD."}/>
                {this.renderChildAvatar(record.child)}
            </ListItem>
        ))
    }

    render(){
        const {classes,sortBy,sortMode,count,perPage,page}= this.props;

        return (
            <MainLayout>
                <Grid justify="center" container>
                    <Grid item md={6}>
                        <Paper className={classes.paper} >
                            <Typography color="textSecondary" align="center" variant="h5" >Our Hearts</Typography>
                            <Divider/>
                            <Toolbar variant="dense">
                                <TextField
                                    label="Search by keyword"
                                    margin="dense"
                                    onChange={this.handleChangeKeyword}
                                />
                                <div className={classes.grow} />
                                <Select
                                    value={(sortMode=='desc'?1:2)+(sortBy=='dateTime'?0:2)}
                                    onChange={this.handleChangeSort}
                                >
                                    <MenuItem  value={1}><Typography color="textSecondary" >Latest</Typography></MenuItem>
                                    <MenuItem  value={2}><Typography color="textSecondary" >Oldest</Typography></MenuItem>
                                    <MenuItem  value={3}><Typography color="textSecondary" >Big Supports</Typography></MenuItem>
                                    <MenuItem  value={4}><Typography color="textSecondary" >Regular Supports</Typography></MenuItem>
                                </Select>
                            </Toolbar>
                            <Divider/>
                            <List dense>
                                {this.renderResults()}
                            </List>
                            <TablePagination
                                component="div"
                                onChangePage={this.handleChangePage}
                                count={parseInt(count.toString())}
                                rowsPerPage={parseInt(perPage.toString())}
                                page={parseInt(page.toString())-1}
                                onChangeRowsPerPage={this.handleChangePerPage}
                                color="textSecondary"
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </MainLayout>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)( styler (HistoryPage));
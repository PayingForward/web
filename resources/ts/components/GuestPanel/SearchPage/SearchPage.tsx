import * as React from "react";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/styles/withStyles";
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import Divider from "@material-ui/core/Divider";

import { SIDEBAR_WIDTH } from "../../../constants/config";
import MainLayout from "../Layout/MainLayout";
import Sidebar from "./Sidebar";
import IconTextField from "../Layout/IconTextField";
import { AppState } from "../../../rootReducer";
import { fetchOptions, fetchResults } from "../../../store/SearchPage/actions";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";

const styler = withStyles(theme => ({
    wrapper: {
        paddingLeft: SIDEBAR_WIDTH
    },
    center: {
        margin: "auto",
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8)
    }
}));

interface Props {
    classes: {
        wrapper: string;
        center: string;
    };
    onLoad: () => void;
}

const mapStateToProps = (state: AppState) => ({
    ...state.searchPage
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onLoad: () => {
        dispatch(fetchOptions("", "age_range"));
        dispatch(fetchOptions("", "town"));
        dispatch(fetchOptions("", "school"));
        dispatch(fetchResults(' ',{}));
    }
});

class SearchPage extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        props.onLoad();
    }

    public render() {
        const { classes } = this.props;

        return (
            <MainLayout>
                <Sidebar />
                <div className={classes.wrapper}>
                    <Grid container>
                        <Grid md={12} item>
                            <IconTextField
                                label="Search our childrens"
                                leftIcon={<PersonIcon />}
                                rightIcon={<SearchIcon />}
                                className={classes.center}
                            />
                            <Divider />
                        </Grid>
                    </Grid>
                </div>
            </MainLayout>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(styler(SearchPage));

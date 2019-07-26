import * as React from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";

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
import {
    fetchOptions,
    fetchResults,
    changeOption,
    changeKeyword
} from "../../../store/SearchPage/actions";
import { SearchPageState } from "../../../store/SearchPage/types";

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

interface Props extends SearchPageState {
    classes: {
        wrapper: string;
        center: string;
    };
    onLoad: () => void;
    onSearchOption: (keyword: string, optionId: string) => void;
    onCheckOption: (id: string | number, optionId: string) => void;
    onChangeKeyword: (keyword?: string | number) => void;
}

const mapStateToProps = (state: AppState) => ({
    ...state.searchPage
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onLoad: () => {
        dispatch(fetchOptions("", "age_range"));
        dispatch(fetchOptions("", "town"));
        dispatch(fetchOptions("", "school"));
        dispatch(fetchResults("", {}));
    },
    onSearchOption: (keyword: string, optionId: string) =>
        dispatch(fetchOptions(keyword, optionId)),
    onCheckOption: (id: string | number, optionId: string) =>
        dispatch(changeOption(optionId, id)),
    onChangeKeyword: (keyword?: string | number) =>
        dispatch(changeKeyword(keyword ? keyword.toString() : "")),
    // onFetchResults:(keyword?:string)
});

class SearchPage extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        props.onLoad();

        this.handleChangeAgeRange = this.handleChangeAgeRange.bind(this);
        this.handleChangeSchool = this.handleChangeSchool.bind(this);
        this.handleChangeTown = this.handleChangeTown.bind(this);

        this.handleCheckAgeRange = this.handleCheckAgeRange.bind(this);
        this.handleCheckSchool = this.handleCheckSchool.bind(this);
        this.handleCheckTown = this.handleCheckTown.bind(this);

        this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
    }

    handleChangeAgeRange(keyword: string) {
        const { onSearchOption } = this.props;

        onSearchOption(keyword, "age_range");
    }

    handleChangeTown(keyword: string) {
        const { onSearchOption } = this.props;

        onSearchOption(keyword, "town");
    }

    handleChangeSchool(keyword: string) {
        const { onSearchOption } = this.props;

        onSearchOption(keyword, "school");
    }

    handleCheckAgeRange(id: string | number) {
        const { onCheckOption } = this.props;

        onCheckOption(id, "age_range");
    }

    handleCheckTown(id: string | number) {
        const { onCheckOption } = this.props;

        onCheckOption(id, "town");
    }

    handleCheckSchool(id: string | number) {
        const { onCheckOption } = this.props;

        onCheckOption(id, "school");
    }

    handleChangeKeyword(value: string | number) {
        const { onChangeKeyword } = this.props;

        onChangeKeyword(value);
    }

    public render() {
        const {
            classes,
            loadedOptions,
            selectedOptions,
            searchKeyword
        } = this.props;

        return (
            <MainLayout>
                <Sidebar
                    options={loadedOptions}
                    selected={selectedOptions}
                    onSearch={{
                        school: this.handleChangeSchool,
                        age_range: this.handleChangeAgeRange,
                        town: this.handleChangeTown
                    }}
                    onChange={{}}
                />
                <div className={classes.wrapper}>
                    <Grid container>
                        <Grid md={12} item>
                            <IconTextField
                                label="Search our childrens"
                                leftIcon={<PersonIcon />}
                                rightIcon={<SearchIcon />}
                                className={classes.center}
                                onChange={this.handleChangeKeyword}
                                value={searchKeyword}
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

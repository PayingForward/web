import * as React from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/styles/withStyles";
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

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
import UserCard from "./UserCard";

const styler = withStyles(theme => ({
    wrapper: {
        paddingLeft: SIDEBAR_WIDTH
    },
    center: {
        margin: "auto",
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8)
    },
    textCenter: {
        textAlign: "center",
        padding: theme.spacing(4)
    }
}));

interface Props extends SearchPageState {
    classes: {
        wrapper: string;
        center: string;
        textCenter: string;
    };
    onLoad: () => void;
    onSearchOption: (keyword: string, optionId: string) => void;
    onCheckOption: (ids: (string | number)[], optionId: string) => void;
    onChangeKeyword: (keyword?: string | number) => void;
    onFetchResults: (
        keyword: string,
        options: { [x: string]: (string | number)[] },
        page?: number,
        perPage?: number,
        sortBy?: string,
        sortMode?: string
    ) => void;
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
    onCheckOption: (ids: (string | number)[], optionId: string) =>
        dispatch(changeOption(optionId, ids)),
    onChangeKeyword: (keyword?: string | number) =>
        dispatch(changeKeyword(keyword ? keyword.toString() : "")),
    onFetchResults: (
        keyword: string,
        options: { [x: string]: (string | number)[] },
        page?: number,
        perPage?: number,
        sortBy?: string,
        sortMode?: string
    ) =>
        dispatch(
            fetchResults(keyword, options, page, perPage, sortBy, sortMode)
        )
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

    afterCheck(id: string | number, type: string) {
        const { selectedOptions, onFetchResults, searchKeyword } = this.props;

        const options = selectedOptions[type] ? selectedOptions[type] : [];

        let modedOptions: (string | number)[] = options.filter(
            selectedId => selectedId != id
        );

        if (modedOptions.length == options.length) {
            modedOptions.push(id);
        }

        onFetchResults(searchKeyword, {
            ...selectedOptions,
            [type]: modedOptions
        });

        return modedOptions;
    }

    handleCheckAgeRange(id: string | number) {
        const { onCheckOption } = this.props;

        const selectedIds = this.afterCheck(id, "age_range");

        onCheckOption(selectedIds, "age_range");
    }

    handleCheckTown(id: string | number) {
        const { onCheckOption } = this.props;

        const selectedIds = this.afterCheck(id, "town");

        onCheckOption(selectedIds, "town");
    }

    handleCheckSchool(id: string | number) {
        const { onCheckOption } = this.props;

        const selectedIds = this.afterCheck(id, "school");

        onCheckOption(selectedIds, "school");
    }

    handleChangeKeyword(value: string | number) {
        const { onChangeKeyword, onFetchResults, selectedOptions } = this.props;

        onChangeKeyword(value);

        onFetchResults(value.toString(), selectedOptions);
    }

    renderUsers() {
        const { results } = this.props;

        return results.map((user, key) => <UserCard key={key} {...user} />);
    }

    renderInfo() {
        const { loading, results, classes } = this.props;

        if (!loading) {
            if (!results.length) {
                return (
                    <Grid className={classes.textCenter} item md={12}>
                        <Typography
                            align="center"
                            color="textSecondary"
                            variant="h5"
                        >
                            No results found..
                        </Typography>
                    </Grid>
                );
            }

            return null;
        }

        return (
            <Grid className={classes.textCenter} item md={12}>
                <CircularProgress />
            </Grid>
        );
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
                    onChange={{
                        school: this.handleCheckSchool,
                        age_range: this.handleCheckAgeRange,
                        town: this.handleCheckTown
                    }}
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
                        {this.renderInfo()}
                        {this.renderUsers()}
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
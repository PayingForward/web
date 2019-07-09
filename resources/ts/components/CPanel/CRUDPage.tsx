import * as React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Layout from "./Layout";
import { Typography, Divider, Toolbar, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import green from "@material-ui/core/colors/green";
import SearchIcon from "@material-ui/icons/Search";
import PlusIcon from "@material-ui/icons/Create";
import Form from "./CRUDPage/Form";
import { AppState } from "../../rootReducer";
import {
    CRUDPageState,
    CRUD_FORM_SEARCH,
    CRUD_FORM_CREATE
} from "../../store/Admin/CRUDPage/types";
import {
    fetchInfo,
    selectToSearch,
    clearForm,
    toggleSearchMode,
    selectToCreate
} from "../../store/Admin/CRUDPage/actions";
import { ThunkDispatch } from "redux-thunk";

const styler = withStyles(theme => ({
    grow: {
        flexGrow: 1
    },
    green: {
        background: green[400]
    },
    margin: {
        margin: theme.spacing(2)
    }
}));

const mapStateToProps = (state: AppState) => ({
    ...state.CRUDPage
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onChangeForm: (form: string) => dispatch(fetchInfo(form)),
    onSelectToSearch: () => dispatch(selectToSearch()),
    onSelectToCreate: () => dispatch(selectToCreate()),
    onClearForm: () => dispatch(clearForm()),
    onToggleSearchMode: () => dispatch(toggleSearchMode())
});

interface PathParamsType {
    form: string;
}

type Props = RouteComponentProps<PathParamsType> & {
    classes: {
        grow: string;
        green: string;
        margin: string;
    };
    onChangeForm: (form: string) => void;
    onSelectToSearch: () => void;
    onSelectToCreate: () => void;
    onClearForm: () => void;
    onToggleSearchMode: () => void;
} & CRUDPageState;

class CRUDPage extends React.Component<Props> {
    componentDidMount() {
        const { form } = this.props.match.params;
        const { onChangeForm } = this.props;

        onChangeForm(form);
    }

    componentDidUpdate(prevProps: Props) {
        const { form } = this.props.match.params;
        const { onChangeForm } = this.props;

        if (form !== prevProps.match.params.form) {
            onChangeForm(form);
        }
    }

    renderSearchButton() {
        const { actions, classes, onSelectToSearch } = this.props;

        if (actions.includes("search")) {
            return (
                <Button
                    className={classes.margin}
                    variant="contained"
                    color="primary"
                    onClick={onSelectToSearch}
                >
                    <SearchIcon />
                    Search
                </Button>
            );
        }

        return null;
    }

    renderCreateButton() {
        const { actions, classes, onSelectToCreate } = this.props;

        if (actions.includes("create")) {
            return (
                <Button
                    className={classNames(classes.green, classes.margin)}
                    variant="contained"
                    color="primary"
                    onClick={onSelectToCreate}
                >
                    <PlusIcon />
                    Create
                </Button>
            );
        }

        return null;
    }

    public render() {
        const {
            classes,
            title,
            mode,
            values,
            onClearForm,
            search,
            onToggleSearchMode,
            structure
        } = this.props;

        return (
            <Layout>
                <div>
                    <Toolbar variant="dense">
                        <Typography variant="h5">{title}</Typography>
                        <div className={classes.grow} />
                        {this.renderSearchButton()}
                        {this.renderCreateButton()}
                    </Toolbar>
                    <Divider />
                    <Form
                        open={
                            mode === CRUD_FORM_SEARCH ||
                            mode === CRUD_FORM_CREATE
                        }
                        values={values}
                        title={title}
                        onClose={onClearForm}
                        mode={mode}
                        search={search}
                        onSearchModeToggle={onToggleSearchMode}
                        structure={structure}
                    />
                </div>
            </Layout>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(styler(CRUDPage)));

import * as React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Layout from "./Layout";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/styles/withStyles";
import green from "@material-ui/core/colors/green";
import SearchIcon from "@material-ui/icons/Search";
import PlusIcon from "@material-ui/icons/Create";
import Form from "./CRUDPage/Form";
import Table from "./CRUDPage/Table";
import { AppState } from "../../rootReducer";
import {
    CRUDPageState,
    CRUD_FORM_SEARCH,
    CRUD_FORM_CREATE,
    SortModes,
    CRUD_FORM_UPDATE,
    ResultRow
} from "../../store/Admin/CRUDPage/types";
import {
    fetchInfo,
    selectToSearch,
    clearForm,
    toggleSearchMode,
    selectToCreate,
    changeValue,
    searchRecords,
    sortResults,
    createRecord,
    updateRecord,
    selectToUpdate,
    selectToDelete,
    deleteRecord,
    changePage,
    changePerPage
} from "../../store/Admin/CRUDPage/actions";
import { ThunkDispatch } from "redux-thunk";
import { confirmSnack } from "../../store/SnackController/actions";

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
    onToggleSearchMode: () => dispatch(toggleSearchMode()),
    onChangeInput: (name: string, value: any) =>
        dispatch(changeValue(name, value)),
    onSearch: (
        form: string,
        values: { [x: string]: any },
        page: number,
        perPage: number,
        sortedBy: string,
        sortedMode: SortModes
    ) =>
        dispatch(
            searchRecords(form, values, page, perPage, sortedBy, sortedMode)
        ),
    onSort: (sortBy: string, sortMode: SortModes) =>
        dispatch(sortResults(sortBy, sortMode)),
    onCreate: (
        form: string,
        values: { [x: string]: any },
        page: number,
        perPage: number,
        sortedBy: string,
        sortedMode: SortModes
    ) =>
        dispatch(
            createRecord(form, values, page, perPage, sortedBy, sortedMode)
        ),
    onUpdate: (
        form: string,
        values: { [x: string]: any },
        id: number,
        page: number,
        perPage: number,
        sortedBy: string,
        sortedMode: SortModes
    ) =>
        dispatch(
            updateRecord(form, values, id, page, perPage, sortedBy, sortedMode)
        ),
    onSelectToUpdate: (result: ResultRow) => dispatch(selectToUpdate(result)),
    onSelectToDelete: (id: number) => dispatch(selectToDelete(id)),
    onDelete: (
        form: string,
        id: number,
        page: number,
        perPage: number,
        sortedBy: string,
        sortedMode: SortModes
    ) => dispatch(deleteRecord(form, id, page, perPage, sortedBy, sortedMode)),
    onConfirm: (message: string, onCancel: () => void, onConfirm: () => void) =>
        dispatch(confirmSnack(message, onCancel, onConfirm)),
    onChangePage:(page:number)=>dispatch(changePage(page)),
    onChangePerPage:(perPage:number)=>dispatch(changePerPage(perPage))
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
    onChangeInput: (name: string, value: any) => void;
    onSearch: (
        form: string,
        values: { [x: string]: any },
        page: number,
        perPage: number,
        sortedBy: string,
        sortedMode: SortModes
    ) => void;
    onSort: (sortBy: string, sortMode: SortModes) => void;
    onCreate: (
        form: string,
        values: { [x: string]: any },
        page: number,
        perPage: number,
        sortedBy: string,
        sortedMode: SortModes
    ) => void;
    onUpdate: (
        form: string,
        values: { [x: string]: any },
        id: number,
        page: number,
        perPage: number,
        sortedBy: string,
        sortedMode: SortModes
    ) => void;
    onSelectToUpdate: (result: ResultRow) => void;
    onSelectToDelete: (id: number) => void;
    onDelete: (
        form: string,
        id: number,
        page: number,
        perPage: number,
        sortedBy: string,
        sortedMode: SortModes
    ) => void;
    onConfirm: (
        message: string,
        onCancel: () => void,
        onConfirm: () => void
    ) => void;
    onChangePage:(page:number)=>void,
    onChangePerPage:(perPage:number)=>void
} & CRUDPageState;

class CRUDPage extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleToggleSearchMode = this.handleToggleSearchMode.bind(this);
        this.handleSelectToDelete = this.handleSelectToDelete.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangePerPage = this.handleChangePerPage.bind(this);
    }

    componentDidMount() {
        const { form } = this.props.match.params;
        const {
            onChangeForm,
            values,
            page,
            perPage,
            sortedBy,
            onSearch,
            sortedMode
        } = this.props;

        onChangeForm(form);
        onSearch(form, values, page, perPage, sortedBy, sortedMode);
    }

    componentDidUpdate(prevProps: Props) {
        const { form } = this.props.match.params;
        const { onChangeForm } = this.props;

        if (form !== prevProps.match.params.form) {
            onChangeForm(form);
        }
    }

    handleChangeInput(name: string, value: any) {
        const {
            search,
            form,
            values,
            page,
            perPage,
            sortedBy,
            onSearch,
            onChangeInput,
            sortedMode
        } = this.props;

        if (search) {
            onSearch(
                form,
                { ...values, [name]: value },
                page,
                perPage,
                sortedBy,
                sortedMode
            );
        }

        onChangeInput(name, value);
    }

    handleSort(column: string, mode: SortModes) {
        const { form, values, page, perPage, onSearch, onSort } = this.props;

        onSearch(form, values, page, perPage, column, mode);

        onSort(column, mode);
    }

    handleSubmit() {
        const {
            form,
            mode,
            values,
            updatingId,
            onUpdate,
            onCreate,
            onClearForm,
            page,
            perPage,
            sortedBy,
            sortedMode
        } = this.props;

        switch (mode) {
            case CRUD_FORM_CREATE:
                onCreate(form, values, page, perPage, sortedBy, sortedMode);
                break;
            case CRUD_FORM_UPDATE:
                if (updatingId) {
                    onUpdate(
                        form,
                        values,
                        updatingId,
                        page,
                        perPage,
                        sortedBy,
                        sortedMode
                    );
                }
                break;
            default:
                onClearForm();
                break;
        }
    }

    handleToggleSearchMode() {
        const {
            search,
            form,
            values,
            page,
            perPage,
            sortedBy,
            onSearch,
            onToggleSearchMode,
            sortedMode
        } = this.props;

        if (!search) {
            onSearch(form, values, page, perPage, sortedBy, sortedMode);
        }

        onToggleSearchMode();
    }

    handleSelectToDelete(result: ResultRow) {
        const {
            onSelectToDelete,
            onConfirm,
            onClearForm,
            onDelete,
            form,
            page,
            perPage,
            sortedBy,
            sortedMode
        } = this.props;

        onSelectToDelete(result.id);

        onConfirm(
            "Are you sure you want to delete the record? Once you deleted you can not get it back.",
            () => onClearForm(),
            () => onDelete(form,result.id,page,perPage,sortedBy,sortedMode)
        );
    }

    handleChangePage(e:React.MouseEvent|null,page:number){
        const {
            search,
            form,
            values,
            perPage,
            sortedBy,
            onSearch,
            onChangePage,
            sortedMode
        } = this.props;

        if (search) {
            onSearch(
                form,
                values,
                page+1,
                perPage,
                sortedBy,
                sortedMode
            );
        }

        onChangePage(page+1);
    }

    handleChangePerPage( e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {
            search,
            form,
            values,
            page,
            sortedBy,
            onSearch,
            onChangePerPage,
            sortedMode
        } = this.props;

        if (search) {
            onSearch(
                form,
                values,
                page,
                parseInt(e.target.value),
                sortedBy,
                sortedMode
            );
        }

        onChangePerPage(parseInt(e.target.value));
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
            structure,
            sortedBy,
            sortedMode,
            columns,
            results,
            actions,
            page,
            perPage,
            resultsCount,
            onSelectToUpdate
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
                            mode === CRUD_FORM_CREATE ||
                            mode === CRUD_FORM_UPDATE
                        }
                        values={values}
                        title={title}
                        onClose={onClearForm}
                        mode={mode}
                        search={search}
                        onSearchModeToggle={this.handleToggleSearchMode}
                        structure={structure}
                        onChangeInput={this.handleChangeInput}
                        onSubmit={this.handleSubmit}
                    />
                    <Table
                        results={results}
                        sortBy={sortedBy}
                        sortMode={sortedMode}
                        columns={columns}
                        actions={actions}
                        page={page}
                        perPage={perPage}
                        count={resultsCount}
                        onSort={this.handleSort}
                        onSelectToUpdate={onSelectToUpdate}
                        onSelectToDelete={this.handleSelectToDelete}
                        onChangePage={this.handleChangePage}
                        onChangePerPage={this.handleChangePerPage}
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

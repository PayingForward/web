import * as React from "react";
import MuiTable from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import ArrowUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDownIcon from "@material-ui/icons/ArrowDropDown";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import SortIcon from "@material-ui/icons/Sort";
import red from "@material-ui/core/colors/red";
import {
    Columns,
    ResultRow,
    CRUD_TABLE_SORT_ASC,
    CRUD_TABLE_SORT_DESC,
    Column as IColumn,
    SortModes
} from "../../../store/Admin/CRUDPage/types";
import Column from "./Column";
import withStyles from "@material-ui/styles/withStyles";

interface Props {
    columns: Columns;
    sortBy: string;
    sortMode: SortModes;
    results: ResultRow[];
    actions: string[];
    page: number;
    perPage: number;
    count: number;
    classes: {
        greyBackground: string;
        sortButton: string;
        editButton: string;
        deleteButton: string;
    };
    onSort: (column: string, mode: SortModes) => void;
    onSelectToUpdate: (result: ResultRow) => void;
    onSelectToDelete: (result: ResultRow) => void;
    onChangePage: (e: React.MouseEvent | null, page: number) => void;
    onChangePerPage: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}

const styler = withStyles(theme => ({
    greyBackground: {
        background: theme.palette.grey[300],
        border: "solid 2px " + theme.palette.common.white
    },
    sortButton: {
        color: theme.palette.grey[500],
        marginRight: theme.spacing(4)
    },
    editButton: {
        color: theme.palette.primary.default,
        marginRight: theme.spacing(4)
    },
    deleteButton: {
        color: red[600],
        marginRight: theme.spacing(4)
    }
}));

class Table extends React.Component<Props> {
    handleSort(column: IColumn, mode: SortModes) {
        const { onSort } = this.props;
        return () => {
            onSort(column.name, mode);
        };
    }

    handleEditButtonClick(result: ResultRow) {
        const { onSelectToUpdate } = this.props;
        return () => {
            if (onSelectToUpdate) {
                onSelectToUpdate(result);
            }
        };
    }

    handleDeleteButtonClick(result: ResultRow) {
        const { onSelectToDelete } = this.props;
        return () => {
            if (onSelectToDelete) {
                onSelectToDelete(result);
            }
        };
    }

    renderCells() {
        const { columns, classes } = this.props;

        return Object.keys(columns).map((columnName: string, key: number) => {
            const { label } = columns[columnName];

            return (
                <TableCell className={classes.greyBackground} key={key}>
                    {this.renderSortButton(columns[columnName])}
                    {label}
                </TableCell>
            );
        });
    }

    renderSortButton(column: IColumn) {
        const { sortBy, sortMode, classes } = this.props;

        if (!column.sortable) {
            return null;
        }

        if (column.name != sortBy) {
            return (
                <Tooltip title={"Click To Sort By " + column.label}>
                    <IconButton
                        onClick={this.handleSort(column, CRUD_TABLE_SORT_ASC)}
                        className={classes.sortButton}
                    >
                        <SortIcon />
                    </IconButton>
                </Tooltip>
            );
        }

        if (sortMode == CRUD_TABLE_SORT_ASC) {
            return (
                <Tooltip title={"Click To Sort By Descending Order"}>
                    <IconButton
                        onClick={this.handleSort(column, CRUD_TABLE_SORT_DESC)}
                        className={classes.sortButton}
                    >
                        <ArrowUpIcon />
                    </IconButton>
                </Tooltip>
            );
        } else {
            return (
                <Tooltip title={"Click To Sort By Asccending Order"}>
                    <IconButton
                        onClick={this.handleSort(column, CRUD_TABLE_SORT_ASC)}
                        className={classes.sortButton}
                    >
                        <ArrowDownIcon />
                    </IconButton>
                </Tooltip>
            );
        }
    }

    renderActionCell() {
        const { actions, classes } = this.props;

        if (!actions.includes("update") && !actions.includes("delete")) {
            return null;
        }

        return (
            <TableCell className={classes.greyBackground} variant="head">
                Actions
            </TableCell>
        );
    }

    renderResultRows() {
        const { results } = this.props;

        return results.map((result: ResultRow, key: number) =>
            this.renderResultRow(result, key)
        );
    }

    renderResultRow(result: ResultRow, key: number) {
        const { page, perPage } = this.props;

        return (
            <TableRow key={key}>
                <TableCell variant="body">
                    {(page - 1) * perPage + key + 1}
                </TableCell>
                {this.renderResultCells(result)}
                {this.renderResultActions(result)}
            </TableRow>
        );
    }

    renderResultCells(result: ResultRow) {
        const { columns } = this.props;

        return Object.keys(columns).map((columnName: string, key: number) => {
            const column = columns[columnName];

            return (
                <TableCell key={key}>
                    <Column {...column} value={result[columnName]} />
                </TableCell>
            );
        });
    }

    renderResultActions(result: ResultRow) {
        const { actions } = this.props;

        if (!actions.includes("update") && !actions.includes("delete")) {
            return null;
        }

        return (
            <TableCell>
                {this.renderDeleteButton(result)}
                {this.renderEditButton(result)}
            </TableCell>
        );
    }

    renderDeleteButton(result: ResultRow) {
        const { actions, classes } = this.props;

        if (actions.includes("delete")) {
            return (
                <Tooltip
                    onClick={this.handleDeleteButtonClick(result)}
                    title={"Click To Delete"}
                >
                    <IconButton className={classes.deleteButton}>
                        <CloseIcon color="inherit" />
                    </IconButton>
                </Tooltip>
            );
        }

        return null;
    }

    renderEditButton(result: ResultRow) {
        const { actions, classes } = this.props;

        if (actions.includes("update")) {
            return (
                <Tooltip title={"Click To Update"}>
                    <IconButton
                        onClick={this.handleEditButtonClick(result)}
                        className={classes.editButton}
                    >
                        <EditIcon color="inherit" />
                    </IconButton>
                </Tooltip>
            );
        }

        return null;
    }

    public render() {
        const {
            classes,
            page,
            perPage,
            count,
            onChangePage,
            onChangePerPage
        } = this.props;

        return (
            <MuiTable>
                <TableHead>
                    <TableRow>
                        <TableCell
                            className={classes.greyBackground}
                            variant="head"
                        >
                            #
                        </TableCell>
                        {this.renderCells()}
                        {this.renderActionCell()}
                    </TableRow>
                </TableHead>
                <TableBody>{this.renderResultRows()}</TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            count={count}
                            rowsPerPage={perPage}
                            page={page - 1}
                            onChangePage={onChangePage}
                            onChangeRowsPerPage={onChangePerPage}
                        />
                    </TableRow>
                </TableFooter>
            </MuiTable>
        );
    }
}

export default styler(Table);

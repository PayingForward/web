import * as React from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import SendIcon from "@material-ui/icons/Send";
import blue from "@material-ui/core/colors/blue";

import MainLayout from "../Layout/MainLayout";
import {
    DonatePageState,
    DonatePageModes
} from "../../../store/DonatePage/types";
import {
    fetchPrices,
    fetchInfo,
    changeAmount,
    changeMethod
} from "../../../store/DonatePage/actions";
import { AppState } from "../../../rootReducer";
import { withRouter, RouteComponentProps } from "react-router";
import { avatar } from "../../../helpers";
import IconTextField from "../Layout/IconTextField";
import { APP_URL, PAYMENT_METHODS } from "../../../constants/config";
import { PaymentMethod } from "../../../store/mainTypes";

const styler = withStyles(theme => ({
    grayBackground: {
        background: theme.palette.grey[300],
        minHeight: "calc(100vh - " + 56 + "px)",
        padding: theme.spacing(4)
    },
    paper: {
        padding: theme.spacing(4),
        margin: theme.spacing(4)
    },
    avatar: {
        width: 64,
        height: 64,
        boxShadow: "1px 1px 2px",
        marginTop: theme.spacing(2)
    },
    toolbarAvatar: {
        marginRight: theme.spacing(4)
    },
    sendIcon: {
        color: blue[400]
    },
    iconText: {
        margin: "auto"
    },
    menuIcon: {
        height: 42
    },
    methodIcon: {
        marginRight: theme.spacing(2)
    }
}));

interface Props extends DonatePageState {
    classes: {
        grayBackground: string;
        paper: string;
        avatar: string;
        toolbarAvatar: string;
        sendIcon: string;
        iconText: string;
        menuIcon: string;
        methodIcon: string;
    };
    fetchPrices: () => void;
    fetchInfo: (mode: DonatePageModes, modeId: number) => void;
    changeAmount: (amount: number) => void;
    changeMethod: (method: PaymentMethod) => void;
    match: {
        params: {
            mode: string;
            modeId: string;
        };
    };
}

interface State {
    methodMenuRef?: HTMLButtonElement;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    fetchPrices: () => dispatch(fetchPrices()),
    fetchInfo: (mode: DonatePageModes, modeId: number) =>
        dispatch(fetchInfo(mode, modeId)),
    changeAmount: (amount: number) => dispatch(changeAmount(amount)),
    changeMethod: (method: PaymentMethod) => dispatch(changeMethod(method))
});

const mapStateToProps = (state: AppState) => ({
    ...state.donatePage
});

class DonatePage extends React.Component<Props & RouteComponentProps, State> {
    constructor(props: Props & RouteComponentProps) {
        super(props);

        props.fetchPrices();

        if (
            props.match.params.mode == "school" ||
            props.match.params.mode == "child"
        ) {
            props.fetchInfo(
                props.match.params.mode,
                parseInt(props.match.params.modeId)
            );
        }

        this.state = {};
        this.handleClosePaymentMethod = this.handleClosePaymentMethod.bind(
            this
        );
        this.handleOpenPaymentMethods = this.handleOpenPaymentMethods.bind(
            this
        );
    }

    handleSubmit() {}

    handleChangeMethod(method: PaymentMethod) {
        const { changeMethod } = this.props;
        return () => {
            changeMethod(method);
            this.handleClosePaymentMethod();
        };
    }

    handleOpenPaymentMethods(e: React.MouseEvent<HTMLButtonElement>) {
        this.setState({ methodMenuRef: e.currentTarget });
    }

    handleClosePaymentMethod() {
        this.setState({ methodMenuRef: undefined });
    }

    componentDidUpdate(prevProps: Props) {
        const { match, fetchInfo } = this.props;

        if (
            match.params.modeId !== prevProps.match.params.modeId ||
            match.params.mode !== prevProps.match.params.mode
        ) {
            if (match.params.mode == "school" || match.params.mode == "child") {
                fetchInfo(match.params.mode, parseInt(match.params.modeId));
            }
        }
    }

    public render() {
        const {
            classes,
            prices,
            informations,
            method,
            amount,
            changeAmount
        } = this.props;

        return (
            <MainLayout>
                <Grid container>
                    <Grid className={classes.grayBackground} item md={2}>
                        <Typography variant="h5">
                            Crypto currency rates for the day
                        </Typography>
                        <Divider />
                        {Object.keys(prices).map((price, key) => [
                            <Grid key={key} container>
                                <Grid item md={4}>
                                    <Typography variant="h6">
                                        1 {price}
                                    </Typography>
                                </Grid>
                                <Grid item md={8}>
                                    <Typography variant="h6">
                                        = $ {prices[price]}
                                    </Typography>
                                </Grid>
                            </Grid>,
                            <Divider key={key + 1000} />
                        ])}
                    </Grid>
                    <Grid item md={8}>
                        {informations ? (
                            <Paper className={classes.paper}>
                                <Typography color="textSecondary" variant="h5">
                                    Donate to
                                </Typography>
                                <Divider />
                                {informations.child
                                    ? [
                                          <Grid key={0} container>
                                              <Grid item md={2}>
                                                  <Avatar
                                                      className={classes.avatar}
                                                      src={avatar(
                                                          200,
                                                          informations.child
                                                              .avatar
                                                      )}
                                                  />
                                              </Grid>
                                              <Grid item md={10}>
                                                  <Typography
                                                      color="textSecondary"
                                                      variant="h6"
                                                  >
                                                      {informations.child.name}
                                                  </Typography>
                                                  <Typography
                                                      color="textSecondary"
                                                      variant="caption"
                                                  >
                                                      All transactions not
                                                      directly transfered to
                                                      childrens due to some
                                                      reasons. Transactions
                                                      transfered to teachers and
                                                      then teacher can give it
                                                      to childrens
                                                  </Typography>
                                              </Grid>
                                          </Grid>,
                                          <Divider key={1} />
                                      ]
                                    : null}
                                <Typography color="textSecondary" variant="h6">
                                    School
                                </Typography>
                                <Toolbar>
                                    <Avatar
                                        className={classes.toolbarAvatar}
                                        src={avatar(
                                            64,
                                            informations.school.logo
                                        )}
                                    />
                                    <Typography
                                        color="textSecondary"
                                        variant="h6"
                                    >
                                        {informations.teacher.name}
                                    </Typography>
                                </Toolbar>
                                <Divider />
                                <Typography color="textSecondary" variant="h6">
                                    Childrens
                                </Typography>
                                <List dense>
                                    {informations.childrens.map(
                                        (child, key) => (
                                            <ListItem key={key} dense divider>
                                                <ListItemText
                                                    primaryTypographyProps={{
                                                        color: "textSecondary"
                                                    }}
                                                    primary={child.name}
                                                />
                                                <ListItemAvatar>
                                                    <Avatar
                                                        src={avatar(
                                                            64,
                                                            child.avatar
                                                        )}
                                                    />
                                                </ListItemAvatar>
                                            </ListItem>
                                        )
                                    )}
                                </List>
                                <Divider />
                                <Typography color="textSecondary" variant="h5">
                                    Teacher
                                </Typography>
                                <Toolbar>
                                    <Avatar
                                        className={classes.toolbarAvatar}
                                        src={avatar(
                                            64,
                                            informations.teacher.avatar
                                        )}
                                    />
                                    <Typography
                                        color="textSecondary"
                                        variant="h6"
                                    >
                                        {informations.teacher.name}
                                    </Typography>
                                </Toolbar>
                                <Divider />
                                <Typography color="textPrimary" variant="h5">
                                    Donation
                                </Typography>
                                <IconTextField
                                    className={classes.iconText}
                                    leftIcon={
                                        <img
                                            width="24"
                                            src={APP_URL + method.logo}
                                        />
                                    }
                                    rightIcon={
                                        <SendIcon
                                            className={classes.sendIcon}
                                        />
                                    }
                                    onChange={changeAmount}
                                    value={amount}
                                    label="Amount (USD)"
                                    type="number"
                                    onSubmit={this.handleSubmit}
                                    onClickLeftIcon={
                                        this.handleOpenPaymentMethods
                                    }
                                />
                                <Menu
                                    open={!!this.state.methodMenuRef}
                                    anchorEl={this.state.methodMenuRef}
                                    onClose={this.handleClosePaymentMethod}
                                >
                                    {Object.values(PAYMENT_METHODS).map(
                                        (method, key) => (
                                            <MenuItem
                                                className={classes.menuIcon}
                                                button
                                                onClick={this.handleChangeMethod(
                                                    method
                                                )}
                                                key={key}
                                            >
                                                <ListItemIcon
                                                    className={
                                                        classes.methodIcon
                                                    }
                                                >
                                                    <img
                                                        width="24"
                                                        src={
                                                            APP_URL +
                                                            method.logo
                                                        }
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primaryTypographyProps={{
                                                        color: "textSecondary"
                                                    }}
                                                    primary={method.label}
                                                />
                                            </MenuItem>
                                        )
                                    )}
                                </Menu>
                            </Paper>
                        ) : (
                            "Please wait.. Loading informations.."
                        )}
                    </Grid>
                    <Grid item md={2}></Grid>
                </Grid>
            </MainLayout>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(styler(withRouter(DonatePage)));

import * as React from "react";
import AvatarUploader from "react-avatar-edit";

import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { avatar } from "../../../helpers";
import agent from "../../../agent";

interface Values {
    avatar?: string;
    bio?: string;
}

interface Props {
    values: Values;
    onChange: (values: Values) => void;
    classes: {
        card: string;
        avatar: string;
        bioField: string;
        bioWrapper: string;
        grow: string;
        inactive: string;
        progress: string;
    };
    loading: boolean;
}

const styler = withStyles(theme => ({
    avatar: {
        width: 160,
        height: 160,
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        margin: "auto",
        fontSize: ".5em"
    },
    bioField: {
        margin: "auto",
        textAlign: "center"
    },
    bioWrapper: {
        margin: "auto",
        width: 300
    },
    grow: {
        flexGrow: 1
    },
    inactive: {
        opacity: 0.4,
        pointerEvents: "none"
    },
    progress: {
        marginRight: theme.spacing(4)
    }
}));

class AvatarBioForm extends React.Component<Props, Values> {
    constructor(props: Props) {
        super(props);

        this.state = {
            avatar: props.values.avatar
                ? avatar("full", props.values.avatar)
                : undefined,
            bio: props.values.bio ? props.values.bio : ""
        };

        this.handleChangeAvatar = this.handleChangeAvatar.bind(this);
        this.handleChangeBio = this.handleChangeBio.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const { onChange } = this.props;
        const { avatar, bio } = this.state;

        agent.Profile.saveAvatar(avatar ? avatar : "").then(
            ({ message, success, name }) => {
                if (success) {
                    onChange({ avatar: name, bio });
                } else {
                    console.error(message);
                }
            }
        );
    }

    handleChangeAvatar(avatar: string) {
        this.setState({ avatar });
    }

    handleChangeBio(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ bio: e.target.value });
    }

    public render() {
        const { classes, loading } = this.props;

        const { avatar, bio } = this.state;

        return (
            <form
                onSubmit={this.handleSubmit}
                className={loading ? classes.inactive : undefined}
                key={0}
            >
                <Typography align="center" variant="h6" color="textSecondary">
                    Complete Your Profile
                </Typography>
                <Divider />
                <div className={classes.avatar}>
                    <AvatarUploader
                        width={160}
                        height={160}
                        label="Select a photo.."
                        onCrop={this.handleChangeAvatar}
                        src={avatar}
                    />
                </div>
                <div className={classes.bioWrapper}>
                    <TextField
                        placeholder="I am a..."
                        className={classes.bioField}
                        fullWidth
                        multiline={true}
                        rows={2}
                        rowsMax={3}
                        helperText={
                            !bio || bio.length < 60
                                ? "Please enter a bio more than 60 characters"
                                : undefined
                        }
                        error={!bio || bio.length < 60}
                        onChange={this.handleChangeBio}
                        value={bio}
                    />
                </div>
                <Divider />
                <Toolbar variant="dense">
                    <div className={classes.grow} />
                    {loading ? (
                        <CircularProgress
                            size={32}
                            className={classes.progress}
                        />
                    ) : null}
                    <Button variant="contained" color="primary" type="submit">
                        Continue
                    </Button>
                </Toolbar>
            </form>
        );
    }
}

export default styler(AvatarBioForm);

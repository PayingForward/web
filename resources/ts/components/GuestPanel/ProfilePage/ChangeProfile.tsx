import * as React from "react";

import Card from "@material-ui/core/Card";
import withStyles from "@material-ui/core/styles/withStyles";

import { ProfileInformation } from "../../../store/ProfilePage/types";
import AvatarBioForm from "./AvatarBioForm";

interface Props {
    profile: ProfileInformation;
    onChange: (profile: ProfileInformation) => void;
    classes: {
        card: string;
    };
    loading: boolean;
}

interface State {
    avatar?: string;
    bio: string;
}

const styler = withStyles(theme => ({
    card: {
        padding: theme.spacing(2),
        margin: theme.spacing(2)
    }
}));

class ChangeProfile extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.handleChangeAvatarBio = this.handleChangeAvatarBio.bind(this);
    }

    handleChangeAvatarBio(values: { avatar?: string; bio?: string }) {
        const { onChange, profile } = this.props;

        onChange({ ...profile, ...values });
    }

    public renderAvatarBioBox() {
        const { profile, loading } = this.props;

        if (profile.avatar && profile.bio) {
            return null;
        } else {
            return (
                <AvatarBioForm
                    values={{
                        avatar: profile.avatar,
                        bio: profile.bio
                    }}
                    loading={loading}
                    onChange={this.handleChangeAvatarBio}
                />
            );
        }
    }

    public renderProfileInfoBox(){
        const {profile,loading} = this.props;

        if(!profile.avatar || !profile.bio){
            return null;
        }

        return null;
    }

    public render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>{[
                this.renderAvatarBioBox()
            ]}</Card>
        );
    }
}

export default styler(ChangeProfile);

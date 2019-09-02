import * as React from "react";

import Card from "@material-ui/core/Card";
import withStyles from "@material-ui/core/styles/withStyles";

import { ProfileInformation } from "../../../store/ProfilePage/types";
import AvatarBioForm from "./AvatarBioForm";
import ProfileInfoForm, { Values } from "./ProfileInfoForm";
import {
    CompleteChildInformations,
    CompleteDonorInformations
} from "../../../store/mainTypes";

interface Props {
    profile: ProfileInformation;
    onChange: (profile: ProfileInformation,mode:number) => void;
    classes: {
        card: string;
    };
    loading: boolean;
    mode:number;
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
        this.handleChangeOtherInfo = this.handleChangeOtherInfo.bind(this);
    }

    handleChangeAvatarBio(values: { avatar?: string; bio?: string }) {
        const { onChange, profile } = this.props;

        onChange({ ...profile, ...values },2);
    }

    handleChangeOtherInfo(values: Values) {
        const { onChange, profile } = this.props;

        onChange({ ...profile, donations:0, ...values },0);
    }

    public renderAvatarBioBox() {
        const { profile, loading,mode } = this.props;
        if (profile.avatar && profile.bio && mode!==1) {
            return null;
        } else {
            return (
                <AvatarBioForm
                    key={0}
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

    public renderProfileInfoBox() {
        const { profile, loading,mode } = this.props;

        if ((!profile.avatar || !profile.bio)||mode!==2) {
            return null;
        }

        return (
            <ProfileInfoForm
                key={1}
                values={{
                    town: profile.town,
                    country: profile.country,
                    school: (profile as CompleteChildInformations).school,
                    class: (profile as CompleteChildInformations).class,
                    occupation: (profile as CompleteDonorInformations)
                        .occupation,
                    interestCountry: (profile as CompleteDonorInformations)
                        .interestCountry,
                    contactEmail: (profile as CompleteDonorInformations)
                        .contactEmail,
                    name: profile.name
                }}
                loading={loading}
                userType={profile.type as string}
                onChange={this.handleChangeOtherInfo}
            />
        );
    }

    public render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                {[this.renderAvatarBioBox(), this.renderProfileInfoBox()]}
            </Card>
        );
    }
}

export default styler(ChangeProfile);

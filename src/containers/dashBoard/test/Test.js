// @flow strong

import React, {PureComponent} from 'react';
import {postImg} from "../../../services/api";
import {changePreview} from "../../../helpers";

class Test extends PureComponent<Props, State> {
    constructor(props) {
        super(props);

        this.onSelectAvatar = this.onSelectAvatar.bind(this);
        this.state = {
            imgUri: '',
        }
    }

    onUpdate = async (
        event: SyntheticEvent<>
    ) => {
        if (event) {
            event.preventDefault();
        }
        const {avatar} = this.state;
        let formData = new FormData();
        formData.append("avatar", avatar);
        try {
            await postImg(formData)
                .then(async res => await this.setState({imgUri: res.data.imgUri}))
                .catch(err => console.log({err}));
        } catch (error) {
            console.log('send contact went wrong..., error: ', error);
        }
    };

    async onSelectAvatar(e) {
        const avatar = e.target.files[0];
        const path = e.target.value;
        if (avatar) {
            changePreview(e.target.files[0], '.image_preview');
            this.setState({avatar, path});
            let formData = new FormData();
            formData.append("avatar", avatar);
            try {
                await postImg(formData)
                    .then(async res => await this.setState({imgUri: res.data.imgUri}))
                    .catch(err => console.log({err}));
            } catch (error) {
                console.log('send contact went wrong..., error: ', error);
            }
        }
    }

    render() {
        return (
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Basic form</h4>
                                <p className="card-description">
                                    Basic form elements
                                </p>
                                <form action={'http://localhost:1337/api/postImg'} className="forms-sample"
                                      method="POST">
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control file-upload-info"
                                                disabled
                                                placeholder="Upload Image"
                                                value={this.state.imgUri}
                                            />
                                            <span className="input-group-append">
                                                <label htmlFor="avatar-preview" className="btn btn-success mr-2"
                                                       style={{paddingTop: 12}}>
                                                    Choose file
                                                </label>
                                            </span>
                                        </div>
                                        <input id="avatar-preview" type="file" onChange={this.onSelectAvatar}/>
                                    </div>
                                    <div className="form-group">
                                        <div className="image_preview">
                                            <img className="img-responsive img-thumbnail avatar-preview" src="/images/faces/face4.jpg"
                                                 alt=""/>
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-success mr-2" onClick={this.onUpdate}>
                                        Submit
                                    </button>
                                    <button className="btn btn-light">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Test;

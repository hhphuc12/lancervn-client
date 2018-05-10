// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import { formatDescription, dateFormater, moneyFormater } from "../../../../helpers";

class Detail extends PureComponent<Props, State> {
    componentDidMount() {
        const {
            enterHomeUserDetail,
            getHomePackageDetailIfNeed,
        } = this.props.actions;
        enterHomeUserDetail();
        getHomePackageDetailIfNeed(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.actions.leaveHomeUserDetail();
    }

    handleRadio = event => {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    };

    render() {
        const {
            _package,
            userPost,
            userProvince,
            process,
            dataNeed,
        } = this.props;
        const {
            name,
            expectedResult,
            target,
            priceExpected,
            category,
        } = _package;
        const {
            firstName,
            lastName,
            avatarUri,
            email,
            skype,
        } = userPost;
        const userPostName = `${firstName} ${lastName}`;

        return (
            <div>
                <section className="section-main section-top-banner no-overlay">
                    <div className="container" style={{ padding: '3rem' }}>
                        <div className="profile-box">
                            <h1 className="profile-name">
                                {name}
                            </h1>
                            <div style={{ display: 'inline-flex' }}>
                                <div className="row">
                                    <p className="row-job-detail-header">
                                        <i className="mdi mdi-table-large"/>
                                        {category}
                                    </p>
                                    <p className="row-job-detail-header" style={{ color: '#000' }}>
                                        <i className="mdi mdi-cash-multiple"/>
                                        {`₫${moneyFormater(priceExpected)}`}
                                    </p>
                                    <p className="row-job-detail-header">
                                        <i className="mdi mdi-calendar-clock"/>
                                        {`Thời gian thực hiện ước tính: 15 ngày`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="container home-wrapper">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 d-xl-block d-md-block col-job-filter">
                            <div className="sidebar">
                                <div className="box user-post-wrapper">
                                    <p className="user-post-title">Người cung cấp:</p>
                                    <img
                                        src={avatarUri}
                                        alt={userPostName}
                                        className="avatar avatar-profile job-avatar-profile"
                                    />
                                    <h1 className="job-user-post-name">
                                        {userPostName}
                                    </h1>
                                    <address>
                                        <i className="mdi mdi-map-marker-radius"/>
                                        {`${userProvince}, VN`}
                                    </address>
                                    <p>
                                        <i className="mdi mdi-email"/>
                                        {email}
                                    </p>
                                    <p>
                                        <i className="mdi mdi-skype"/>
                                        {skype}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-9">
                            <div className="freelancer-content">
                                <div className="category">
                                    <span className="media-cloud-title">Đối tượng khách hàng:</span>
                                    <div dangerouslySetInnerHTML={{__html: formatDescription(target)}}/>
                                </div>
                                <br/>
                                <div className="category">
                                    <span className="media-cloud-title">Khách hàng sẽ nhận được:</span>
                                    <div dangerouslySetInnerHTML={{__html: formatDescription(expectedResult)}}/>
                                </div>
                                <br/>
                                <div className="category">
                                    <span className="media-cloud-title">Quy trình thực hiện:</span>
                                    <div style={{ marginTop: '0.5rem' }}>
                                        {
                                            process.map((p, index) => (
                                                <div className="step" key={index}>
                                                    <div>
                                                        <div className="circle">{index}</div>
                                                        <div className="line"/>
                                                    </div>
                                                    <div className="step-item">
                                                        <div className="title">{p}</div>
                                                        <div className="body"/>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <br/>
                                <div className="category">
                                    <span className="media-cloud-title">Bạn cần cung cấp:</span>
                                    <ul>
                                        {
                                            dataNeed.map((d, index) => (
                                                <li key={index} style={{ fontSize: '1rem' }}>
                                                    <i className="mdi mdi-checkbox-marked-outline text-primary" style={{ fontSize: '1.5rem', paddingRight: '0.5rem' }}/>
                                                    <span>{d}</span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Detail;

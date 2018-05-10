// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import { formatDescription, dateFormater, moneyFormater } from "../../../../helpers";

class Detail extends PureComponent<Props, State> {
    componentDidMount() {
        const {
            enterHomeUserDetail,
            getJobFreelanceDetailIfNeed,
        } = this.props.actions;
        enterHomeUserDetail();
        getJobFreelanceDetailIfNeed(this.props.match.params.id);
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
            jobFreelanceDetail,
            userProvince,
            isExpiredOffer,
            userPost,
            skill,
        } = this.props;
        const {
            name,
            category,
            content,
            deadlineOffer,
            province,
            priceExpected,
            prioritize,
        } = jobFreelanceDetail;
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
                                        <i className="mdi mdi-worker"/>
                                        {category}
                                    </p>
                                    <address className="row-job-detail-header">
                                        <i className="mdi mdi-map-marker-radius"/>
                                        {`${province}`}
                                    </address>
                                    <p className="row-job-detail-header">
                                        <i className="mdi mdi-calendar-clock"/>
                                        {`Hạn gửi báo giá: ${dateFormater(deadlineOffer)}`}
                                    </p>
                                </div>
                            </div>
                            <br/>
                            <div style={{ display: 'inline-flex' }}>
                                <div className="row">
                                    <p className="row-job-detail-header" style={{ color: '#000' }}>
                                        <i className="mdi mdi-cash-multiple"/>
                                        {`₫${moneyFormater(priceExpected)}`}
                                    </p>
                                    <div>
                                        {
                                            isExpiredOffer ?
                                                (<span className="offer expired-offer">Hết hạn báo giá</span>)
                                                : (<span className="offer receiving-offer">Đang nhận báo giá</span>)
                                        }
                                    </div>
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
                                    <p className="user-post-title">Người đăng:</p>
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
                                    <span className="media-cloud-title">Yêu cầu của khách hàng:</span>
                                    <div dangerouslySetInnerHTML={{__html: formatDescription(content)}}/>
                                </div>
                                <br/>
                                <div className="category">
                                    <span className="media-cloud-title">Ưu tiên:</span>
                                    <div dangerouslySetInnerHTML={{__html: formatDescription(prioritize)}}/>
                                </div>
                                <br/>
                                <div className="category">
                                    <span className="media-cloud-title">Yêu cầu kỹ năng:</span>
                                    {
                                        skill.map((s, index) => (
                                            <span className="cloud-tag" key={index}>{s}</span>
                                        ))
                                    }
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

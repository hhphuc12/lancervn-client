// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import Rating from 'react-rating';
import {dateFormater, formatDescription, monthFormater} from "../../../../helpers";

class Detail extends PureComponent<Props, State> {
    componentDidMount() {
        const {
            enterHomeUserDetail,
            getFreelancerDetailIfNeed,
        } = this.props.actions;
        enterHomeUserDetail();
        getFreelancerDetailIfNeed(this.props.match.params.id);
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
        let {
            avatarUri,
            name,
            province,
            occupation,
            description,
            category,
            experience,
            projectDone,
            literacy,
            language,
            evaluate,
        } = this.props;
        avatarUri = avatarUri || '/images/faces/male-avatar.png';
        return (
            <div>
                <section className="section-main section-top-banner no-overlay">
                    <div className="container" style={{ padding: '3rem' }}>
                        <div className="profile-box">
                            <img
                                src={avatarUri}
                                alt={name}
                                className="avatar avatar-profile"
                            />
                            <h1 className="profile-name">
                                {name}
                            </h1>
                            <address><i className="mdi mdi-map-marker-radius"/>{`${province}, VN`}</address>
                            <p className="text-primary" style={{ fontSize: '1rem' }}>
                                <i className="mdi mdi-worker"/>
                                {occupation}
                            </p>
                        </div>
                    </div>
                </section>
                <div className="container home-wrapper">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 d-xl-block d-md-block col-job-filter">
                            <div className="sidebar">
                                <div className="box">
                                    <h2 className="detail-title">GIỚI THIỆU</h2>
                                    <div className="title-under-line"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-9">
                            <div className="freelancer-content">
                                <div className="description">
                                    <div dangerouslySetInnerHTML={{__html: formatDescription(description)}}/>
                                </div>
                                <div className="category">
                                    <span className="media-cloud-title">Dịch vụ cung cấp:</span>
                                    {
                                        category.map((c, index) => (
                                            <span className="cloud-tag" key={index}>{c}</span>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-4 d-xl-block d-md-block col-job-filter">
                            <div className="sidebar">
                                <div className="box">
                                    <h2 className="detail-title">KINH NGHIỆM</h2>
                                    <div className="title-under-line"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-9">
                            <div className="freelancer-content">
                                <div className="experience">
                                    <div className="row">
                                        {
                                            experience.map((e, index) => (
                                                <div className="col-4 grid-margin" key={index}>
                                                    <div className="card card-job-profile">
                                                        <div className="card-body card-body-job-profile">
                                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <div className="card-data-job-profile">
                                                                    <p>Vị trí: <b>{e.jobPosition}</b></p>
                                                                    <p>Công ty: <b>{e.company}</b></p>
                                                                    <p>{`${monthFormater(e.startMonth)} ~ ${monthFormater(e.endMonth)}`}</p>
                                                                </div>
                                                            </div>
                                                            <div
                                                                style={{ marginBottom: 0 }}
                                                                dangerouslySetInnerHTML={{__html: formatDescription(e.description)}}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-4 d-xl-block d-md-block col-job-filter">
                            <div className="sidebar">
                                <div className="box">
                                    <h2 className="detail-title">HỒ SƠ NĂNG LỰC</h2>
                                    <div className="title-under-line"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-9">
                            <div className="freelancer-content">
                                <div className="row">
                                    {
                                        projectDone.map((p, index) => (
                                            <div className="col-4 grid-margin" key={index}>
                                                <div className="card card-job-profile">
                                                    <div className="card-body card-body-job-profile">
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <div className="card-data-job-profile">
                                                                <p>Dự án: <b>{p.projectName}</b></p>
                                                                <p>Khách hàng: <b>{p.customer}</b></p>
                                                                <p>Vai trò: <b>{p.role}</b></p>
                                                                <div>
                                                                    Dịch vụ: <div className="category-project-wrapper">
                                                                    {
                                                                        p.category.map((c, index) => (<span className="cloud-tag" key={index}>{c}</span>))
                                                                    }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            style={{ marginBottom: 0 }}
                                                            dangerouslySetInnerHTML={{__html: formatDescription(p.description)}}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-4 d-xl-block d-md-block col-job-filter">
                            <div className="sidebar">
                                <div className="box">
                                    <h2 className="detail-title">TRÌNH ĐỘ HỌC VẤN</h2>
                                    <div className="title-under-line"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-9">
                            <div className="freelancer-content">
                                <div className="row">
                                    {
                                        literacy.map((l, index) => (
                                            <div className="col-4 grid-margin" key={index}>
                                                <div className="card card-job-profile">
                                                    <div className="card-body card-body-job-profile">
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <div className="card-data-job-profile">
                                                                <p>Trường: <b>{l.university}</b></p>
                                                                <p>Chuyên ngành: <b>{l.specialized}</b></p>
                                                                <p>{`${monthFormater(l.startMonth)} ~ ${monthFormater(l.endMonth)}`}</p>
                                                            </div>
                                                        </div>
                                                        <div
                                                            style={{ marginBottom: 0 }}
                                                            dangerouslySetInnerHTML={{__html: formatDescription(l.description)}}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="language">
                                    <span className="media-cloud-title" style={{ color: '#000' }}>Ngoại ngữ:</span>
                                    {
                                        language.map((l, index) => (<span className="cloud-tag" key={index}>{`${l.name} ${l.level}`}</span>))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-4 d-xl-block d-md-block col-job-filter">
                            <div className="sidebar">
                                <div className="box">
                                    <h2 className="detail-title">PHẢN HỒI TỪ KHÁCH HÀNG</h2>
                                    <div className="title-under-line"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-9">
                            <div className="freelancer-content">
                                <div className="row">
                                    {
                                        evaluate.map((e, index) => (
                                            <div className="col-6 grid-margin" key={index}>
                                                <div className="card">
                                                    <div className="card-body" style={{ paddingTop: 0 }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <div className="card-data-job-profile" style={{ paddingTop: 0 }}>
                                                                <p>Công việc: <b>{e.job.name}</b></p>
                                                                <p><b>{e.title}</b></p>
                                                                <p>{dateFormater(e.createdAt)}</p>
                                                                <div className="rating-wrap">
                                                                    <div className="rating-container">
                                                                        <Rating
                                                                            readonly={true}
                                                                            initialRating={e.rate}
                                                                            emptySymbol={<i className="mdi mdi-star-outline rating-item text-success"/>}
                                                                            fullSymbol={<i className="mdi mdi-star rating-item text-success"/>}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            style={{ marginBottom: 0 }}
                                                            dangerouslySetInnerHTML={{__html: formatDescription(e.comment)}}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
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

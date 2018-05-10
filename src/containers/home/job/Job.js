// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import 'rc-collapse/assets/index.css';
import Collapse, { Panel } from 'rc-collapse';
import 'pretty-checkbox/dist/pretty-checkbox.css';
import { moneyFormater, dateFormatter } from '../../../helpers';

class User extends PureComponent<Props, State> {
    state = {
        activeKey: ['0'],
        categorySelected: '',
        jobFreelance: [],
    };

    componentDidMount() {
        const {
            enterHomeUser,
            getFullCategoryIfNeed,
            getJobFreelanceIfNeed,
        } = this.props.actions;
        enterHomeUser();
        getFullCategoryIfNeed();
        getJobFreelanceIfNeed();
    }

    componentWillUnmount() {
        this.props.actions.leaveHomeUser();
    }

    handleRadio = event => {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    };

    onChange = (activeKey) => {
        this.setState({
            activeKey,
        });
    };

    onCategoryChange = (id, name) => {
        const { getJobFreelanceIfNeed } = this.props.actions;
        if (id !== this.state.categorySelected) {
            this.setState({ categorySelected: id });
            getJobFreelanceIfNeed(1, name);
        }
        else {
            this.setState({ categorySelected: '' });
            getJobFreelanceIfNeed(1);
        }
    };

    componentWillReceiveProps (nextProps) {
        if (nextProps.jobFreelance) {
            this.setState({ jobFreelance: nextProps.jobFreelance });
        }
    }

    render() {
        const { fullCategories } = this.props;
        const { jobFreelance } = this.state;
        const categoriesJSX = fullCategories.map((cate, index) => {
            const childJSX = cate.child.map((child, i) => (
                <div className="form-group" key={i}>
                    <div className="pretty p-icon p-round p-smooth">
                        <input
                            type="checkbox"
                            checked={this.state.categorySelected === child.id}
                            onChange={() => this.onCategoryChange(child.id, child.name)} />
                        <div className="state p-primary">
                            <i className="icon mdi mdi-check"/>
                            <label>{child.name}</label>
                        </div>
                    </div>
                </div>
            ));
            return (
                <Panel header={cate.name} key={index}>
                    {childJSX}
                </Panel>
            );
        });
        const jobFreelanceJSX = jobFreelance.map((j, index) => {
            const { avatarUri, name, province } = j.userPost;
            return (
                <li className="media media-featured" key={index}>
                    <div className="text-featured">Được tài trợ</div>
                    <div className="media-body">
                        <h4 className="media-heading item-title">
                            <Link to={`/job-freelance/${j._id}`}>
                                {j.name}
                            </Link>
                        </h4>
                        <div style={{ padding: '0.5rem 0' }}>
                            <ul className="media-stats list-unstyled horizontal item-stats">
                                <li style={{ float: 'left', marginRight: '0.8rem' }}><i className="mdi mdi-tag-outline"/>{j.category}</li>
                                <li style={{ float: 'left', marginRight: '0.8rem' }}><i className="mdi mdi-map-marker-radius"/>{j.province}</li>
                                <li>
                                    {
                                        j.isExpiredOffer ?
                                            (<span className="offer expired-offer">Hết hạn báo giá</span>)
                                            : (<span className="offer receiving-offer">Đang nhận báo giá</span>)
                                    }

                                </li>
                            </ul>
                        </div>
                        <div className="media-text" style={{ clear: 'left' }}>
                            <p>{j.content}</p>
                            <Link
                                to={`/job-freelance/${j._id}`}
                                className="text-warning"
                            >
                                Xem thêm
                            </Link>
                        </div>
                        <div className="media" style={{ border: 'none', padding: 0 }}>
                            <div className="media-left ">
                                <Link to={`/job-freelance/${j._id}`}>
                                    <img
                                        className="media-object avatar avatar-32"
                                        src={avatarUri}
                                        alt={name}
                                        style={{ width: '3rem', height: 'auto' }}
                                    />
                                </Link>
                            </div>
                            <div className="media-body">
                                <h4 className="media-heading">{name}</h4>
                                <p style={{ fontSize: '0.8rem' }}>{`${province}, VN | Đã đăng 1 việc`}</p>
                            </div>
                        </div>
                    </div>
                    <div className="media-right">
                        <ul>
                            <li className="highlight">
                                <i className="mdi mdi-cash-multiple"/>
                                {`₫${moneyFormater(j.priceExpected)}`}
                            </li>
                            <li>
                                <i className="mdi mdi-calendar-clock"/>
                                {`Hạn nộp: ${j.deadlineOffer}`}
                            </li>
                            <li>
                                <i className="mdi mdi-bullhorn"/>
                                Số lượng báo giá: 2/20
                            </li>
                        </ul>
                        <div className="btn-quote-wrap">
                            {
                                j.isExpiredOffer ? null : (
                                    <Link
                                        to={`/job-freelance/${j._id}`}
                                        className="btn btn-primary btn-quote"
                                    >
                                        GỬI BÁO GIÁ
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                </li>
            )
        });

        return (
            <div>
                <section className="section-main section-top-banner no-overlay home-banner">
                    <div className="container banner-wrapper">
                        <div className="my-banner">
                            <h1 className="page-title" style={{ color: 'white' }}>Danh sách việc freelance</h1>
                            <p className="caption" style={{ color: 'white' }}>Tips: Báo giá sát nhất với giá đề xuất luôn được khách hàng ưu tiên xem xét trước</p>
                        </div>
                    </div>
                </section>
                <div className="container home-wrapper">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 d-xl-block d-md-block col-job-filter">
                            <div className="sidebar">
                                <div className="box">
                                    <h3 className="home-content-title">Chọn lĩnh vực công việc</h3>
                                    <div className="content">
                                        <div className="card-filter" id="jobs-filter" role="tablist" aria-multiselectable="true">
                                            <Collapse
                                                accordion={false}
                                                onChange={this.onChange}
                                                activeKey={this.state.activeKey}
                                            >
                                                {categoriesJSX}
                                            </Collapse>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-9">
                            <h3 className="home-content-title">Tất cả việc freelance</h3>
                            <div className="media-list-wrap style-2">
                                <ul className="media-list">
                                    {jobFreelanceJSX}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default User;

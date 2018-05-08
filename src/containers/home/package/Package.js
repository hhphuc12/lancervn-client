// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import 'rc-collapse/assets/index.css';
import Collapse, { Panel } from 'rc-collapse';
import 'pretty-checkbox/dist/pretty-checkbox.css';
import { moneyFormater, dateFormatter } from '../../../helpers';

class User extends PureComponent<Props, State> {
    state = {
        activeKey: ['0'],
        categorySelected: '',
        packages: [],
    };

    componentDidMount() {
        const {
            enterHomePackage,
            getFullCategoryIfNeed,
            getListPackageIfNeed,
        } = this.props.actions;
        enterHomePackage();
        getFullCategoryIfNeed();
        getListPackageIfNeed();
    }

    componentWillUnmount() {
        this.props.actions.leaveHomePackage();
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
        const { getListPackageIfNeed } = this.props.actions;
        if (id !== this.state.categorySelected) {
            this.setState({ categorySelected: id });
            getListPackageIfNeed(1, name);
        }
        else {
            this.setState({ categorySelected: '' });
            getListPackageIfNeed(1);
        }
    };

    componentWillReceiveProps (nextProps) {
        if (nextProps.packages) {
            this.setState({ packages: nextProps.packages });
        }
    }

    render() {
        const { fullCategories } = this.props;
        const { packages } = this.state;
        console.log({ packages });
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
        const packagesJSX = packages.map((p, index) => {
            const { avatarUri, name, province } = p.userPost;
            return (
                <li className="media media-featured" key={index}>
                    <div className="text-featured">Được tài trợ</div>
                    <div className="media-body">
                        <h4 className="media-heading item-title">
                            <a href="https://freelancerviet.vn/viec-freelance/36438-1525664171-i-need-a-programmer.html">
                                {p.name}
                            </a>
                        </h4>
                        <div style={{ padding: '0.5rem 0' }}>
                            <ul className="media-stats list-unstyled horizontal item-stats">
                                <li style={{ float: 'left', marginRight: '0.8rem' }}><i className="mdi mdi-tag-outline"/>{p.category}</li>
                            </ul>
                        </div>
                        <p style={{ clear: 'left', color: '#000' }}>{`Đối tượng KH: ${p.target}`}</p>
                        <div className="media-text">
                            <p>{`KH nhận được: ${p.expectedResult}`}</p>
                            <a
                                href="https://freelancerviet.vn/viec-freelance/36438-1525664171-i-need-a-programmer.html"
                                className="text-warning"
                            >
                                Xem thêm
                            </a>
                        </div>
                        <div className="media" style={{ border: 'none', padding: 0 }}>
                            <div className="media-left ">
                                <a href="https://freelancerviet.vn/viec-freelance/36438-1525664171-i-need-a-programmer.html">
                                    <img
                                        className="media-object avatar avatar-32"
                                        src={avatarUri}
                                        alt={name}
                                        style={{ width: '3rem', height: 'auto' }}
                                    />
                                </a>
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
                                {`₫${moneyFormater(p.priceExpected)}`}
                            </li>
                            <li>
                                <i className="mdi mdi-bullhorn"/>
                                Số lượng đặt hàng:
                            </li>
                        </ul>
                        <div className="btn-quote-wrap">
                            <a
                                href="https://freelancerviet.vn/viec-freelance/36438-1525664171-i-need-a-programmer.html"
                                className="btn btn-primary btn-quote"
                            >
                                ĐẶT HÀNG NGAY
                            </a>
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
                            <h1 className="page-title" style={{ color: 'white' }}>Danh sách gói công việc</h1>
                            <p className="caption" style={{ color: 'white' }}>Tips: Những gói công việc thật sự có chất lượng luôn có số lượng đặt hàng cao</p>
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
                            <h3 className="home-content-title">Tất cả gói công việc</h3>
                            <div className="media-list-wrap style-2">
                                <ul className="media-list">
                                    {packagesJSX}
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

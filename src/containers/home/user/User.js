// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import 'rc-collapse/assets/index.css';
import Collapse, { Panel } from 'rc-collapse';
import 'pretty-checkbox/dist/pretty-checkbox.css';
import Rating from 'react-rating';
import { MaterialProgress } from "../../../components";

class User extends PureComponent<Props, State> {
    state = {
        activeKey: ['0'],
        categorySelected: '',
        listFreelancer: [],
        page: 1,
        search: '',
        category: '',
    };

    componentDidMount() {
        const {
            enterHomeUser,
            getFullCategoryIfNeed,
            getListFreelancerIfNeed,
        } = this.props.actions;
        const { page, search, category } = this.state;
        enterHomeUser();
        getFullCategoryIfNeed();
        getListFreelancerIfNeed(page, search, category);
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

    onSearch = async (
        event: SyntheticEvent<>
    ) => {
        const search = event.target.value;
        this.setState({ search });
        if (event.key === 'Enter') {
            this.fetchListFreelancer(null, null, search);
        }
    };

    onCategoryChange =  async (id, name) => {
        if (id !== this.state.categorySelected) {
            await this.setState({ categorySelected: id, category: name });
            this.fetchListFreelancer(null, name, null);
        }
        else {
            this.setState({ categorySelected: '' });
        }
    };

    fetchListFreelancer = (_page, _category, _search) => {
        const {getListFreelancerIfNeed, errorBadRequest} = this.props.actions;
        try {
            const page = _page || this.state.page;
            const category = _category || this.state.category;
            const search = _search || this.state.search;
            getListFreelancerIfNeed(page, category, search);
        } catch (error) {
            errorBadRequest();
            /* eslint-disable no-console */
            console.log('get list freelancer went wrong..., error: ', error);
            /* eslint-enable no-console */
        }
    };

    componentWillReceiveProps (nextProps) {
        if (nextProps.listFreelancer) {
            this.setState({listFreelancer: nextProps.listFreelancer});
        }
    }

    render() {
        const { fullCategories } = this.props;
        const { listFreelancer } = this.state;
        if (fullCategories.length === 0 || listFreelancer.length === 0)
            return (
                <div className="container loading-wrapper home-loading">
                    <MaterialProgress/>
                </div>
            );

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
        const freelancerJSX = listFreelancer.map((f, index) => (
            <li className="media" key={index}>
                <div className="media-left">
                    <Link to={`/freelancer/${f._id}`}>
                        <img className="avatar" src={f.avatarUri || '/images/faces/male-avatar.png'} alt={f.name}/>
                    </Link>
                </div>
                <div className="media-body">
                    <div className="media-heading form-inline">
                        <h4 style={{ float: 'left' }}>
                            <Link to={`/freelancer/${f._id}`} style={{ textDecoration: 'none' }}>
                                {f.name}
                            </Link>
                        </h4>
                        <div className="location-wrapper">
                            <i className="mdi mdi-map-marker-radius"/>
                            <span>{`${f.province}, VN`}</span>
                        </div>
                    </div>
                    <h5 className="text-primary">{f.occupation}</h5>
                    <div className="media-text">
                        {f.description}
                    </div>
                    <div className="media-cloud">
                        <span className="media-cloud-title">Dịch vụ cung cấp:</span>
                        {
                            f.category.map((c, index) => (<span className="cloud-tag" key={index}>{c}</span>))
                        }
                    </div>
                    <div className="rating-wrap">
                        <span className="rating-title">Đánh giá:</span>
                        <div className="rating-container">
                            <Rating
                                readonly={true}
                                initialRating={5}
                                emptySymbol={<i className="mdi mdi-star-outline rating-item text-success"/>}
                                fullSymbol={<i className="mdi mdi-star rating-item text-success"/>}
                            />
                        </div>
                    </div>
                    <div style={{ marginTop: '0.3rem' }}>
                        <Link to={`/freelancer/${f._id}`} style={{ textDecoration: 'none' }}>
                            (1 nhận xét)
                        </Link>
                        <span style={{ margin: '1rem' }}>|</span>
                        <Link to={`/freelancer/${f._id}`} className="text-warning"  style={{ textDecoration: 'none' }}>
                            <span>XEM HỒ SƠ</span>
                            <i className="mdi mdi-arrow-right text-warning"/>
                        </Link>
                    </div>
                </div>
            </li>
        ));

        return (
            <div>
                <section className="section-main section-top-banner no-overlay home-banner">
                    <div className="container banner-wrapper">
                        <div className="my-banner">
                            <h1 className="page-title" style={{ color: 'white' }}>Đội ngũ freelancer</h1>
                            <p className="caption" style={{ color: 'white' }}>Tips: Những freelancer tận tâm & chuyên nghiệp nhất luôn được đánh giá rất cao</p>
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
                            <h3 className="home-content-title">Tất cả freelancer</h3>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend bg-primary border-primary">
                                        <span className="input-group-text bg-transparent">
                                            <i className="fa fa-search text-white"/>
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nhập thông tin tìm kiếm"
                                        aria-label="Tìm kiếm"
                                        aria-describedby="colored-addon2"
                                        onKeyPress={e => this.onSearch(e)}
                                    />
                                </div>
                            </div>
                            <div className="media-list-wrap style-2">
                                <ul className="media-list ">
                                    { freelancerJSX }
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

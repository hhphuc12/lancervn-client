// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import 'rc-collapse/assets/index.css';
import Collapse, { Panel } from 'rc-collapse';
import 'pretty-checkbox/dist/pretty-checkbox.css';

class User extends PureComponent<Props, State> {
    state = {
        activeKey: ['0'],
        categorySelected: '',
    };

    componentDidMount() {
        const {
            enterHomeUser,
            getFullCategoryIfNeed,
        } = this.props.actions;
        enterHomeUser();
        getFullCategoryIfNeed();
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

    onCategoryChange = id => {
        this.setState({ categorySelected: id }, console.log(this.state.categorySelected));
    };

    render() {
        const { fullCategories } = this.props;
        const categoriesJSX = fullCategories.map((cate, index) => {
            const childJSX = cate.child.map((child, i) => (
                <div className="form-group" key={i}>
                    <div className="pretty p-icon p-round p-smooth">
                        <input
                            type="checkbox"
                            checked={this.state.categorySelected === child.id}
                            onChange={() => this.onCategoryChange(child.id)} />
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

        return (
            <div className="home-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 d-xl-block d-md-block col-job-filter">
                            <div className="sidebar">
                                <div className="box">
                                    <h3>Chọn lĩnh vực công việc</h3>
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
                            <h3>Tất cả freelancer</h3>
                            <div className="media-list-wrap style-2">
                                <ul className="media-list ">
                                    <li className="media">
                                        <div className="media-left">
                                            <a href="https://freelancerviet.vn/freelancer/165727-nguyen-thi-loan.html"><img className="avatar" src="https://fvstaticws.freelancerviet.vn/fv3uploads/uploads/datas/users2/165/727/thumb_15110154856526615638521967075852n_WvADchqZ3C.jpg" alt="Nguyễn Thị Loan"/></a>
                                        </div>
                                        <div className="media-body">
                                            <ul className="media-stats list-unstyled horizontal mobile-text-center">
                                                <li>
                                                    <h4 className="media-heading item-title"><a href="https://freelancerviet.vn/freelancer/165727-nguyen-thi-loan.html">Nguyễn Thị Loan</a></h4></li>
                                                <li><i className="ion-ios-location-outline"/> Hà Nội, VN</li>
                                                <li><i className="small-icon icon-verify"/></li>
                                            </ul>
                                            <h5 className="media-subheading text-primary mobile-text-center">Marketer</h5>
                                            <div className="media-text ">Vui vẻ, hòa đồng và trách nhiệm Mục tiêu tham gia: freelancerviet.vn để kiếm thật nhiều việc làm, gia tăng thu nhập. Tâm đắc câu &amp;quot;You Are What You Think&amp;quot;</div>
                                            <div className="media-cloud"><span>Top kỹ năng:</span><span className="cloud-tag">Thiết kế logo</span><span className="cloud-tag">Thiết kế website</span><span className="cloud-tag">Thiết kế banner,poster</span></div>
                                            <ul className="media-stats list-unstyled horizontal style-2">
                                                <li>
                                                    <div className="rating-wrap"><span>Đánh giá:</span>
                                                        <div className="rating-container rating-xs rating-animate rating-disabled">
                                                            <div className="rating"><span className="empty-stars"><span className="star"><i className="ion-android-star-outline"/></span><span className="star"><i className="ion-android-star-outline"/></span><span className="star"><i className="ion-android-star-outline"/></span><span className="star"><i className="ion-android-star-outline"/></span><span className="star"><i className="ion-android-star-outline"/></span></span><span className="filled-stars" style={{ width: '100%' }}><span className="star"><i className="ion-android-star"/></span><span className="star"><i className="ion-android-star"/></span><span className="star"><i className="ion-android-star"/></span><span className="star"><i className="ion-android-star"/></span><span className="star"><i className="ion-android-star"/></span></span>
                                                            </div>
                                                            <input type="hidden" className="input-rating hide" data-size="xs" disabled="disabled" data-show-clear="false" data-show-caption="false" value="5"/>
                                                        </div><a href="https://freelancerviet.vn/freelancer/165727-nguyen-thi-loan.html">(1 nhận xét)</a></div>
                                                </li>
                                                <li><a href="https://freelancerviet.vn/freelancer/165727-nguyen-thi-loan.html" className="text-warning">XEM HỒ SƠ <i className="ion-android-arrow-forward"/></a></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="media">
                                        <div className="media-left">
                                            <a href="https://freelancerviet.vn/freelancer/112033-tran-thi-diep-anh.html"><img className="avatar" src="https://fvstaticws.freelancerviet.vn/fv3uploads/uploads/datas/users2/112/033/thumb_a104_75AepFR0fz.jpg" alt="Trần Thị Diệp Anh"/></a>
                                        </div>
                                        <div className="media-body">
                                            <ul className="media-stats list-unstyled horizontal mobile-text-center">
                                                <li>
                                                    <h4 className="media-heading item-title"><a href="https://freelancerviet.vn/freelancer/112033-tran-thi-diep-anh.html">Trần Thị Diệp Anh</a></h4></li>
                                                <li><i className="ion-ios-location-outline"/> Hà Nội, VN</li>
                                            </ul>
                                            <h5 className="media-subheading text-primary mobile-text-center">kinh doanh online</h5>
                                            <div className="media-text ">Hiện đang là sinh viên năm nhất , có vốn tiếng anh , muốn nhận dịch thuật để nâng cao kinh nghiệm. CÓ kinh nghiệm viết pr sản phẩm online</div>
                                            <div className="media-cloud"><span>Top kỹ năng:</span><span className="cloud-tag">Viết bài PR</span><span className="cloud-tag">Blog</span><span className="cloud-tag">Nội dung website</span></div>
                                            <ul className="media-stats list-unstyled horizontal style-2">
                                                <li>
                                                    <div className="rating-wrap"><span>Đánh giá:</span>
                                                        <div className="rating-container rating-xs rating-animate rating-disabled">
                                                            <div className="rating">
                                                            <span className="empty-stars">
                                                                <span className="star">
                                                                    <i className="ion-android-star-outline"/>
                                                                </span>
                                                                <span className="star">
                                                                    <i className="ion-android-star-outline"/>
                                                                </span>
                                                                <span className="star">
                                                                    <i className="ion-android-star-outline"/>
                                                                </span>
                                                                <span className="star">
                                                                    <i className="ion-android-star-outline"/>
                                                                </span>
                                                                <span className="star">
                                                                    <i className="ion-android-star-outline"/>
                                                                </span>
                                                            </span>
                                                                <span className="filled-stars" style={{ width: '100%' }}>
                                                                <span className="star">
                                                                    <i className="ion-android-star"/>
                                                                </span>
                                                                <span className="star">
                                                                    <i className="ion-android-star"/>
                                                                </span>
                                                                <span className="star">
                                                                    <i className="ion-android-star"/>
                                                                </span><span className="star">
                                                                <i className="ion-android-star"/>
                                                            </span>
                                                                <span className="star">
                                                                    <i className="ion-android-star"/>
                                                                </span>
                                                            </span>
                                                            </div>
                                                            <input type="hidden" className="input-rating hide" data-size="xs" disabled="disabled" data-show-clear="false" data-show-caption="false" value="5"/>
                                                        </div>
                                                        <a href="https://freelancerviet.vn/freelancer/112033-tran-thi-diep-anh.html">(2 nhận xét)</a>
                                                    </div>
                                                </li>
                                                <li><a href="https://freelancerviet.vn/freelancer/112033-tran-thi-diep-anh.html" className="text-warning">XEM HỒ SƠ <i className="ion-android-arrow-forward"/></a></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="media">
                                        <div className="media-left">
                                            <a href="https://freelancerviet.vn/freelancer/159085-nguyen-linh.html"><img className="avatar" src="https://fvstaticws.freelancerviet.vn/fv3uploads/uploads/datas/users2/159/085/thumb_906143579540997.jpg" alt="Nguyen Linh"/></a>
                                        </div>
                                        <div className="media-body">
                                            <ul className="media-stats list-unstyled horizontal mobile-text-center">
                                                <li>
                                                    <h4 className="media-heading item-title"><a href="https://freelancerviet.vn/freelancer/159085-nguyen-linh.html">Nguyen Linh</a></h4></li>
                                                <li><i className="ion-ios-location-outline"/> Hồ Chí Minh, VN</li>
                                            </ul>
                                            <h5 className="media-subheading text-primary mobile-text-center">Junior Creative Content</h5>
                                            <div className="media-text ">Là một người yêu thích sắp xếp và sáng tạo con chữ. Và tôi được làm công việc yêu thích này từ năm cấp 3 khi cộng tác với một vài tờ báo, đến nay tôi vẫn đang được làm việc liên quan đến viết lách.</div>
                                            <div className="media-cloud"><span>Top kỹ năng:</span><span className="cloud-tag">Copywriting</span><span className="cloud-tag">Viết bài PR</span><span className="cloud-tag">Nội dung website</span></div>
                                            <ul className="media-stats list-unstyled horizontal style-2">
                                                <li>
                                                    <div className="rating-wrap"><span>Đánh giá:</span>
                                                        <div className="rating-container rating-xs rating-animate rating-disabled">
                                                            <div className="rating">
                                                            <span className="empty-stars">
                                                                <span className="star">
                                                                    <i className="ion-android-star-outline"/>
                                                                </span>
                                                                <span className="star">
                                                                    <i className="ion-android-star-outline"/>
                                                                </span>
                                                                <span className="star">
                                                                    <i className="ion-android-star-outline"/>
                                                                </span><span className="star">
                                                                <i className="ion-android-star-outline"/>
                                                            </span>
                                                                <span className="star">
                                                                    <i className="ion-android-star-outline"/>
                                                                </span>
                                                            </span>
                                                                <span className="filled-stars" style={{ width: '100%' }}>
                                                                <span className="star">
                                                                    <i className="ion-android-star"/>
                                                                </span>
                                                                <span className="star">
                                                                    <i className="ion-android-star"/>
                                                                </span>
                                                                <span className="star">
                                                                    <i className="ion-android-star"/>
                                                                </span>
                                                                <span className="star">
                                                                    <i className="ion-android-star"/>
                                                                </span>
                                                                <span className="star">
                                                                    <i className="ion-android-star"/>
                                                                </span>
                                                            </span>
                                                            </div>
                                                            <input type="hidden" className="input-rating hide" data-size="xs" disabled="disabled" data-show-clear="false" data-show-caption="false" value="5"/>
                                                        </div><a href="https://freelancerviet.vn/freelancer/159085-nguyen-linh.html">(1 nhận xét)</a></div>
                                                </li>
                                                <li><a href="https://freelancerviet.vn/freelancer/159085-nguyen-linh.html" className="text-warning">XEM HỒ SƠ <i className="ion-android-arrow-forward"/></a></li>
                                            </ul>
                                        </div>
                                    </li>
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

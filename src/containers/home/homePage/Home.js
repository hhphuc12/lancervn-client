// @flow strong

// #region imports
import React, { PureComponent } from 'react';

class Home extends PureComponent<Props, State> {
    componentDidMount() {
        this.props.actions.enterHomePage();
    }

    componentWillUnmount() {
        this.props.actions.leaveHomePage();
    }

    render() {
        return (
            <div>
                <section id="top_content" className="top_cont_outer">
                    <div className="top_cont_inner">
                        <div className="container">
                            <div className="top_content">
                                <div className="row">
                                    <div className="col-lg-5 col-sm-7">
                                        <div className="top_left_cont flipInY wow animated">
                                            <h3>Dễ dàng &amp; nhanh chóng!</h3>
                                            <h2 style={{ color: '#fff' }}>đội ngũ freelancer tâm huyết<br/>&amp; giàu kinh nghiệm</h2>
                                            <p style={{ color: '#e2e2e2' }}>
                                                Sự thoải mái và hài lòng của khách hàng là tiêu chí hàng đầu của chúng tôi.<br/>
                                                Mọi nhu cầu công việc của bạn đều được đáp ứng nhanh chóng, thao tác dễ dàng.
                                            </p>
                                            <a href="#service" className="learn_more2">Tìm hiểu ngay</a></div>
                                    </div>
                                    <div className="col-lg-7 col-sm-5"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="service">
                    <div className="container">
                        <h2>Thao tác đơn giản</h2>
                        <div className="service_area">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="service_block">
                                        <div className="service_icon delay-03s animated wow  zoomIn" style={{ border: 0 }}>
                                            <img src="/images/home/edit.png" alt=""/>
                                        </div>
                                        <h3 className="animated fadeInUp wow">Mô tả yêu cầu công việc</h3>
                                        <p className="animated fadeInDown wow">Giúp các freelancer biết chính xác những gì bạn cần.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="service_block">
                                        <div className="service_icon icon2  delay-03s animated wow zoomIn" style={{ border: 0 }}>
                                            <img src="/images/home/choose.png" alt=""/>
                                        </div>
                                        <h3 className="animated fadeInUp wow">Nhận/Duyệt báo giá</h3>
                                        <p className="animated fadeInDown wow">Xem xét và đưa ra quyết định về những bản báo giá gửi cho bạn.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="service_block">
                                        <div className="service_icon icon3  delay-03s animated wow zoomIn" style={{ border: 0 }}>
                                            <img src="/images/home/work.png" alt=""/>
                                        </div>
                                        <h3 className="animated fadeInUp wow">Trao đổi và làm việc</h3>
                                        <p className="animated fadeInDown wow">Luôn trao đổi để làm rõ các yêu cầu của bạn khi làm việc với freelancer.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="work_outer">
                    <div className="top_cont_latest">
                        <div className="container">
                            <h2>Trở thành freelancer</h2>
                            <div className="work_section">
                                <div className="row">
                                    <div className="col-lg-6 col-sm-6 wow fadeInLeft delay-05s">
                                        <div className="service-list">
                                            <div className="service-list-col1"><i className="mdi mdi-trophy"/></div>
                                            <div className="service-list-col2">
                                                <h3>Cơ hội việc làm</h3>
                                                <p>Tiếp cận lượng khách hàng dồi dào và đa dạng, đáp ứng mọi nhu cầu việc làm của bạn.</p>
                                            </div>
                                        </div>
                                        <div className="service-list">
                                            <div className="service-list-col1"><i className="mdi mdi-bookmark-check"/></div>
                                            <div className="service-list-col2">
                                                <h3>Độ tin cậy</h3>
                                                <p>Luôn đảm bảo các quyền lợi của bạn ở mức tối đa.</p>
                                            </div>
                                        </div>
                                        <div className="service-list">
                                            <div className="service-list-col1"><i className="mdi mdi-clock"/></div>
                                            <div className="service-list-col2">
                                                <h3>24/7 hỗ trợ</h3>
                                                <p>Giải đáp các thắc mắc của bạn mọi lúc mọi nơi.</p>
                                            </div>
                                        </div>
                                        <div className="service-list">
                                            <div className="service-list-col1"><i className="mdi mdi-image-filter-vintage"/></div>
                                            <div className="service-list-col2">
                                                <h3>Nâng cấp VIP</h3>
                                                <p>Hưởng những dịch vụ và ưu đãi cực tốt với các gói VIP.</p>
                                            </div>
                                        </div>
                                        <div className="work_bottom"><span>Bạn đã sẵn sàng?</span>
                                            <a href="#contact" className="contact_btn">Đăng ký ngay</a>
                                        </div>
                                    </div>
                                    <figure className="col-lg-6 col-sm-6  text-right wow fadeInUp delay-02s"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="Portfolio" className="content">
                    <div className="container portfolio-title">
                        <div className="section-title">
                            <h2>Tìm kiếm freelancer hàng đầu</h2>
                        </div>
                    </div>

                    <div className="portfolio-top"/>
                    <div className="portfolio">
                        <div id="filters" className="sixteen columns">
                            <ul className="clearfix">
                                <li>
                                    <a id="all" href="#" data-filter="*" className="active">
                                        <h5>Tất cả</h5>
                                    </a>
                                </li>
                                <li>
                                    <a className="" href="#" data-filter=".lap-trinh">
                                        <h5>Lập trình</h5>
                                    </a>
                                </li>
                                <li>
                                    <a className="" href="#" data-filter=".kien-truc">
                                        <h5>Kiến trúc</h5>
                                    </a>
                                </li>
                                <li>
                                    <a className="" href="#" data-filter=".nhiep-anh">
                                        <h5>Nhiếp ảnh</h5>
                                    </a>
                                </li>
                                <li>
                                    <a className="" href="#" data-filter=".marketing">
                                        <h5>Marketing</h5>
                                    </a>
                                </li>
                                <li>
                                    <a className="" href="#" data-filter=".gia-su">
                                        <h5>Gia sư</h5>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="isotope test1" id="portfolio-wrap">
                            <div
                                className="portfolio-item one-four  gia-su isotope-item test3">
                                <div className="portfolio-image"><img src="/images/cate/gsta.jpg" alt="Portfolio 1"/></div>
                                <div className="project-overlay">
                                    <div className="open-project-link">
                                        <a className="open-project"
                                            href="http://clapat.ro/themes/newave/project-video-expander.html"
                                            title="Open Project"/>
                                    </div>
                                    <div className="project-info">
                                        <div className="zoom-icon"/>
                                        <h4 className="project-name">Gia sư</h4>
                                        <p className="project-categories">Gia sư Tiếng Anh</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="portfolio-item one-four  kien-truc  isotope-item test4">
                                <div className="portfolio-image"><img src="/images/cate/ktct.jpg" alt="Portfolio 1"/></div>
                                <div className="project-overlay">
                                    <div className="open-project-link">
                                        <a className="open-project"
                                           href="http://clapat.ro/themes/newave/project-normal-expander-1.html"
                                           title="Open Project"/>
                                    </div>
                                    <div className="project-info">
                                        <div className="zoom-icon"/>
                                        <h4 className="project-name">Kiến trúc</h4>
                                        <p className="project-categories">Kiến trúc công trình</p>
                                    </div>
                                </div>
                            </div>
                            <div className="portfolio-item one-four lap-trinh isotope-item test2">
                                <div className="portfolio-image"><img src="/images/cate/embedded.jpg" alt="Portfolio 1"/></div>
                                <a title="Starbucks Coffee" rel="prettyPhoto[galname]"
                                   href="http://clapat.ro/themes/newave/images/portfolio/portfolio2.jpg">
                                    <div className="project-overlay">
                                        <div className="project-info">
                                            <div className="zoom-icon"/>
                                            <h4 className="project-name">Lập trình</h4>
                                            <p className="project-categories">Lập trình nhúng</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div
                                className="portfolio-item one-four  gia-su  branding web isotope-item test5">
                                <div className="portfolio-image"><img src="/images/cate/gstn.jpg" alt="Portfolio 1"/></div>
                                <div className="project-overlay">
                                    <div className="open-project-link">
                                        <a className="open-project"
                                           href="http://clapat.ro/themes/newave/project-fullscreen-expander-1.html"
                                           title="Open Project"/>
                                    </div>
                                    <div className="project-info">
                                        <div className="zoom-icon"/>
                                        <h4 className="project-name">Gia sư</h4>
                                        <p className="project-categories">Gia sư Tiếng Nhật</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="portfolio-item one-four  kien-truc isotope-item test6">
                                <div className="portfolio-image"><img src="/images/cate/ktno.jpg" alt="Portfolio 1"/></div>
                                <div className="project-overlay">
                                    <div className="open-project-link">
                                        <a className="open-project"
                                           href="http://clapat.ro/themes/newave/project-fullscreen-expander-2.html"
                                           title="Open Project"/>
                                    </div>
                                    <div className="project-info">
                                        <div className="zoom-icon"/>
                                        <h4 className="project-name">Kiến trúc</h4>
                                        <p className="project-categories">Kiến trúc nhà ở</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="portfolio-item one-four  marketing isotope-item test7">
                                <div className="portfolio-image"><img src="/images/cate/mo.jpg" alt="Portfolio 1"/></div>
                                <div className="project-overlay">
                                    <div className="open-project-link">
                                        <a className="open-project"
                                           href="http://clapat.ro/themes/newave/project-normal-expander-2.html"
                                           title="Open Project"/>
                                    </div>
                                    <div className="project-info">
                                        <div className="zoom-icon"/>
                                        <h4 className="project-name">Marketing</h4>
                                        <p className="project-categories">Marketing online</p>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="portfolio-item one-four  lap-trinh web isotope-item test8">
                                <div className="portfolio-image"><img src="/images/cate/mobile.jpg" alt="Portfolio 1"/></div>
                                <a href="http://clapat.ro/themes/newave/project-external-1.html" className="external">
                                    <div className="project-overlay">
                                        <div className="project-info">
                                            <div className="zoom-icon"/>
                                            <h4 className="project-name">Lập trình</h4>
                                            <p className="project-categories">Lập trình mobile</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div
                                className="portfolio-item one-four   nhiep-anh isotope-item test9">
                                <div className="portfolio-image"><img src="/images/cate/nacd.jpg" alt="Portfolio 1"/></div>
                                <a title="Stereo Headphones" rel="prettyPhoto[galname]"
                                   href="http://clapat.ro/themes/newave/images/portfolio/portfolio8.jpg">
                                    <div className="project-overlay">
                                        <div className="project-info">
                                            <div className="zoom-icon"/>
                                            <h4 className="project-name">Nhiếp ảnh</h4>
                                            <p className="project-categories">Chụp ảnh chân dung</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div
                                className="portfolio-item one-four  lap-trinh isotope-item test10">
                                <div className="portfolio-image"><img src="/images/cate/web.jpg" alt="Portfolio 1"/></div>
                                <div className="project-overlay">
                                    <div className="open-project-link">
                                        <a className="open-project"
                                           href="http://clapat.ro/themes/newave/project-fullscreen-expander-2.html"
                                           title="Open Project"/>
                                    </div>
                                    <div className="project-info">
                                        <div className="zoom-icon"/>
                                        <h4 className="project-name">Lập trình</h4>
                                        <p className="project-categories">Lập trình web</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="portfolio-item one-four  nhiep-anh isotope-item test11">
                                <div className="portfolio-image"><img src="/images/cate/nagd.jpg" alt="Portfolio 1"/></div>
                                <div className="project-overlay">
                                    <div className="open-project-link">
                                        <a className="open-project"
                                           href="http://clapat.ro/themes/newave/project-normal-expander-2.html"
                                           title="Open Project"/>
                                    </div>
                                    <div className="project-info">
                                        <div className="zoom-icon"/>
                                        <h4 className="project-name">Nhiếp ảnh</h4>
                                        <p className="project-categories">Chụp ảnh gia đình</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="portfolio-item one-four  lap-trinh web isotope-item test12">
                                <div className="portfolio-image"><img src="/images/cate/wordpress.jpg" alt="Portfolio 1"/></div>
                                <a href="http://clapat.ro/themes/newave/project-external-1.html" className="external">
                                    <div className="project-overlay">
                                        <div className="project-info">
                                            <div className="zoom-icon"/>
                                            <h4 className="project-name">Lập trình</h4>
                                            <p className="project-categories">Lập trình wordpress</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div
                                className="portfolio-item one-four   nhiep-anh isotope-item test13">
                                <div className="portfolio-image"><img src="/images/cate/nahn.jpg" alt="Portfolio 1"/></div>
                                <a title="Stereo Headphones" rel="prettyPhoto[galname]"
                                   href="http://clapat.ro/themes/newave/images/portfolio/portfolio8.jpg">
                                    <div className="project-overlay">
                                        <div className="project-info">
                                            <div className="zoom-icon"/>
                                            <h4 className="project-name">Nhiếp ảnh</h4>
                                            <p className="project-categories">Chụp ảnh hội nghị</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="portfolio-bottom"/>
                    <div id="project-page-holder">
                        <div className="clear"/>
                        <div id="project-page-data"/>
                    </div>
                </section>

                <section className="main-section" id="client_outer">
                    <h2>Khách hàng nói về chúng tôi</h2>
                    <div className="client_area ">
                        <div className="client_section animated  fadeInUp wow">
                            <div className="client_profile">
                                <div className="client_profile_pic"><img src="/images/faces/anh.jpg" alt=""/></div>
                                <h3>Lê Thế Anh</h3>
                                <span>Đồng sáng lập ezPark</span></div>
                            <div className="quote_section">
                                <div className="quote_arrow"/>
                                <p><b><img src="/img/quote_sign_left.png" alt=""/></b> Tôi đã nhận được những hỗ trợ rất tận tình
                                    từ đội ngũ freelancer trên lancerVN, các bạn là những con người tuyệt vời. Chúc lancerVN
                                    ngày càng lớn mạnh và phổ cập mô hình freelancer đến tất cả mọi người. <small><img
                                        src="/img/quote_sign_right.png" alt=""/></small></p>
                            </div>
                            <div className="clear"/>
                        </div>
                        <div className="client_section animated  fadeInDown wow">
                            <div className="client_profile flt">
                                <div className="client_profile_pic"><img src="/images/faces/trang.jpg" alt=""/></div>
                                <h3>Dương Quỳnh Trang</h3>
                                <span>Founder 9 Carat Beauty Spa</span></div>
                            <div className="quote_section flt">
                                <div className="quote_arrow2"/>
                                <p><b><img src="/img/quote_sign_left.png" alt=""/></b> Mô hình freelancer thật sự là một cái gì đó
                                    rất mới ở Việt Nam. LancerVN là một nơi thật đặc biệt, tôi đã tìm được 1 team lập trình
                                    di động khá tốt ở đây để phát triển ứng dụng 9 Carat Beauty Spa. <small><img
                                        src="/img/quote_sign_right.png" alt=""/></small></p>
                            </div>
                            <div className="clear"/>
                        </div>
                        <div className="client_section animated  fadeInUp wow">
                            <div className="client_profile">
                                <div className="client_profile_pic"><img src="/images/faces/hai.jpg" alt=""/></div>
                                <h3>Tạ Phước Hải</h3>
                                <span>Đồng sáng lập KitFe</span></div>
                            <div className="quote_section">
                                <div className="quote_arrow"/>
                                <p><b><img src="/img/quote_sign_left.png" alt=""/></b> LancerVN mới được đưa vào hoạt động nhưng
                                    tốc độ phát triển thật không tưởng. Freelancer ở đây phủ khắp các lĩnh vực, tận tâm và
                                    chuyên nghiệp. Hãy cứ tiến lên, thành công luôn trước mắt các bạn. <small><img
                                        src="/img/quote_sign_right.png" alt=""/></small></p>
                            </div>
                            <div className="clear"/>
                        </div>
                    </div>
                </section>

                <div className="c-logo-part">
                    <div className="container">
                        <ul className="delay-06s animated  bounce wow">
                            <li><a href="javascript:void(0)"><img src="/images/home/sctv4.jpeg" alt=""/></a></li>
                            <li><a href="javascript:void(0)"><img src="/images/home/htv9.png" alt=""/></a></li>
                            <li><a href="javascript:void(0)"><img src="/images/home/vn-news.jpg" alt=""/></a></li>
                            <li><a href="javascript:void(0)"><img src="/images/home/tuoi-tre.png" alt=""/></a></li>
                        </ul>
                    </div>
                </div>
                <section className="main-section team" id="team">
                    <div className="container">
                        <h2>Amazing Team</h2>
                        <h6>Take a closer look into our amazing team. We won’t bite.</h6>
                        <div className="team-leader-block clearfix">
                            <div className="team-leader-box">
                                <div className="team-leader wow fadeInDown delay-03s">
                                    <div className="team-leader-shadow"><a href="javascript:void(0)"/></div>
                                    <img src="/img/team-leader-pic1.jpg" alt=""/>
                                        <ul>
                                            <li><a href="javascript:void(0)" className="fa-twitter"/></li>
                                            <li><a href="javascript:void(0)" className="fa-facebook"/></li>
                                            <li><a href="javascript:void(0)" className="fa-pinterest"/></li>
                                            <li><a href="javascript:void(0)" className="fa-google-plus"/></li>
                                        </ul>
                                </div>
                                <h3 className="wow fadeInDown delay-03s">Walter White</h3>
                                <span className="wow fadeInDown delay-03s">Chief Executive Officer</span>
                                <p className="wow fadeInDown delay-03s">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Proin consequat sollicitudin cursus. Dolor sit amet, consectetur adipiscing elit proin
                                    consequat.</p>
                            </div>
                            <div className="team-leader-box">
                                <div className="team-leader  wow fadeInDown delay-06s">
                                    <div className="team-leader-shadow"><a href="javascript:void(0)"/></div>
                                    <img src="/img/team-leader-pic2.jpg" alt=""/>
                                        <ul>
                                            <li><a href="javascript:void(0)" className="fa-twitter"/></li>
                                            <li><a href="javascript:void(0)" className="fa-facebook"/></li>
                                            <li><a href="javascript:void(0)" className="fa-pinterest"/></li>
                                            <li><a href="javascript:void(0)" className="fa-google-plus"/></li>
                                        </ul>
                                </div>
                                <h3 className="wow fadeInDown delay-06s">Jesse Pinkman</h3>
                                <span className="wow fadeInDown delay-06s">Product Manager</span>
                                <p className="wow fadeInDown delay-06s">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Proin consequat sollicitudin cursus. Dolor sit amet, consectetur adipiscing elit proin
                                    consequat.</p>
                            </div>
                            <div className="team-leader-box">
                                <div className="team-leader wow fadeInDown delay-09s">
                                    <div className="team-leader-shadow"><a href="javascript:void(0)"/></div>
                                    <img src="/img/team-leader-pic3.jpg" alt=""/>
                                        <ul>
                                            <li><a href="javascript:void(0)" className="fa-twitter"/></li>
                                            <li><a href="javascript:void(0)" className="fa-facebook"/></li>
                                            <li><a href="javascript:void(0)" className="fa-pinterest"/></li>
                                            <li><a href="javascript:void(0)" className="fa-google-plus"/></li>
                                        </ul>
                                </div>
                                <h3 className="wow fadeInDown delay-09s">Skyler white</h3>
                                <span className="wow fadeInDown delay-09s">Accountant</span>
                                <p className="wow fadeInDown delay-09s">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Proin consequat sollicitudin cursus. Dolor sit amet, consectetur adipiscing elit proin
                                    consequat.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Home;

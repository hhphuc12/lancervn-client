// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import HomeRoutes from '../../routes/HomeRoutes';
import auth from '../../services/auth';

class Home extends PureComponent<Props, State> {
    onLogout = e => {
        e.preventDefault();
        this.props.actions.onLogout();
    };

    render() {
        let avatarUri, lastName;
        const info = auth.getUserInfo();
        if (info) {
            avatarUri = info.avatarUri;
            lastName = info.lastName;
        }
        const { isAuthenticated } = this.props;

        return (
            <div>
                <link href="/css/style-home.css" rel="stylesheet" type="text/css"/>
                <link href="/css/linecons.css" rel="stylesheet" type="text/css"/>
                <link href="/css/font-awesome.css" rel="stylesheet" type="text/css"/>
                <link href="/css/responsive.css" rel="stylesheet" type="text/css"/>
                <link href="/css/animate.css" rel="stylesheet" type="text/css"/>

                <link href='https://fonts.googleapis.com/css?family=Lato:400,900,700,700italic,400italic,300italic,300,100italic,100,900italic' rel='stylesheet' type='text/css'/>
                <link href='https://fonts.googleapis.com/css?family=Dosis:400,500,700,800,600,300,200' rel='stylesheet' type='text/css'/>
                <header id="header_outer" style={{ padding: isAuthenticated ? "20px 0px 10px 0px" : "20px 0px" }}>
                    <div className="container" style={{ maxWidth: '100%' }}>
                        <div className="header_section">
                            <div className="logo">
                                <Link to="/">
                                    <img src="/images/icons/logo.png" alt="" className="logo-home"/>
                                </Link>
                            </div>
                            <nav className="nav" id="nav">
                                <ul style={{ marginTop: '0.3rem', marginBottom:0 }}>
                                    <li><a href="/dashboard/post-job">ĐĂNG VIỆC</a></li>
                                    <li><Link to="/freelancers">TÌM FREELANCER</Link></li>
                                    <li><Link to="/job-freelance">TÌM VIỆC FREELANCE</Link></li>
                                    <li><Link to="/packages">GÓI CÔNG VIỆC</Link></li>
                                    { !isAuthenticated ? (<li style={{ marginRight: 0 }}><a href="/login">Đăng nhập</a></li>) : null }
                                    { !isAuthenticated ? (<span> | </span>) : null }
                                    { !isAuthenticated ? (<li style={{ marginLeft: 0 }}><a href="/register">Đăng ký</a></li>) : null }
                                </ul>
                                { isAuthenticated ? (
                                    <div className="dropdown">
                                        <a href="#" style={{ textDecoration: 'none', color: '#2950e4' }} data-toggle="dropdown">
                                            <div style={{ display: 'flex', marginTop: '-0.4rem' }}>
                                                <img
                                                    src={avatarUri}
                                                    style={{ width: '2.8rem', height: '2.8rem', borderRadius: '100%', margin: '0px 0.8rem' }}
                                                />
                                                <div>
                                                    <p style={{ fontSize: '1rem', fontFamily: 'Nunito', paddingTop: '0.6rem' }}>{lastName}</p>
                                                </div>
                                            </div>
                                        </a>
                                        <div className="dropdown-menu">
                                            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                                                <img className="profile-dropdown-icon float-left" src="/images/icons/dashboard.png" />
                                                <p className="mb-0 font-weight-normal">Dashboard</p>
                                            </Link>
                                            <div className="dropdown-divider"/>
                                            <a href="#" onClick={this.onLogout} style={{ textDecoration: 'none' }}>
                                                <img className="profile-dropdown-icon float-left" src="/images/icons/log_out.png" alt=""/>
                                                <p className="mb-0 font-weight-normal">Đăng xuất</p>
                                            </a>
                                        </div>
                                    </div>
                                ) : null }
                            </nav>
                            <a className="res-nav_click animated wobble wow" href="javascript:void(0)">
                                <i className="fa-bars"/>
                            </a>
                        </div>
                    </div>
                </header>

                <HomeRoutes/>

                <footer className="footer_section" id="contact">
                    <div className="container">
                        <section className="main-section contact" id="contact">
                            <div className="contact_section">
                                <h2>Contact Us</h2>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="contact_block">
                                            <div className="contact_block_icon rollIn animated wow">
                                                <span>
                                                    <i className="fa-home"/>
                                                </span>
                                            </div>
                                            <span> 54 Nguyễn Lương Bằng, <br/>Hoà Khánh Bắc, Liên Chiểu, Đà Nẵng </span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="contact_block">
                                            <div className="contact_block_icon icon2 rollIn animated wow">
                                                <span>
                                                    <i className="fa-phone"/>
                                                </span>
                                            </div>
                                            <span> 0985756430 </span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="contact_block">
                                            <div className="contact_block_icon icon3 rollIn animated wow">
                                                <span>
                                                    <i className="fa-pencil"/>
                                                </span>
                                            </div>
                                            <span> <a href="mailto:hello@butterfly.com"> support@lancervn.com</a> </span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 wow fadeInLeft">
                                    <div className="contact-info-box address clearfix">
                                        <h3>Liên hệ ngay với chúng tôi. Đừng ngần ngại!</h3>
                                        <p>Dù bạn là thành viên của lancerVN hay khách vãng lai, nếu bạn có bất kỳ góp ý hay
                                            thắc mắc nào, vui lòng cho chúng tôi biết. <br/>
                                            Mọi ý kiến đóng góp của bạn sẽ được phản hồi trong 24h. </p>
                                        <p>Chúc một ngày tốt lành!</p>
                                    </div>
                                    <ul className="social-link">
                                        <li className="twitter animated bounceIn wow delay-02s"><a href="javascript:void(0)"><i
                                            className="fa-twitter"/></a></li>
                                        <li className="facebook animated bounceIn wow delay-03s"><a href="javascript:void(0)"><i
                                            className="fa-facebook"/></a></li>
                                        <li className="pinterest animated bounceIn wow delay-04s"><a
                                            href="javascript:void(0)"><i className="fa-pinterest"/></a></li>
                                        <li className="gplus animated bounceIn wow delay-05s"><a href="javascript:void(0)"><i
                                            className="fa-google-plus"/></a></li>
                                        <li className="dribbble animated bounceIn wow delay-06s"><a href="javascript:void(0)"><i
                                            className="fa-dribbble"/></a></li>
                                    </ul>
                                </div>
                                <div className="col-lg-6 wow fadeInUp delay-06s">
                                    <div className="form">
                                        <div id="sendmessage">Your message has been sent. Thank you!</div>
                                        <div id="errormessage"/>
                                        <form action="" method="post" role="form" className="contactForm">
                                            <div className="form-group">
                                                <input type="text" name="name" className="form-control input-text" id="name"
                                                       placeholder="Your Name" data-rule="minlen:4"
                                                       data-msg="Please enter at least 4 chars"/>
                                                <div className="validation"/>
                                            </div>
                                            <div className="form-group">
                                                <input type="email" className="form-control input-text" name="email" id="email"
                                                       placeholder="Your Email" data-rule="email"
                                                       data-msg="Please enter a valid email"/>
                                                <div className="validation"/>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control input-text" name="subject"
                                                       id="subject" placeholder="Subject" data-rule="minlen:4"
                                                       data-msg="Please enter at least 8 chars of subject"/>
                                                <div className="validation"/>
                                            </div>
                                            <div className="form-group">
                                                <textarea className="form-control" name="message" rows="5" data-rule="required"
                                                          data-msg="Please write something for us"
                                                          placeholder="Message"/>
                                                <div className="validation"/>
                                            </div>

                                            <button type="submit" className="btn input-btn">SEND MESSAGE</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="container">
                        <div className="footer_bottom">
                            <div className="credits">
                                @2018 - Powered by LancerVN. All Right Reserved.
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Home;

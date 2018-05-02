// @flow strong

// #region imports
import React, { PureComponent } from 'react';

class Home extends PureComponent<Props, State> {
    componentDidMount() {
        this.props.actions.enterRegister();
    }

    componentWillUnmount() {
        this.props.actions.leaveRegister();
    }

    render() {
        return (
            <div>
                <link href="/css/style-home.css" rel="stylesheet" type="text/css"/>
                <link href="/css/linecons.css" rel="stylesheet" type="text/css"/>
                <link href="/css/font-awesome.css" rel="stylesheet" type="text/css"/>
                <link href="/css/responsive.css" rel="stylesheet" type="text/css"/>
                <link href="/css/animate.css" rel="stylesheet" type="text/css"/>

                <link href='https://fonts.googleapis.com/css?family=Lato:400,900,700,700italic,400italic,300italic,300,100italic,100,900italic' rel='stylesheet' type='text/css'/>
                <link href='https://fonts.googleapis.com/css?family=Dosis:400,500,700,800,600,300,200' rel='stylesheet' type='text/css'/>
                <header id="header_outer">
                    <div className="container">
                        <div className="header_section">
                            <div className="logo">
                                <a href="javascript:void(0)">
                                    <img src="/images/icons/logo.png" alt="" className="logo-home"/>
                                </a>
                            </div>
                            <nav className="nav" id="nav">
                                <ul className="toggle">
                                    <li><a href="#top_content">Home</a></li>
                                    <li><a href="#service">Services</a></li>
                                    <li><a href="#work_outer">Work</a></li>
                                    <li><a href="#Portfolio">Portfolio</a></li>
                                    <li><a href="#client_outer">Clients</a></li>
                                    <li><a href="#team">Team</a></li>
                                    <li><a href="#contact">Contact</a></li>
                                </ul>
                                <ul style={{ marginTop: 3, marginBottom:0 }}>
                                    <li><a href="#top_content">Home</a></li>
                                    <li><a href="#service">Services</a></li>
                                    <li><a href="#work_outer">Work</a></li>
                                    <li><a href="#Portfolio">Portfolio</a></li>
                                    <li><a href="#client_outer">Clients</a></li>
                                    <li><a href="#team">Team</a></li>
                                    <li><a href="#contact">Contact</a></li>
                                </ul>
                            </nav>
                            <a className="res-nav_click animated wobble wow" href="javascript:void(0)">
                                <i className="fa-bars"/>
                            </a>
                        </div>
                    </div>
                </header>
                <section id="top_content" className="top_cont_outer">
                    <div className="top_cont_inner">
                        <div className="container">
                            <div className="top_content">
                                <div className="row">
                                    <div className="col-lg-5 col-sm-7">
                                        <div className="top_left_cont flipInY wow animated">
                                            <h3>Colourful &amp; sexy!</h3>
                                            <h2>creating websites that
                                                make you stop &amp; stare</h2>
                                            <p> Accusantium quam, aliquam ultricies eget tempor id, aliquam eget nibh et. Maecen
                                                aliquam, risus at semper. Proin iaculis purus consequat sem cure digni ssim.
                                                Donec porttitora entum. </p>
                                            <a href="#service" className="learn_more2">Learn more</a></div>
                                    </div>
                                    <div className="col-lg-7 col-sm-5"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="service">
                    <div className="container">
                        <h2>Services</h2>
                        <div className="service_area">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="service_block">
                                        <div className="service_icon delay-03s animated wow  zoomIn"><span><i
                                            className="fa-flash"/></span></div>
                                        <h3 className="animated fadeInUp wow">Quick TurnAround</h3>
                                        <p className="animated fadeInDown wow">Proin iaculis purus consequat sem cure digni.
                                            Donec porttitora entum suscipit aenean rhoncus posuere odio in tincidunt.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="service_block">
                                        <div className="service_icon icon2  delay-03s animated wow zoomIn"><span><i
                                            className="fa-comments"/></span></div>
                                        <h3 className="animated fadeInUp wow">Friendly Support</h3>
                                        <p className="animated fadeInDown wow">Proin iaculis purus consequat sem cure digni.
                                            Donec porttitora entum suscipit aenean rhoncus posuere odio in tincidunt.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="service_block">
                                        <div className="service_icon icon3  delay-03s animated wow zoomIn"><span><i
                                            className="fa-shield"/></span></div>
                                        <h3 className="animated fadeInUp wow">top Security</h3>
                                        <p className="animated fadeInDown wow">Proin iaculis purus consequat sem cure digni.
                                            Donec porttitora entum suscipit aenean rhoncus posuere odio in tincidunt.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="work_outer">
                    <div className="top_cont_latest">
                        <div className="container">
                            <h2>Latest Work</h2>
                            <div className="work_section">
                                <div className="row">
                                    <div className="col-lg-6 col-sm-6 wow fadeInLeft delay-05s">
                                        <div className="service-list">
                                            <div className="service-list-col1"><i className="icon-doc"/></div>
                                            <div className="service-list-col2">
                                                <h3>Process Walkthrough</h3>
                                                <p>Proin iaculis purus digni consequat sem digni ssim. Donec entum digni
                                                    ssim.</p>
                                            </div>
                                        </div>
                                        <div className="service-list">
                                            <div className="service-list-col1"><i className="icon-comment"/></div>
                                            <div className="service-list-col2">
                                                <h3>24/7 support</h3>
                                                <p>Proin iaculis purus consequat sem digni ssim. Digni ssim porttitora .</p>
                                            </div>
                                        </div>
                                        <div className="service-list">
                                            <div className="service-list-col1"><i className="icon-database"/></div>
                                            <div className="service-list-col2">
                                                <h3>Hosting & Storage</h3>
                                                <p>Proin iaculis purus consequat digni sem digni ssim. Purus donec porttitora
                                                    entum.</p>
                                            </div>
                                        </div>
                                        <div className="service-list">
                                            <div className="service-list-col1"><i className="icon-cog"/></div>
                                            <div className="service-list-col2">
                                                <h3>Customization options</h3>
                                                <p>Proin iaculis purus consequat sem digni ssim. Sem porttitora entum.</p>
                                            </div>
                                        </div>
                                        <div className="work_bottom"><span>Ready to take the plunge?</span>
                                            <a href="#contact" className="contact_btn">Contact Us</a>
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
                            <h2>Portfolio</h2>
                        </div>
                    </div>

                    <div className="portfolio-top"/>
                    <div className="portfolio">
                        <div id="filters" className="sixteen columns">
                            <ul className="clearfix">
                                <li>
                                    <a id="all" href="#" data-filter="*" className="active">
                                        <h5>All</h5>
                                    </a>
                                </li>
                                <li>
                                    <a className="" href="#" data-filter=".branding">
                                        <h5>Branding</h5>
                                    </a>
                                </li>
                                <li>
                                    <a className="" href="#" data-filter=".design">
                                        <h5>Design</h5>
                                    </a>
                                </li>
                                <li>
                                    <a className="" href="#" data-filter=".photography">
                                        <h5>Photography</h5>
                                    </a>
                                </li>
                                <li>
                                    <a className="" href="#" data-filter=".videography">
                                        <h5>Videography</h5>
                                    </a>
                                </li>
                                <li>
                                    <a className="" href="#" data-filter=".web">
                                        <h5>Web</h5>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="isotope test1"
                             id="portfolio-wrap">
                            <div
                                className="portfolio-item one-four videography isotope-item test2">
                                <div className="portfolio-image"><img src="/img/portfolio_pic1.jpg" alt="Portfolio 1"/></div>
                                <a title="Starbucks Coffee" rel="prettyPhoto[galname]"
                                   href="http://clapat.ro/themes/newave/images/portfolio/portfolio2.jpg">
                                    <div className="project-overlay">
                                        <div className="project-info">
                                            <div className="zoom-icon"/>
                                            <h4 className="project-name">Leica Camera</h4>
                                            <p className="project-categories">Videography</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div
                                className="portfolio-item one-four  design isotope-item test3">
                                <div className="portfolio-image"><img src="/img/portfolio_pic2.jpg" alt="Portfolio 1"/></div>
                                <div className="project-overlay">
                                    <div className="open-project-link">
                                        <a className="open-project"
                                            href="http://clapat.ro/themes/newave/project-video-expander.html"
                                            title="Open Project"/>
                                    </div>
                                    <div className="project-info">
                                        <div className="zoom-icon"/>
                                        <h4 className="project-name">Foto Template</h4>
                                        <p className="project-categories">Design</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="portfolio-item one-four  design  isotope-item test4">
                                <div className="portfolio-image"><img src="/img/portfolio_pic3.jpg" alt="Portfolio 1"/></div>
                                <div className="project-overlay">
                                    <div className="open-project-link">
                                        <a className="open-project"
                                           href="http://clapat.ro/themes/newave/project-normal-expander-1.html"
                                           title="Open Project"/>
                                    </div>
                                    <div className="project-info">
                                        <div className="zoom-icon"/>
                                        <h4 className="project-name">Sony Phone</h4>
                                        <p className="project-categories">Design</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="portfolio-item one-four  photography  branding web isotope-item test5">
                                <div className="portfolio-image"><img src="/img/portfolio_pic4.jpg" alt="Portfolio 1"/></div>
                                <div className="project-overlay">
                                    <div className="open-project-link">
                                        <a className="open-project"
                                           href="http://clapat.ro/themes/newave/project-fullscreen-expander-1.html"
                                           title="Open Project"/>
                                    </div>
                                    <div className="project-info">
                                        <div className="zoom-icon"/>
                                        <h4 className="project-name">Nike Shoes</h4>
                                        <p className="project-categories">Photography, Web, Branding</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="portfolio-item one-four  design isotope-item test6">
                                <div className="portfolio-image"><img src="/img/portfolio_pic5.jpg" alt="Portfolio 1"/></div>
                                <div className="project-overlay">
                                    <div className="open-project-link">
                                        <a className="open-project"
                                           href="http://clapat.ro/themes/newave/project-fullscreen-expander-2.html"
                                           title="Open Project"/>
                                    </div>
                                    <div className="project-info">
                                        <div className="zoom-icon"/>
                                        <h4 className="project-name">Vinyl Record</h4>
                                        <p className="project-categories">Design</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="portfolio-item one-four  web isotope-item test7">
                                <div className="portfolio-image"><img src="/img/portfolio_pic6.jpg" alt="Portfolio 1"/></div>
                                <div className="project-overlay">
                                    <div className="open-project-link">
                                        <a className="open-project"
                                           href="http://clapat.ro/themes/newave/project-normal-expander-2.html"
                                           title="Open Project"/>
                                    </div>
                                    <div className="project-info">
                                        <div className="zoom-icon"/>
                                        <h4 className="project-name">iPhone</h4>
                                        <p className="project-categories">Web</p>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="portfolio-item one-four  design web isotope-item test8">
                                <div className="portfolio-image"><img src="/img/portfolio_pic7.jpg" alt="Portfolio 1"/></div>
                                <a href="http://clapat.ro/themes/newave/project-external-1.html" className="external">
                                    <div className="project-overlay">
                                        <div className="project-info">
                                            <div className="zoom-icon"/>
                                            <h4 className="project-name">Nexus Phone</h4>
                                            <p className="project-categories">Design, Web</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div
                                className="portfolio-item one-four   photography isotope-item test9">
                                <div className="portfolio-image"><img src="/img/portfolio_pic8.jpg" alt="Portfolio 1"/></div>
                                <a title="Stereo Headphones" rel="prettyPhoto[galname]"
                                   href="http://clapat.ro/themes/newave/images/portfolio/portfolio8.jpg">
                                    <div className="project-overlay">
                                        <div className="project-info">
                                            <div className="zoom-icon"></div>
                                            <h4 className="project-name">Art Frame</h4>
                                            <p className="project-categories">Photography</p>
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
                    <h2>Happy Clients</h2>
                    <div className="client_area ">
                        <div className="client_section animated  fadeInUp wow">
                            <div className="client_profile">
                                <div className="client_profile_pic"><img src="/img/client-pic1.jpg" alt=""/></div>
                                <h3>Saul Goodman</h3>
                                <span>Lawless Inc</span></div>
                            <div className="quote_section">
                                <div className="quote_arrow"/>
                                <p><b><img src="/img/quote_sign_left.png" alt=""/></b> Proin iaculis purus consequat sem cure
                                    digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id,
                                    aliquam eget nibh et. Maecen aliquam, risus at semper. <small><img
                                        src="/img/quote_sign_right.png" alt=""/></small></p>
                            </div>
                            <div className="clear"/>
                        </div>
                        <div className="client_section animated  fadeInDown wow">
                            <div className="client_profile flt">
                                <div className="client_profile_pic"><img src="/img/client-pic2.jpg" alt=""/></div>
                                <h3>Marie Schrader</h3>
                                <span>DEA Foundation</span></div>
                            <div className="quote_section flt">
                                <div className="quote_arrow2"/>
                                <p><b><img src="/img/quote_sign_left.png" alt=""/></b> Proin iaculis purus consequat sem cure
                                    digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id,
                                    aliquam eget nibh et. Maecen aliquam, risus at semper. <small><img
                                        src="/img/quote_sign_right.png" alt=""/></small></p>
                            </div>
                            <div className="clear"/>
                        </div>
                    </div>
                </section>

                <div className="c-logo-part">
                    <div className="container">
                        <ul className="delay-06s animated  bounce wow">
                            <li><a href="javascript:void(0)"><img src="/img/c-liogo1.png" alt=""/></a></li>
                            <li><a href="javascript:void(0)"><img src="/img/c-liogo2.png" alt=""/></a></li>
                            <li><a href="javascript:void(0)"><img src="/img/c-liogo3.png" alt=""/></a></li>
                            <li><a href="javascript:void(0)"><img src="/img/c-liogo5.png" alt=""/></a></li>
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

                <section className="twitter-feed">
                    <div className="container  animated fadeInDown delay-07s wow">
                        <div className="twitter_bird"><span><i className="fa-twitter"/></span></div>
                        <p> When you're the underdog, your only option is to make #waves if you want to succeed. How
                            much <br/> and how often should you be drinking coffee?</p>
                        <span>About 28 mins ago</span></div>
                </section>
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
                                            <span> 308 Negra Arroyo Lane, <br/>Albuquerque, NM, 87104 </span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="contact_block">
                                            <div className="contact_block_icon icon2 rollIn animated wow">
                                                <span>
                                                    <i className="fa-phone"/>
                                                </span>
                                            </div>
                                            <span> 1-800-BOO-YAHH </span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="contact_block">
                                            <div className="contact_block_icon icon3 rollIn animated wow">
                                                <span>
                                                    <i className="fa-pencil"/>
                                                </span>
                                            </div>
                                            <span> <a href="mailto:hello@butterfly.com"> hello@butterfly.com</a> </span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 wow fadeInLeft">
                                    <div className="contact-info-box address clearfix">
                                        <h3>Don’t be shy. Say hello!</h3>
                                        <p>Accusantium quam, aliquam ultricies eget tempor id, aliquam eget nibh et. Maecen
                                            aliquam, risus at semper. Accusantium quam, aliquam ultricies eget tempor id,
                                            aliquam eget nibh et. Maecen aliquam, risus at semper.</p>
                                        <p>Accusantium quam, aliquam ultricies eget tempor id, aliquam eget nibh et. Maecen
                                            aliquampor id.</p>
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
                            <span>© Butterfly Theme</span>
                            <div className="credits">
                                <a href="https://bootstrapmade.com/">Free Bootstrap Templates</a> by BootstrapMade
                            </div>
                        </div>
                    </div>
                </footer>
                <script src="/contactform/contactform.js"></script>
            </div>
        );
    }
}

export default Home;

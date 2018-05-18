// @flow strong

import React, {PureComponent} from 'react';
import {Doughnut} from 'react-chartjs-2';

class DashBoard extends PureComponent<Props, State> {
    componentDidMount() {
        const {
            actions: {
                enterDashboard,
                getDashboardInfoIfNeed,
            }
        } = this.props;
        enterDashboard();
        getDashboardInfoIfNeed();
    }

    componentWillUnmount() {
        this.props.actions.leaveDashboard();
    }

    render() {
        const {
            job,
            quotation,
            _package,
            order,
        } = this.props.dashboardInfo;

        const dataJob = {
            labels: [
                'Việc đã đăng',
                'Việc đã báo giá',
            ],
            datasets: [{
                data: [job, quotation],
                backgroundColor: [
                    '#9966FF',
                    '#FF9F40',
                ],
                hoverBackgroundColor: [
                    '#8142FF',
                    '#FF9124',
                ]
            }]
        };

        const dataPackage = {
            labels: [
                'Gói đã đăng',
                'Gói đã đặt hàng',
            ],
            datasets: [{
                data: [_package, order],
                backgroundColor: [
                    '#FF9F40',
                    '#FF6384',
                ],
                hoverBackgroundColor: [
                    '#FF9124',
                    '#FF3D67',
                ]
            }]
        };

        return (
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
                        <div className="card card-statistics">
                            <div className="card-body">
                                <div className="clearfix">
                                    <div className="float-left">
                                        <i className="mdi mdi-cube text-danger icon-lg"/>
                                    </div>
                                    <div className="float-right">
                                        <p className="card-text text-right">Việc đã đăng</p>
                                        <div className="fluid-container">
                                            <h3 className="card-title font-weight-bold text-right mb-0">{job}</h3>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-muted mt-3">
                                    <i className="mdi mdi-alert-octagon mr-1" aria-hidden="true"/>
                                    Việc freelance đã đăng
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
                        <div className="card card-statistics">
                            <div className="card-body">
                                <div className="clearfix">
                                    <div className="float-left">
                                        <i className="mdi mdi-receipt text-warning icon-lg"/>
                                    </div>
                                    <div className="float-right">
                                        <p className="card-text text-right">Báo giá</p>
                                        <div className="fluid-container">
                                            <h3 className="card-title font-weight-bold text-right mb-0">{quotation}</h3>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-muted mt-3">
                                    <i className="mdi mdi-bookmark-outline mr-1" aria-hidden="true"/>
                                    Việc đã gửi báo giá
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
                        <div className="card card-statistics">
                            <div className="card-body">
                                <div className="clearfix">
                                    <div className="float-left">
                                        <i className="mdi mdi-poll-box text-teal icon-lg"/>
                                    </div>
                                    <div className="float-right">
                                        <p className="card-text text-right">Gói công việc</p>
                                        <div className="fluid-container">
                                            <h3 className="card-title font-weight-bold text-right mb-0">{_package}</h3>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-muted mt-3">
                                    <i className="mdi mdi-calendar mr-1" aria-hidden="true"/>
                                    Gói công việc đã đăng
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
                        <div className="card card-statistics">
                            <div className="card-body">
                                <div className="clearfix">
                                    <div className="float-left">
                                        <i className="mdi mdi-account-location text-info icon-lg"/>
                                    </div>
                                    <div className="float-right">
                                        <p className="card-text text-right">Đặt hàng</p>
                                        <div className="fluid-container">
                                            <h3 className="card-title font-weight-bold text-right mb-0">{order}</h3>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-muted mt-3">
                                    <i className="mdi mdi-reload mr-1" aria-hidden="true"/>
                                    Gói công việc đã đặt hàng
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Việc freelance</h4>
                                <Doughnut data={dataJob} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Gói công việc</h4>
                                <Doughnut data={dataPackage} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashBoard;

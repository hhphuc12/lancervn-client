// @flow strong

import React, {PureComponent} from 'react';
import { Link } from 'react-router-dom';

class JobSentQuotation extends PureComponent<Props, State> {
    componentDidMount() {
        const {
            actions: {
                enterJobSentQuotation,
                getJobSentQuotationIfNeed,
            }
        } = this.props;
        enterJobSentQuotation();
        getJobSentQuotationIfNeed();
    }

    componentWillUnmount() {
        this.props.actions.leaveJobSentQuotation();
    }

    render() {
        const quotationsJSX = this.props.jobSentQuotation.map((q, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td style={{ maxWidth: '8rem' }}>{q.job.name}</td>
                <td>{q.priceExpected}</td>
                <td style={{ maxWidth: '12rem' }}>{q.job.content}</td>
                <td className="text-right">
                    {
                        q.isBrowsered ? (<label className="badge badge-teal">Được chấp nhận</label>) :
                            (<label className="badge badge-warning">Đang chờ duyệt</label>)
                    }
                </td>
            </tr>
        ));

        return (
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-list-header">
                                    <h5 className="card-title mb-4" style={{ padding: 7 }}>Việc đã gửi báo giá</h5>
                                    <div>
                                        <Link to="/jobs-freelance" className="btn btn-primary">
                                            <i className="fa fa-plus"/>
                                            Tìm thêm việc
                                        </Link>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table center-aligned-table table-striped">
                                        <thead>
                                        <tr>
                                            <th className="border-bottom-0">No.</th>
                                            <th className="border-bottom-0">Tên công việc</th>
                                            <th className="border-bottom-0">Mức giá đề xuất</th>
                                            <th className="border-bottom-0">Yêu cầu</th>
                                            <th className="border-bottom-0 text-right">Tình trạng</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            quotationsJSX
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default JobSentQuotation;

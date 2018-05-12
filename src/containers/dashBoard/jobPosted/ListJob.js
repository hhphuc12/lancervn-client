// @flow strong

import React, {PureComponent} from 'react';
import { str30Format } from '../../../helpers';


class ListJob extends PureComponent<Props, State> {
    componentDidMount() {
        const {
            actions: {
                enterJobPosted,
                getJobPostedIfNeed,
            }
        } = this.props;
        enterJobPosted();
        getJobPostedIfNeed();
    }

    componentWillUnmount() {
        this.props.actions.leaveJobPosted();
    }

    render() {
        const { jobPosted, quotations } = this.props;
        const jobsJSX = jobPosted.map((j, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{str30Format(j.name)}</td>
                <td>{j.category}</td>
                <td>{str30Format(j.content)}</td>
                <td>{quotations[index].length}</td>
                <td className="text-right">
                    <a href="#" className="btn btn-outline-success btn-sm">
                        Xem chi tiết
                    </a>
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
                                    <h5 className="card-title mb-4" style={{ padding: 7 }}>Skills</h5>
                                    <div>
                                        <a href="/dashboard/post-job" className="btn btn-primary">
                                            <i className="fa fa-plus"/>
                                            Đăng việc
                                        </a>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table center-aligned-table table-striped">
                                        <thead>
                                        <tr>
                                            <th className="border-bottom-0">No.</th>
                                            <th className="border-bottom-0">Tên công việc</th>
                                            <th className="border-bottom-0">Lĩnh vực</th>
                                            <th className="border-bottom-0">Yêu cầu</th>
                                            <th className="border-bottom-0">Số lượng báo giá</th>
                                            <th className="border-bottom-0 text-right">Hành động</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            jobsJSX
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

export default ListJob;

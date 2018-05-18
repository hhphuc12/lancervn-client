// @flow strong

import React, {PureComponent} from 'react';
import { Link } from 'react-router-dom';
import { str30Format, moneyFormater } from "../../../helpers";

class ListJob extends PureComponent<Props, State> {
    componentDidMount() {
        const {
            actions: {
                enterListPackage,
                getPackageOrderedIfNeed,
                getListPackagePostedIfNeed,
            }
        } = this.props;
        enterListPackage();
        getPackageOrderedIfNeed();
        getListPackagePostedIfNeed();
    }

    componentWillUnmount() {
        this.props.actions.leaveListPackage();
    }

    render() {
        const { packageOrdered, orders, packagePosted } = this.props;
        const packagePostedJSX = packagePosted.map((p, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td style={{ maxWidth: '8rem' }}>{p.name}</td>
                <td>{p.category}</td>
                <td style={{ maxWidth: '12rem' }}>{p.expectedResult}</td>
                <td>{orders[index].length}</td>
                <td className="text-right">
                    <Link to={`/dashboard/package-posted-detail/${p._id}`} className="btn btn-outline-success btn-sm">
                        Xem chi tiết
                    </Link>
                </td>
            </tr>
        ));
        const packageOrderedJSX = packageOrdered.map((p, index) => {
            const { name, expectedResult, category } = p._package;
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td style={{ maxWidth: '8rem' }}>{name}</td>
                    <td>{category}</td>
                    <td style={{ maxWidth: '12rem' }}>{expectedResult}</td>
                    <td>{moneyFormater(p.priceExpected)}</td>
                    <td className="text-right">
                        <Link to={`/dashboard/package-ordered-detail/${p._id}`} className="btn btn-outline-success btn-sm">
                            Xem chi tiết
                        </Link>
                    </td>
                </tr>
            )
        });

        return (
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-list-header">
                                    <h5 className="card-title mb-4" style={{ padding: 7 }}>Gói công việc đã tạo</h5>
                                    <div>
                                        <Link to="/dashboard/post-package" className="btn btn-primary">
                                            <i className="fa fa-plus"/>
                                            Tạo gói công việc
                                        </Link>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table center-aligned-table table-striped">
                                        <thead>
                                        <tr>
                                            <th className="border-bottom-0">No.</th>
                                            <th className="border-bottom-0">Tên gói công việc</th>
                                            <th className="border-bottom-0">Lĩnh vực</th>
                                            <th className="border-bottom-0">Kết quả</th>
                                            <th className="border-bottom-0">Số lượng đặt hàng</th>
                                            <th className="border-bottom-0 text-right">Hành động</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            packagePostedJSX
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-list-header">
                                    <h5 className="card-title mb-4" style={{ padding: 7 }}>Gói công việc đã đặt hàng</h5>
                                    <div>
                                        <Link to="/packages" className="btn btn-primary">
                                            <i className="fa fa-plus"/>
                                            Tìm thêm gói công việc
                                        </Link>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table center-aligned-table table-striped">
                                        <thead>
                                        <tr>
                                            <th className="border-bottom-0">No.</th>
                                            <th className="border-bottom-0">Tên gói công việc</th>
                                            <th className="border-bottom-0">Lĩnh vực</th>
                                            <th className="border-bottom-0">Kết quả</th>
                                            <th className="border-bottom-0">Mức giá đề xuất</th>
                                            <th className="border-bottom-0 text-right">Hành động</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            packageOrderedJSX
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

// @flow strong

// #region imports
import React, {PureComponent} from 'react';
import {Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom';
import {dateFormater, moneyFormater, str30Format} from '../../../../helpers';
import swal from "sweetalert";

class Detail extends PureComponent<Props, State> {
    componentDidMount() {
        const {
            enterPackagePostedDetail,
            getPackagePostedDetailIfNeed,
        } = this.props.actions;
        enterPackagePostedDetail();
        getPackagePostedDetailIfNeed(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.actions.leavePackagePostedDetail();
    }

    renderField = ({input, label, id, type, fieldValue, disabled, meta: {touched, error, warning}}) => {
        return (
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <input
                    {...input}
                    type={type}
                    className={'form-control'}
                    id={id}
                    value={fieldValue}
                    disabled={disabled}
                    onChange={e => this.setState({[input.name]: e.target.value})}
                />
                {touched && ((error && <label className="text-danger" style={{marginTop: 5}}>{`* ${error}`}</label>) ||
                    (warning && <label className="text-danger" style={{marginTop: 5}}>{`* ${warning}`}</label>))}
            </div>
        )
    };

    renderTextArea = ({input, label, id, fieldValue, disabled, meta: {touched, error, warning}}) => {
        return (
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <textarea
                    {...input}
                    className={'form-control'}
                    id={id}
                    rows='10'
                    disabled={disabled}
                    value={fieldValue}
                    onChange={e => this.setState({[input.name]: e.target.value})}
                />
                {touched && ((error && <label className="text-danger" style={{marginTop: 5}}>{`* ${error}`}</label>) ||
                    (warning && <label className="text-danger" style={{marginTop: 5}}>{`* ${warning}`}</label>))}
            </div>
        )
    };

    onBrowse = (event, jobId, quotationId) => {
        event.preventDefault();
        const { browseQuotationIfNeed, errorBadRequest } = this.props.actions;
        try {
            browseQuotationIfNeed(jobId, quotationId);
        } catch (error) {
            errorBadRequest();
            /* eslint-disable no-console */
            console.log('browse quotation went wrong..., error: ', error);
            /* eslint-enable no-console */
        }
    };

    render() {
        const { packageDetail, ordersDetail } = this.props;
        if (!packageDetail || (packageDetail && !packageDetail.process)) {
            return (<div>Loading...</div>);
        }

        const {
            name,
            expectedResult,
            target,
            priceExpected,
            category,
            process,
            dataNeed,
        } = packageDetail;

        const orderJSX = ordersDetail.map((o, index) => {
            const { _id, firstName, lastName, email, phoneNumber } = o.user;
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td style={{ maxWidth: '8rem' }}>
                        <Link to={`/freelancer/${_id}`}>
                            {`${firstName} ${lastName}`}
                        </Link>
                    </td>
                    <td>{moneyFormater(o.priceExpected)}</td>
                    <td style={{ maxWidth: '12rem' }}>{o.message}</td>
                    <td>{phoneNumber}</td>
                    <td className="text-right">{email}</td>
                </tr>
            )
        })

        return (
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <form>
                                    <h4>Danh sách khách hàng</h4>
                                    <div className="form-group">
                                        <div className="table-responsive">
                                            <table className="table center-aligned-table table-striped">
                                                <thead>
                                                <tr>
                                                    <th className="border-bottom-0">No.</th>
                                                    <th className="border-bottom-0">Khách hàng</th>
                                                    <th className="border-bottom-0">Mức giá đề xuất</th>
                                                    <th className="border-bottom-0">Lời nhắn</th>
                                                    <th className="border-bottom-0">Số điện thoại</th>
                                                    <th className="border-bottom-0 text-right">Email</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    orderJSX
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <br/>
                                    <h4>Thông tin gói công việc đã đăng</h4>
                                    <br/>
                                    <Field
                                        id="name"
                                        type="text"
                                        name="name"
                                        label="Tên gói công việc"
                                        component={this.renderField}
                                        fieldValue={name}
                                        disabled={true}
                                    />
                                    <br/>
                                    <Field
                                        id="category"
                                        type="text"
                                        name="category"
                                        label="Lĩnh vực"
                                        component={this.renderField}
                                        fieldValue={category}
                                        disabled={true}
                                    />
                                    <br/>
                                    <Field
                                        id="target"
                                        type="text"
                                        name="target"
                                        label="Đối tượng khách hàng hướng tới"
                                        component={this.renderField}
                                        fieldValue={target}
                                        disabled={true}
                                    />
                                    <br/>
                                    <Field
                                        id="expectedResult"
                                        type="text"
                                        name="expectedResult"
                                        label="Kết quả đạt được"
                                        component={this.renderTextArea}
                                        fieldValue={expectedResult}
                                        disabled={true}
                                    />
                                    <br/>
                                    <div className="form-group">
                                        <label>Quy trình thực hiện:</label>
                                        <div style={{ marginTop: '0.5rem' }}>
                                            {
                                                process.map((p, index) => (
                                                    <div className="step" key={index}>
                                                        <div>
                                                            <div className="circle">{index + 1}</div>
                                                            <div className="line"/>
                                                        </div>
                                                        <div className="step-item">
                                                            <div className="title">{p}</div>
                                                            <div className="body"/>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="form-group">
                                        <label className="media-cloud-title">Khách hàng cần cung cấp:</label>
                                        <ul>
                                            {
                                                dataNeed.map((d, index) => (
                                                    <li key={index} style={{ fontSize: '1rem' }}>
                                                        <i className="mdi mdi-checkbox-marked-outline text-primary" style={{ fontSize: '1.5rem', paddingRight: '0.5rem' }}/>
                                                        <span>{d}</span>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <br/>
                                    <Field
                                        id="priceExpected"
                                        type="text"
                                        name="priceExpected"
                                        label="Mức giá bạn đưa ra"
                                        component={this.renderField}
                                        fieldValue={moneyFormater(priceExpected)}
                                        disabled={true}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'syncValidation',
})(Detail);

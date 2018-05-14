// @flow strong

// #region imports
import React, {PureComponent} from 'react';
import {Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom';
import {dateFormater} from '../../../../helpers';
import swal from "sweetalert";

class Detail extends PureComponent<Props, State> {
    componentDidMount() {
        const {
            enterPackageOrderedDetail,
            getPackageOrderedDetailIfNeed,
        } = this.props.actions;
        enterPackageOrderedDetail();
        getPackageOrderedDetailIfNeed(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.actions.leavePackageOrderedDetail();
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

    render() {
        const { packageOrderedDetail } = this.props;

        if (!packageOrderedDetail || (packageOrderedDetail && !packageOrderedDetail._package)) {
            return (<div>Loading...</div>);
        }
        const {
            name,
            expectedResult,
            target,
            category,
            process,
            dataNeed,
        } = packageOrderedDetail._package;

        return (
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <form>
                                    <h4>Thông tin gói công việc đã đặt hàng</h4>
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
                                                            <div className="circle">{index}</div>
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
                                        label="Mức giá nhà cung cấp đưa ra"
                                        component={this.renderField}
                                        fieldValue={packageOrderedDetail._package.priceExpected}
                                        disabled={true}
                                    />
                                    <br/>
                                    <Field
                                        id="priceExpected"
                                        type="text"
                                        name="priceExpected"
                                        label="Mức giá bạn đề xuất"
                                        component={this.renderField}
                                        fieldValue={packageOrderedDetail.priceExpected}
                                        disabled={true}
                                    />
                                    <br/>
                                    <Field
                                        id="message"
                                        type="text"
                                        name="message"
                                        label="Lời nhắn của bạn với nhà cung cấp"
                                        component={this.renderField}
                                        fieldValue={packageOrderedDetail.message}
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

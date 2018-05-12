// @flow strong

// #region imports
import React, {PureComponent} from 'react';
import {Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom';
import {dateFormater} from '../../../../helpers';

class Detail extends PureComponent<Props, State> {
    componentDidMount() {
        const {
            enterJobPostedDetail,
            getJobPostedDetailIfNeed,
        } = this.props.actions;
        enterJobPostedDetail();
        getJobPostedDetailIfNeed(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.actions.leaveInfoProfile();
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
        const { jobPostedDetail, quotationsDetail } = this.props;
        const {
            name,
            category,
            content,
            deadlineOffer,
            priceExpected,
            province,
            prioritize,
            skill,
        } = jobPostedDetail;

        const quotationJSX = quotationsDetail.map((q, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>
                    <Link to={`/freelancer/${q.user._id}`}>
                        {`${q.user.firstName} ${q.user.lastName}`}
                    </Link>
                </td>
                <td>{q.priceExpected}</td>
                <td style={{ maxWidth: '12rem' }}>{q.message}</td>
                <td>{dateFormater(q.createdAt)}</td>
                <td className="text-right">
                    <a href="#" className="btn btn-outline-success btn-sm">
                        Duyệt
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
                                <form>
                                    <h4>Thông tin công việc</h4>
                                    <br/>
                                    <Field
                                        id="name"
                                        type="text"
                                        name="name"
                                        label="Tên công việc"
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
                                        id="content"
                                        type="text"
                                        name="content"
                                        label="Mô tả yêu cầu"
                                        component={this.renderTextArea}
                                        fieldValue={content}
                                        disabled={true}
                                    />
                                    <br/>
                                    <Field
                                        id="deadlineOffer"
                                        type="text"
                                        name="deadlineOffer"
                                        label="Hạn gửi báo giá"
                                        component={this.renderField}
                                        fieldValue={dateFormater(deadlineOffer)}
                                        disabled={true}
                                    />
                                    <br/>
                                    <div className="row">
                                        <div className="col-md-6 form-group">
                                            <Field
                                                id="zip-code"
                                                type="text"
                                                name="zipCode"
                                                label="Mức giá đề xuất"
                                                component={this.renderField}
                                                fieldValue={priceExpected}
                                                disabled={true}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <Field
                                                id="province"
                                                type="text"
                                                name="province"
                                                label="Tỉnh/Thành phố"
                                                component={this.renderField}
                                                fieldValue={province}
                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                    <br/>
                                    <Field
                                        id="prioritize"
                                        type="text"
                                        name="prioritize"
                                        label="Ưu tiên"
                                        component={this.renderTextArea}
                                        fieldValue={prioritize}
                                        disabled={true}
                                    />
                                    <br/>
                                    <Field
                                        id="skill"
                                        type="text"
                                        name="skill"
                                        label="Yêu cầu kỹ năng"
                                        component={this.renderField}
                                        fieldValue={skill}
                                        disabled={true}
                                    />
                                </form>
                                <br/>
                                <h4>Duyệt báo giá</h4>
                                <div className="table-responsive">
                                    <table className="table center-aligned-table table-striped">
                                        <thead>
                                        <tr>
                                            <th className="border-bottom-0">No.</th>
                                            <th className="border-bottom-0">Người gửi</th>
                                            <th className="border-bottom-0">Mức giá đề xuất</th>
                                            <th className="border-bottom-0">Lời nhắn</th>
                                            <th className="border-bottom-0">Thời gian gửi</th>
                                            <th className="border-bottom-0 text-right">Hành động</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            quotationJSX
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

export default reduxForm({
    form: 'syncValidation',
})(Detail);

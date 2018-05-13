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
            enterJobPostedDetail,
            getJobPostedDetailIfNeed,
        } = this.props.actions;
        enterJobPostedDetail();
        getJobPostedDetailIfNeed(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.actions.leaveInfoProfile();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isQuotationBrowsered)
            swal("Chúc mừng!", "Bạn đã tìm được freelancer thích hợp cho công việc của mình!", "success");
            nextProps.actions.getJobPostedDetailIfNeed(this.props.match.params.id);
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
        const { jobPostedDetail, quotationsDetail, quotationBrowsered } = this.props;
        console.log({ quotationBrowsered });
        const {
            _id,
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
                    <a href="#" className="btn btn-outline-success btn-sm" onClick={e => this.onBrowse(e, _id, q._id)}>
                        Duyệt
                    </a>
                </td>
            </tr>
        ));

        const userRentedJSX = quotationBrowsered.user ? (
            <div>
                <h4>Freelancer đang làm việc</h4>
                <div className="profile-box">
                    <Link to={`/freelancer/${quotationBrowsered.user._id}`} style={{ textDecoration: 'none' }}>
                        <img
                            src={quotationBrowsered.user.avatarUri}
                            alt={`${quotationBrowsered.user.firstName} ${quotationBrowsered.user.lastName}`}
                            className="avatar avatar-profile"
                        />
                        <h1 className="profile-name">
                            {`${quotationBrowsered.user.firstName} ${quotationBrowsered.user.lastName}`}
                        </h1>
                    </Link>
                    <p className="text-primary" style={{ fontSize: '1rem' }}>
                        <i className="mdi mdi-worker"/>
                        {quotationBrowsered.user.occupation}
                    </p>
                </div>
            </div>
        ) : null;

        return (
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                {userRentedJSX}
                                {
                                    !quotationBrowsered.user ? (
                                        <div>
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
                                    ) : null
                                }
                                <br/>
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

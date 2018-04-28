// @flow strong

import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import 'react-datetime/css/react-datetime.css';
import Datetime from 'react-datetime';
import { monthFormater, formatDescription } from '../../../../helpers';

class Experience extends PureComponent<Props, State> {
    componentDidMount() {
        this.props.actions.getListExperienceIfNeed();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isDataChanged) {
            nextProps.actions.getListExperienceIfNeed();
            nextProps.actions.resetDataChangeState();
        }
    }

    state = {
        _id: '',
        jobPosition: '',
        company: '',
        startMonth: new Date(),
        endMonth: new Date(),
        description: '',
        disableAdd: true,
        isOK: true
    };

    changeAddState = e => {
        e.preventDefault();
        this.setState({ disableAdd: !this.state.disableAdd });
    };

    onAdd = () => {
        const { addExperienceIfNeed, errorBadRequest } = this.props.actions;
        const {
            jobPosition,
            company,
            startMonth,
            endMonth,
            description,
        } = this.state;
        try {
            addExperienceIfNeed({
                jobPosition,
                company,
                startMonth,
                endMonth,
                description,
            });
        } catch (error) {
            errorBadRequest();
            /* eslint-disable no-console */
            console.log('add experience went wrong..., error: ', error);
            /* eslint-enable no-console */
        }
        this.setState({ disableAdd: !this.state.disableAdd });
    };

    onDelete = (id, e) => {
        e.preventDefault();
        const { deleteExperienceIfNeed, errorBadRequest } = this.props.actions;
        try {
            deleteExperienceIfNeed(id);
        } catch (error) {
            errorBadRequest();
            /* eslint-disable no-console */
            console.log('add experience went wrong..., error: ', error);
            /* eslint-enable no-console */
        }
    };

    renderField = ({input, label, id, type, fieldValue, meta: {touched, error, warning}}) => {
        return (
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <input
                    {...input}
                    type={type}
                    className={'form-control'}
                    id={id}
                    value={fieldValue}
                    onChange={e => this.setState({[input.name]: e.target.value})}
                />
                {touched && ((error && <label className="text-danger" style={{marginTop: 5}}>{`* ${error}`}</label>) ||
                    (warning && <label className="text-danger" style={{marginTop: 5}}>{`* ${warning}`}</label>))}
            </div>
        )
    };

    renderTextArea = ({input, label, id, fieldValue, meta: {touched, error, warning}}) => {
        return (
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <textarea
                    {...input}
                    className={'form-control'}
                    id={id}
                    rows='10'
                    value={fieldValue}
                    onChange={e => this.setState({[input.name]: e.target.value})}
                />
                {touched && ((error && <label className="text-danger" style={{marginTop: 5}}>{`* ${error}`}</label>) ||
                    (warning && <label className="text-danger" style={{marginTop: 5}}>{`* ${warning}`}</label>))}
            </div>
        )
    };

    render() {
        const { jobPosition, company, startMonth, endMonth, description, disableAdd } = this.state;
        const { isFetching, experiences } = this.props;
        const formJSX = (
            <form>
                <div className="row">
                    <div className="col-md-6">
                        <Field
                            id="job-position"
                            type="text"
                            name="jobPosition"
                            label="Vị trí"
                            component={this.renderField}
                            fieldValue={jobPosition}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            id="company"
                            type="text"
                            name="company"
                            label="Công ty"
                            component={this.renderField}
                            fieldValue={company}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label htmlFor="startDate">Từ tháng</label>
                        <Datetime
                            dateFormat="MM/YYYY"
                            timeFormat={false}
                            closeOnSelect={true}
                            defaultValue={startMonth}
                            inputProps={{ readOnly: true }}
                            isValidDate={selected => selected.isBefore(new Date())}
                            onChange={m => this.setState({ startMonth: new Date(m) })}
                        />
                    </div>
                    <div className="col-md-6 form-group">
                        <label htmlFor="endDate">Đến tháng</label>
                        <Datetime
                            dateFormat="MM/YYYY"
                            timeFormat={false}
                            closeOnSelect={true}
                            defaultValue={endMonth}
                            inputProps={{ readOnly: true }}
                            isValidDate={selected => selected.isBefore(new Date())}
                            onChange={m => this.setState({ endMonth: new Date(m) })}
                        />
                    </div>
                </div>
                <Field
                    id="description"
                    type="text"
                    name="description"
                    label="Mô tả"
                    component={this.renderTextArea}
                    fieldValue={description}
                />
                <button
                    className="btn btn-success mr-2"
                    type="button"
                    onClick={this.onAdd}
                    disabled={isFetching}
                >
                    {
                        isFetching ?
                            <span>
                                <i className="fa fa-spinner fa-pulse fa-fw"/>
                            </span>
                            :
                            <span>
                                Thêm
                            </span>
                    }
                </button>
                <button className="btn btn-light" onClick={this.changeAddState}>Hủy bỏ</button>
            </form>
        );

        const experiencesJSX = experiences.map((e, index) => (
            <div className="col-4 grid-margin" key={index}>
                <div className="card card-job-profile">
                    <div className="card-body card-body-job-profile">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className="card-data-job-profile">
                                <p>Vị trí: <b>{e.jobPosition}</b></p>
                                <p>Công ty: <b>{e.company}</b></p>
                                <p>{`${monthFormater(e.startMonth)} ~ ${monthFormater(e.endMonth)}`}</p>
                            </div>
                            <div style={{ marginRight: 5 }}>
                                <a href="#" onClick={this.onDelete.bind(this, e._id)} title="Xóa">
                                    <i className="mdi mdi-bookmark-remove icon-md text-danger"/>
                                </a>
                            </div>
                        </div>
                        <div
                            style={{ marginBottom: 0 }}
                            dangerouslySetInnerHTML={{__html: formatDescription(e.description)}}
                        />
                    </div>
                </div>
            </div>
        ));

        return (
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-list-header">
                                <h5 className="card-title mb-4 job-profile-header-text" style={{ padding: 7 }}>Kinh nghiệm làm việc</h5>
                                <div>
                                    <a href="#" onClick={this.changeAddState}>
                                        <i className="mdi mdi-plus-circle-outline icon-md"/>
                                    </a>
                                </div>
                            </div>
                            <div className="row">
                                {experiencesJSX}
                            </div>
                            {
                                disableAdd ? null : formJSX
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'syncValidation',
})(Experience);

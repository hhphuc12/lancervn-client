// @flow strong

import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import 'react-datetime/css/react-datetime.css';
import Datetime from 'react-datetime';

class Literacy extends PureComponent<Props, State> {
    constructor(props) {
        super(props);

        this.renderField = this.renderField.bind(this);
        this.renderTextArea = this.renderTextArea.bind(this);
        this.changeAddState = this.changeAddState.bind(this);
    }

    state = {
        university: '',
        specialized: '',
        startMonth: '',
        endMonth: '',
        description: '',
        disableAdd: true,
        isOK: true
    };

    changeAddState = e => {
        e.preventDefault();
        this.setState({ disableAdd: !this.state.disableAdd });
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
        const { university, specialized, startMonth, endMonth, description, disableAdd } = this.state;
        const { isOK, isFetching } = this.props;
        const formJSX = (
            <form>
                <div className="row">
                    <div className="col-md-6">
                        <Field
                            id="university"
                            type="text"
                            name="university"
                            label="Tên trường"
                            component={this.renderField}
                            fieldValue={university}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            id="specialized"
                            type="text"
                            name="specialized"
                            label="Chuyên ngành"
                            component={this.renderField}
                            fieldValue={specialized}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label htmlFor="startDate">Từ tháng</label>
                        <Datetime
                            dateFormat="MM/YYYY"
                            timeFormat={false}
                            defaultValue={new Date()}
                        />
                    </div>
                    <div className="col-md-6 form-group">
                        <label htmlFor="endDate">Đến tháng</label>
                        <Datetime
                            dateFormat="MM/YYYY"
                            timeFormat={false}
                            defaultValue={new Date()}
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
                    disabled={isOK || isFetching}
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

        return (
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-list-header">
                                <h5 className="card-title mb-4 job-profile-header-text" style={{ padding: 7 }}>Trình độ học vấn</h5>
                                <div>
                                    <a href="#" onClick={this.changeAddState}>
                                        <i className="mdi mdi-plus-circle-outline icon-md"/>
                                    </a>
                                </div>
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
})(Literacy);

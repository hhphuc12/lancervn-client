// @flow strong

import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import 'react-select/dist/react-select.css';
import Select from 'react-select';

class Project extends PureComponent<Props, State> {
    constructor(props) {
        super(props);

        this.renderField = this.renderField.bind(this);
        this.renderTextArea = this.renderTextArea.bind(this);
        this.changeAddState = this.changeAddState.bind(this);
    }

    state = {
        projectName: '',
        category: [],
        role: '',
        customer: '',
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
        const { projectName, category, role, customer, description, disableAdd } = this.state;
        const { isOK, isFetching } = this.props;
        const selectOptions = [
            { value: 'test1', label: 'Test 1' },
            { value: 'test2', label: 'Test 2' },
            { value: 'test3', label: 'Test 3' },
        ];
        const formJSX = (
            <form>
                <Field
                    id="project-name"
                    type="text"
                    name="projectName"
                    label="Tên dự án bạn đã làm"
                    component={this.renderField}
                    fieldValue={projectName}
                />
                <div className="form-group">
                    <label htmlFor="category">Dịch vụ</label>
                    <Select
                        id="category"
                        placeholder="Chọn một hoặc nhiều loại dịch vụ"
                        closeOnSelect={false}
                        multi={true}
                        name="category"
                        value={category}
                        options={selectOptions}
                        onChange={value => { this.setState({ category: value})}}
                    />
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Field
                            id="role"
                            type="text"
                            name="role"
                            label="Vị trí"
                            component={this.renderField}
                            fieldValue={role}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            id="customer"
                            type="text"
                            name="customer"
                            label="Khách hàng"
                            component={this.renderField}
                            fieldValue={customer}
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
                                <h5 className="card-title mb-4 job-profile-header-text" style={{ padding: 7 }}>Hồ sơ năng lực</h5>
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
})(Project);

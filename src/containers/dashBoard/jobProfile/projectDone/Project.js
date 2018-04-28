// @flow strong

import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import 'react-select/dist/react-select.css';
import Select from 'react-select';
import { formatDescription } from "../../../../helpers";

class Project extends PureComponent<Props, State> {
    componentDidMount() {
        this.props.actions.getSelectCategoryIfNeed();
        this.props.actions.getListProjectIfNeed();
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

    onAdd = () => {
        const { addProjectIfNeed, errorBadRequest } = this.props.actions;
        const {
            projectName,
            category,
            role,
            customer,
            description,
        } = this.state;
        let categoryText = [];
        category.forEach(c => {
            categoryText.push(c.label);
        });
        try {
            addProjectIfNeed({
                projectName,
                category: categoryText,
                role,
                customer,
                description,
            });
        } catch (error) {
            errorBadRequest();
            /* eslint-disable no-console */
            console.log('add project went wrong..., error: ', error);
            /* eslint-enable no-console */
        }
        this.setState({ disableAdd: !this.state.disableAdd });
    };

    onDelete = (id, e) => {
        e.preventDefault();
        const { deleteProjectIfNeed, errorBadRequest } = this.props.actions;
        try {
            deleteProjectIfNeed(id);
        } catch (error) {
            errorBadRequest();
            /* eslint-disable no-console */
            console.log('delete project went wrong..., error: ', error);
            /* eslint-enable no-console */
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.isDataChanged) {
            nextProps.actions.getListProjectIfNeed();
            nextProps.actions.resetDataChangeState();
        }
    }

    render() {
        const { projectName, category, role, customer, description, disableAdd } = this.state;
        const { projects, categories, isFetching } = this.props;
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
                        options={categories}
                        onChange={value => { this.setState({ category: value})}}
                    />
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Field
                            id="role"
                            type="text"
                            name="role"
                            label="Vai trò"
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

        const projectsJSX = projects.map((p, index) => (
            <div className="col-4 grid-margin" key={index}>
                <div className="card card-job-profile">
                    <div className="card-body card-body-job-profile">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className="card-data-job-profile">
                                <p>Dự án: <b>{p.projectName}</b></p>
                                <p>Khách hàng: <b>{p.customer}</b></p>
                                <p>Vai trò: <b>{p.role}</b></p>
                                <p>
                                    Dịch vụ: <div className="category-project-wrapper">
                                        {
                                            p.category.map(c => (
                                                <div className="category-project">{c}</div>
                                            ))
                                        }
                                    </div>
                                </p>
                            </div>
                            <div style={{ marginRight: 5 }}>
                                <a href="#" onClick={this.onDelete.bind(this, p._id)} title="Xóa">
                                    <i className="mdi mdi-bookmark-remove icon-md text-danger"/>
                                </a>
                            </div>
                        </div>
                        <div
                            style={{ marginBottom: 0 }}
                            dangerouslySetInnerHTML={{__html: formatDescription(p.description)}}
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
                                <h5 className="card-title mb-4 job-profile-header-text" style={{ padding: 7 }}>Hồ sơ năng lực</h5>
                                <div>
                                    <a href="#" onClick={this.changeAddState}>
                                        <i className="mdi mdi-plus-circle-outline icon-md"/>
                                    </a>
                                </div>
                            </div>
                            <div className="row">
                                {projectsJSX}
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

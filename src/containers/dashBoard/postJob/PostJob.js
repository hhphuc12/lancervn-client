// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import 'react-select/dist/react-select.css';
import Select from 'react-select';
import 'react-datetime/css/react-datetime.css';
import Datetime from 'react-datetime';

class PostJob extends PureComponent<Props, State> {
    componentDidMount() {
        const {
            enterPostJob,
            getSelectCategoryIfNeed,
            getSelectSkillIfNeed,
            getSelectProvinceIfNeed,
        } = this.props.actions;
        enterPostJob();
        getSelectCategoryIfNeed();
        getSelectSkillIfNeed();
        getSelectProvinceIfNeed();
    }

    componentWillUnmount() {
        this.props.actions.leavePostJob();
    }

    componentWillReceiveProps(nextProps) {
        const {history} = this.props;
        if (nextProps.isDataChanged)
            history.push('/dashboard/job-posted');
    }

    state = {
        category: [],
        name: '',
        content: '',
        skill: [],
        deadlineOffer: new Date(),
        province: '',
        priceExpected: '',
        prioritize: '',
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
                {touched && ((error && <label className="text-danger" style={{ marginTop: 5 }}>{`* ${error}`}</label>) ||
                    (warning && <label className="text-danger" style={{ marginTop: 5 }}>{`* ${warning}`}</label>))}
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

    onAdd = async (
        event: SyntheticEvent<>
    ) => {
        if (event) {
            event.preventDefault();
        }
        const { postJobIfNeed, errorBadRequest } = this.props.actions;
        const {
            category,
            name,
            content,
            skill,
            deadlineOffer,
            province,
            priceExpected,
            prioritize,
        } = this.state;
        let skillText = [];
        skill.forEach(s => {
            skillText.push(s.label);
        });
        try {
            postJobIfNeed({
                category: category.label,
                name,
                content,
                skill: skillText,
                deadlineOffer,
                province: province.label,
                priceExpected,
                prioritize,
            });
        } catch (error) {
            errorBadRequest();
            /* eslint-disable no-console */
            console.log('post job went wrong..., error: ', error);
            /* eslint-enable no-console */
        }
    };

    render() {
        const { categories, skills, provinces, isFetching, isError, errorMessage } = this.props;
        const {
            category,
            name,
            content,
            skill,
            deadlineOffer,
            province,
            priceExpected,
            prioritize,
        } = this.state;
        return (
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Đăng việc</h4>
                                {/*{*/}
                                    {/*isError ? <label className="text-danger">{`* ${errorMessage}`}</label> : null*/}
                                {/*}*/}
                                <form className="forms-sample">
                                    <Field
                                        id="name"
                                        type="text"
                                        name="name"
                                        label="Tên công việc"
                                        component={this.renderField}
                                        fieldValue={name}
                                    />
                                    <div className="form-group">
                                        <label htmlFor="category">Lĩnh vực</label>
                                        <Select
                                            id="category"
                                            placeholder=""
                                            closeOnSelect={true}
                                            multi={false}
                                            name="category"
                                            value={category}
                                            options={categories}
                                            onChange={value => { this.setState({ category: value})}}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="skill">Kỹ năng cần có</label>
                                        <Select
                                            id="skill"
                                            placeholder=""
                                            closeOnSelect={false}
                                            multi={true}
                                            name="skill"
                                            value={skill}
                                            options={skills}
                                            onChange={value => { this.setState({ skill: value})}}
                                        />
                                    </div>
                                    <Field
                                        id="content"
                                        type="text"
                                        name="content"
                                        label="Mô tả chi tiết"
                                        component={this.renderTextArea}
                                        fieldValue={content}
                                    />
                                    <Field
                                        id="prioritize"
                                        type="text"
                                        name="prioritize"
                                        label="Ưu tiên"
                                        component={this.renderTextArea}
                                        fieldValue={prioritize}
                                    />
                                    <div className="form-group">
                                        <label htmlFor="province">Tỉnh/Thành phố</label>
                                        <Select
                                            id="province"
                                            placeholder="Bạn muốn thuê freelancer ở đâu?"
                                            closeOnSelect={true}
                                            multi={false}
                                            name="province"
                                            value={province}
                                            options={provinces}
                                            onChange={value => { this.setState({ province: value})}}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="deadlineOffer">Thời hạn nhận báo giá</label>
                                        <Datetime
                                            id="deadlineOffer"
                                            dateFormat="DD/MM/YYYY"
                                            timeFormat={false}
                                            closeOnSelect={true}
                                            defaultValue={deadlineOffer}
                                            inputProps={{ readOnly: true }}
                                            isValidDate={selected => selected.isAfter(new Date())}
                                            onChange={m => this.setState({ deadlineOffer: new Date(m) })}
                                        />
                                    </div>
                                    <Field
                                        id="priceExpected"
                                        type="number"
                                        name="priceExpected"
                                        label="Mức giá đề xuất (VNĐ)"
                                        component={this.renderField}
                                        fieldValue={priceExpected}
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
                                    <button className="btn btn-light">Hủy bỏ</button>
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
})(PostJob);

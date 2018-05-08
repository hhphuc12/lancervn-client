// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import 'react-select/dist/react-select.css';
import Select from 'react-select';

class PostPackage extends PureComponent<Props, State> {
    componentDidMount() {
        const {
            enterPostPackage,
            getSelectCategoryIfNeed,
        } = this.props.actions;
        enterPostPackage();
        getSelectCategoryIfNeed();
    }

    componentWillUnmount() {
        this.props.actions.leavePostPackage();
    }

    componentWillReceiveProps(nextProps) {
        const {history} = this.props;
        if (nextProps.isDataChanged)
            history.push('/dashboard/packages');
    }

    state = {
        name: '',
        expectedResult: '',
        dataNeed: '',
        process: [],
        target: '',
        priceExpected: '',
        category: '',
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
        const { postPackageIfNeed, errorBadRequest } = this.props.actions;
        const {
            name,
            expectedResult,
            dataNeed,
            process,
            target,
            priceExpected,
            category,
        } = this.state;
        try {
            postPackageIfNeed({
                name,
                expectedResult,
                dataNeed: dataNeed.split('\n'),
                process: process.split('\n'),
                target,
                priceExpected,
                category: category.label,
            });
        } catch (error) {
            errorBadRequest();
            /* eslint-disable no-console */
            console.log('post package went wrong..., error: ', error);
            /* eslint-enable no-console */
        }
    };

    render() {
        const { categories, isFetching, isError, errorMessage } = this.props;
        const {
            name,
            expectedResult,
            dataNeed,
            process,
            target,
            priceExpected,
            category,
        } = this.state;
        return (
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Tạo mới gói công việc</h4>
                                {/*{*/}
                                    {/*isError ? <label className="text-danger">{`* ${errorMessage}`}</label> : null*/}
                                {/*}*/}
                                <form className="forms-sample">
                                    <Field
                                        id="name"
                                        type="text"
                                        name="name"
                                        label="Tên gói công việc"
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
                                    <Field
                                        id="expectedResult"
                                        type="text"
                                        name="expectedResult"
                                        label="Khách hàng sẽ nhận được"
                                        component={this.renderTextArea}
                                        fieldValue={expectedResult}
                                    />
                                    <Field
                                        id="dataNeed"
                                        type="text"
                                        name="dataNeed"
                                        label="Khách hàng cần cung cấp (mỗi yêu cầu trên 1 dòng, không ghi ký tự đánh dấu đầu dòng)"
                                        component={this.renderTextArea}
                                        fieldValue={dataNeed}
                                    />
                                    <Field
                                        id="process"
                                        type="text"
                                        name="process"
                                        label="Trình tự làm việc (mỗi bước trên 1 dòng, không ghi ký tự đánh dấu đầu dòng)"
                                        component={this.renderTextArea}
                                        fieldValue={process}
                                    />
                                    <Field
                                        id="target"
                                        type="text"
                                        name="target"
                                        label="Đối tượng hướng tới"
                                        component={this.renderField}
                                        fieldValue={target}
                                    />
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
})(PostPackage);

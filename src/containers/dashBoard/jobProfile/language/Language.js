// @flow strong

import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import 'react-select/dist/react-select.css';
import Select from 'react-select';

class Experience extends PureComponent<Props, State> {
    constructor(props) {
        super(props);
        this.changeAddState = this.changeAddState.bind(this);
    }

    state = {
        jobPosition: '',
        company: '',
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

    render() {
        const { language, level, disableAdd } = this.state;
        const languageOptions = [
            { value: 'tieng-anh', label: 'Tiếng Anh' },
            { value: 'tieng-nhat', label: 'Tiếng Nhật' },
            { value: 'tieng-trung', label: 'Tiếng Trung' },
            { value: 'tieng-han', label: 'Tiếng Hàn' },
            { value: 'tieng-nga', label: 'Tiếng Nga' },
            { value: 'tieng-phap', label: 'Tiếng Pháp' },
            { value: 'tieng-duc', label: 'Tiếng Đức' },
            { value: 'tieng-lao', label: 'Tiếng Lào' },
            { value: 'tieng-campuchia', label: 'Tiếng Campuchia' },
        ];
        const levelOptions = [
            { value: 'so-cap', label: 'Sơ cấp' },
            { value: 'trung-cap', label: 'Trung cấp' },
            { value: 'cao-cap', label: 'Cao cấp' },
            { value: 'ban-ngu', label: 'Bản ngữ' },
        ];
        const { isOK, isFetching } = this.props;
        const formJSX = (
            <form>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label htmlFor="language">Ngoại ngữ</label>
                        <Select
                            id="language"
                            placeholder="Vui lòng chọn..."
                            closeOnSelect={false}
                            multi={true}
                            name="language"
                            value={language}
                            options={languageOptions}
                            onChange={value => { this.setState({ language: value})}}
                        />
                    </div>
                    <div className="col-md-6 form-group">
                        <label htmlFor="language">Trình độ</label>
                        <Select
                            id="level"
                            placeholder="Vui lòng chọn..."
                            closeOnSelect={false}
                            multi={true}
                            name="level"
                            value={level}
                            options={levelOptions}
                            onChange={value => { this.setState({ level: value})}}
                        />
                    </div>
                </div>
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
                <div className="col-12 grid-margin" style={{ marginBottom: 20 }}>
                    <div className="card">
                        <div className="card-body">
                            <div className="card-list-header">
                                <h5 className="card-title mb-4 job-profile-header-text" style={{ padding: 7 }}>Trình độ ngoại ngữ</h5>
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
})(Experience);

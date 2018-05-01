// @flow strong

import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import 'react-select/dist/react-select.css';
import Select from 'react-select';

class Experience extends PureComponent<Props, State> {
    componentDidMount() {
        this.props.actions.getListLanguageIfNeed();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isDataChanged) {
            nextProps.actions.getListLanguageIfNeed();
            nextProps.actions.resetDataChangeState();
        }
    }

    state = {
        language: '',
        level: '',
        disableAdd: true,
        isOK: true
    };

    changeAddState = e => {
        e.preventDefault();
        this.setState({ disableAdd: !this.state.disableAdd });
    };

    onAdd = () => {
        const { addLanguageIfNeed, errorBadRequest } = this.props.actions;
        const {
            language,
            level,
        } = this.state;
        try {
            addLanguageIfNeed({
                name: language.label,
                level: level.label,
            });
        } catch (error) {
            errorBadRequest();
            /* eslint-disable no-console */
            console.log('add language went wrong..., error: ', error);
            /* eslint-enable no-console */
        }
        this.setState({ disableAdd: !this.state.disableAdd });
    };

    onDelete = (id, e) => {
        e.preventDefault();
        const { deleteLanguageIfNeed, errorBadRequest } = this.props.actions;
        try {
            deleteLanguageIfNeed(id);
        } catch (error) {
            errorBadRequest();
            /* eslint-disable no-console */
            console.log('add language went wrong..., error: ', error);
            /* eslint-enable no-console */
        }
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
        const { languages, isFetching } = this.props;
        const languagesJSX = languages.map((l, index) => (
            <div className="col-4 grid-margin" key={index}>
                <div className="card card-job-profile">
                    <div className="card-body card-body-job-profile">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className="card-data-job-profile">
                                <p>Ngoại ngữ: <b>{l.name}</b></p>
                                <p>Trình độ: <b>{l.level}</b></p>
                            </div>
                            <div style={{ marginRight: 5 }}>
                                <a href="#" onClick={this.onDelete.bind(this, l._id)} title="Xóa">
                                    <i className="mdi mdi-bookmark-remove icon-md text-danger"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
        const formJSX = (
            <form>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label htmlFor="language">Ngoại ngữ</label>
                        <Select
                            id="language"
                            placeholder=""
                            closeOnSelect={true}
                            multi={false}
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
                            placeholder=""
                            closeOnSelect={true}
                            multi={false}
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
                            <div className="row">
                                { languagesJSX }
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

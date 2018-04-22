// @flow strong

import React, { PureComponent } from 'react';
import 'react-select/dist/react-select.css';
import Select from 'react-select';

class Experience extends PureComponent<Props, State> {
    constructor(props) {
        super(props);
    }

    state = {
        categories: [],
        disableAdd: true,
        isOK: true
    };

    changeAddState = e => {
        e.preventDefault();
        this.setState({ disableAdd: !this.state.disableAdd });
    };

    render() {
        const { categories, disableAdd } = this.state;
        const { isOK, isFetching } = this.props;
        const selectOptions = [
            { value: 'test1', label: 'Test 1' },
            { value: 'test2', label: 'Test 2' },
            { value: 'test3', label: 'Test 3' },
        ];
        const formJSX = (
            <form>
                <div className="form-group">
                    <label htmlFor="category">Dịch vụ</label>
                    <Select
                        id="category"
                        placeholder="Chọn một hoặc nhiều loại dịch vụ"
                        closeOnSelect={false}
                        multi={true}
                        name="category"
                        value={categories}
                        options={selectOptions}
                        onChange={value => { this.setState({ categories: value})}}
                    />
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
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-list-header">
                                <h5 className="card-title mb-4 job-profile-header-text" style={{ padding: 7 }}>Dịch vụ cung cấp</h5>
                                <div>
                                    <a href="#" onClick={this.changeAddState}>
                                        <i className="mdi mdi-pen icon-md"/>
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

export default Experience;

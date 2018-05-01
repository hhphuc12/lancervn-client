// @flow strong

import React, { PureComponent } from 'react';
import 'react-select/dist/react-select.css';
import Select from 'react-select';

class Experience extends PureComponent<Props, State> {
    state = {
        category: [],
        disableAdd: true,
        isOK: true
    };

    componentDidMount() {
        const {
            getUserCategoryIfNeed,
            getSelectCategoryIfNeed,
        } = this.props.actions;
        getSelectCategoryIfNeed();
        getUserCategoryIfNeed();
    }

    async componentWillReceiveProps(nextProps) {
        // if (nextProps.isDataChanged) {
        //     nextProps.actions.getListExperienceIfNeed();
        //     nextProps.actions.resetDataChangeState();
        // }
        const { userCategories } = nextProps;
        if (userCategories && userCategories.length !== 0) {
            await this.setState({category: userCategories});
        }
    }

    changeAddState = e => {
        e.preventDefault();
        this.setState({ disableAdd: !this.state.disableAdd });
    };

    onUpdate = () => {
        const { addCategoryIfNeed, errorBadRequest } = this.props.actions;
        try {
            const { category } = this.state;
            const categoryText = [];
            category.forEach(c => categoryText.push(c.label));
            addCategoryIfNeed(categoryText);
        } catch (error) {
            errorBadRequest();
            /* eslint-disable no-console */
            console.log('add category went wrong..., error: ', error);
            /* eslint-enable no-console */
        }
        this.setState({ disableAdd: !this.state.disableAdd });
    };

    render() {
        const { disableAdd, category } = this.state;
        const { categories, isFetching } = this.props;
        console.log({category});
        const buttonJSX = (
            <div>
                <button
                    className="btn btn-success mr-2"
                    type="button"
                    onClick={this.onUpdate}
                    disabled={isFetching}
                >
                    {
                        isFetching ?
                            <span>
                                    <i className="fa fa-spinner fa-pulse fa-fw"/>
                                </span>
                            :
                            <span>
                                    Cập nhật
                                </span>
                    }
                </button>
                <button className="btn btn-light" onClick={this.changeAddState}>Hủy bỏ</button>
            </div>
        );
        const formJSX = (
            <form>
                <div className="form-group">
                    <Select
                        placeholder="Chọn một hoặc nhiều loại dịch vụ"
                        closeOnSelect={false}
                        multi={true}
                        name="category"
                        value={category}
                        options={categories}
                        disabled={disableAdd}
                        onChange={value => { this.setState({ category: value})}}
                    />
                </div>
                {
                    disableAdd ? null : buttonJSX
                }
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
                                formJSX
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Experience;

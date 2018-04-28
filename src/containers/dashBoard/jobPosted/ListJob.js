// @flow strong

import React, {PureComponent} from 'react';

class ListJob extends PureComponent<Props, State> {
    componentDidMount() {
        const {
            actions: {
                enterJobPosted,
            }
        } = this.props;
        enterJobPosted();
    }

    componentWillUnmount() {
        this.props.actions.leaveJobPosted();
    }

    render() {
        // const { skills } = this.props;
        // const skillsJSX = skills.map((skill, index) => (
        //     <tr key={index}>
        //         <td>{index + 1}</td>
        //         <td>{skill.name}</td>
        //         <td>{skill.description}</td>
        //         <td>{dateFormatter(skill.updatedAt)}</td>
        //         <td className="text-right">
        //             <a href="#" className="btn btn-outline-danger btn-sm">
        //                 Xóa
        //             </a>
        //         </td>
        //     </tr>
        // ));

        return (
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-list-header">
                                    <h5 className="card-title mb-4" style={{ padding: 7 }}>Skills</h5>
                                    <div>
                                        <a href="/dashboard/post-job" className="btn btn-primary">
                                            <i className="fa fa-plus"/>
                                            Đăng việc
                                        </a>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table center-aligned-table table-striped">
                                        <thead>
                                        <tr>
                                            <th className="border-bottom-0">No.</th>
                                            <th className="border-bottom-0">Username</th>
                                            <th className="border-bottom-0">Create at</th>
                                            <th className="border-bottom-0">Updated at</th>
                                            <th className="border-bottom-0 text-right">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            // skillsJSX
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListJob;

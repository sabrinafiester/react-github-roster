import React from 'react';

export class UserDetails extends React.Component {
    render() {
        let content = "Loading..";
        if(this.props.user && Object.keys(this.props.user).length > 0 && this.props.user.id > 0) {
            let user = this.props.user;
            content = (
                <div className="row">
                    <div className="col-sm-2">
                        <img className="card-img-top user-details" src={user.avatar_url} />
                    </div>
                    <div className="col-sm-10">
                        <div className="card-body">
                            <h5 className="card-title">{user.login}</h5>
                            <ul className="list-group list-group-flush borderless">
                                <li className="list-group-item ">Name: {user.name}</li>
                                <li className="list-group-item">Location: <span>{user.location}</span></li>
                                {user.email && <li className="list-group-item">Email: {user.email}</li>}
                                <li className="list-group-item">Github member since: {user.join_date.toLocaleDateString()}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}
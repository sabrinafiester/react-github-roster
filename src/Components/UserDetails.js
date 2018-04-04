import React from 'react';

export class UserDetails extends React.Component {
    render() {
        let content = "Loading..";
        if(this.props.user && Object.keys(this.props.user).length > 0 && this.props.user.login) {
            let user = this.props.user;
            content = (

                <div className="row ">
                    <div className="col-sm-2">
                        <img className="card-img-top img-thumbnail user-details" alt="" src={user.avatar_url} />
                    </div>
                    <div className="col-sm-5">
                        <div className="card-body text-left">
                            <ul className="list-group list-group-flush borderless">
                                <li className="list-group-item ">Name: {user.name}</li>
                                <li className="list-group-item">Location: <span>{user.location}</span></li>
                                {user.email && <li className="list-group-item">Email: {user.email}</li>}
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-5">
                        <div className="card-body text-left">
                            <ul className="list-group list-group-flush borderless">
                                <li className="list-group-item">Github member since: {user.join_date.toLocaleDateString()}</li>
                                <li className="list-group-item">Public commits in last year: {user.public_commits}</li>
                                <li className="list-group-item">Public repositories: {user.public_repos}</li>
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
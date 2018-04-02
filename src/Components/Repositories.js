import React from 'react';

export class Repositories extends React.Component {
    renderRepos() {
        return this.props.repos.map(repo => (
            <li key={repo.id} className="list-group-item">{repo.name}, Created: {new Date(repo.created_at).toDateString()}</li>
        ));
    }
    render() {
        let content = "Loading..";
        if(this.props.repos && this.props.repos.length > 0 ) {
            console.log(this.props.repos);
            content = (
                <div className="row">
                    <div className="col-sm">
                        <div className="card-body">
                            <h5 className="card-title">Repositories</h5>
                            <ul className="list-group list-group-flush">
                                {this.renderRepos()}
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
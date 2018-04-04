import React from 'react';

export class Repositories extends React.Component {
    renderRepos() {
        return this.props.repos.map(repo => (
            <div className="card repo-card text-center" key={repo.id}>
                <div className="card-body">
                    <a href={repo.url}>
                        <h5 className="card-title">{repo.name}</h5>
                    </a>
                    <p className="card-text">{repo.description}</p>
                    <div className="timestamp-box">
                        <p className="card-text card-timestamp"><small className="text-muted">Created {new Date(repo.createdAt).toLocaleDateString()} </small></p>
                        <p className="card-text card-timestamp"><small className="text-muted">Last updated {new Date(repo.pushedAt).toLocaleString()} </small></p>
                    </div>
                    </div>
            </div>
        ));
    }
    render() {
        let content = "Loading..";
        if(this.props.repos && this.props.repos.length > 0 ) {
            content = this.renderRepos();
        }
        return (
            <div className="row">
                <div className="col-sm">
                    <div className="card">
                        <div className="card-header">
                            {this.props.contr && <h5>Repositories Contributed To</h5>}
                            {!this.props.contr && <h5>Repositories</h5>}
                        </div>
                        <div className="card-body">
                            <div className="card-columns">
                                {content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
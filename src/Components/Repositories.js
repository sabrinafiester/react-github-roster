import React from 'react';

export class Repositories extends React.Component {
    renderRepos() {
        return this.props.repos.map(repo => (
            <div className="card repo-card text-center" key={repo.id}>
                <div className="card-body">
                    <a href={repo.html_url}>
                        <h5 className="card-title">{repo.name}</h5>
                    </a>
                    <p className="card-text"><small className="text-muted">Created {new Date(repo.created_at).toLocaleDateString()} </small></p>
                    <p className="card-text"><small className="text-muted">Last updated {new Date(repo.updated_at).toLocaleString()} </small></p>
                </div>
            </div>
        ));
    }
    render() {
        let content = "Loading..";
        if(this.props.repos && this.props.repos.length > 0 ) {
            console.log(this.props.repos);
            content = (
                <div className="row">
                    <div className="col-sm">
                        <div className="card">
                            <div className="card-header">
                                <h5>Repositories</h5>
                            </div>
                            <div className="card-body">
                                <div className="card-columns">
                                    {/*<ul className="list-group list-group-flush">*/}
                                    {this.renderRepos()}
                                    {/*</ul>*/}
                                </div>
                            </div>
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
import React from 'react';

export class Organizations extends React.Component {
    renderOrgs() {
        return this.props.orgs.map(org => (
            <div className="card repo-card text-center" key={org.id}>
                <div className="card-body text-center">
                    <img className="card-img-top org-logo mx-auto" src={org.avatarUrl} alt=""/>
                    <h5 className="card-title mx-auto px-auto"><a href={org.url}>{org.name}</a></h5>
                    <p className="card-text mx-auto px-auto">{org.location}</p>
                </div>
            </div>
        ));
    }

    render() {
        let content = "Loading..";
        if(this.props.orgs && this.props.orgs.length > 0 ) {
            content = this.renderOrgs();
        }
        return (
            <div className="row">
                <div className="col-sm">
                    <div className="card">
                        <div className="card-header">
                            <h5>Organizations</h5>
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
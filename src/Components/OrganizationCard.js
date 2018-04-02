import React from 'react';

export class OrganizationCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {org: {}};
    }
    componentWillReceiveProps(nextProps){
        console.log('will receive');
        if(nextProps.org && Object.keys(nextProps.org).length > 0){
            this.getDetails(nextProps.org.url);
        }
    }
    getDetails(url){
        const that = this;
        if (url) {
            fetch(url).then(function (response) {
                return response.json();
            }).then(function (result) {
                that.setState({org: result});
            });
        }
    }
    render() {
        let content = "Loading..";
        let org = this.state.org;
        if (org && Object.keys(org).length > 0) {
            console.log('org');
            console.log(org);
            content = (
                <div className="card org-card" key={org.id}>
                    <div className="card-body">
                        <img className="card-img-top org-logo mx-auto" src={org.avatar_url} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">{org.name}</h5>
                            <p className="card-text">{org.location}</p>
                            <p className="card-text"><small className="text-muted">Last updated {new Date(org.updated_at).toLocaleString()} </small></p>
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
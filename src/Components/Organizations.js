import React from 'react';
import {OrganizationCard} from './OrganizationCard';

export class Organizations extends React.Component {

    renderOrgs() {
        console.log(this.props.orgs[0]);
        return this.props.orgs.map(org => (
            <OrganizationCard org={org} key={org.id} />

        ));
    }

    render() {
        let content = "Loading..";
        if(this.props.orgs && this.props.orgs.length > 0 ) {
            console.log(this.props.orgs);
            content = (
                <div className="row">
                    <div className="col-sm">
                        <div className="card">
                            <div className="card-header">
                                <h5>Organizations</h5>
                            </div>
                            <div className="card-body">
                        <div className="card-columns">
                            {/*<ul className="list-group list-group-flush">*/}
                                {this.renderOrgs()}
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
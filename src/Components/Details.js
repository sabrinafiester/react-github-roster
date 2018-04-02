import React from 'react';
import {UserDetails} from './UserDetails';
import {Repositories} from "./Repositories";
import {Organizations} from "./Organizations";

export class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user:{id: "", location: "", name: "", join_date: "", email: "", avatar_url: ""}, repos: {}, orgs: {}};
    }
    componentWillReceiveProps(nextProps){
         if(nextProps.user && Object.keys(nextProps.user).length > 0 && nextProps.user.id != this.state.id){ 
            this.getDetails(nextProps.user.login);
        }
    }
    getDetails(url){
        const that = this;
        if (url) {
            fetch('https://api.github.com/users/' + url).then(function (response) {
                return response.json();
            }).then(function (result) {
                const userObj = {
                    login: result.login,
                    id: result.id,
                    profile: result.html_url,
                    location: result.location, 
                    name: result.name, 
                    join_date: new Date(result.created_at), 
                    email: result.email, 
                    avatar_url: result.avatar_url, 
                    repos: that.getUserRepos(result.repos_url),
                    orgs: that.getUserOrgs(result.organizations_url)
                };
                that.setState({user: userObj});
            });
        }
    }
    getUserRepos(url) {
        const that = this;
        if(url) {
            fetch(url).then(function(response) {
                return response.json();
            }).then(function(result) {
                that.setState({repos: result});
                return result;
            })

            
        }
    }
        getUserOrgs(url) {
        const that = this;
        if(url) {
            fetch(url).then(function(response) {
                return response.json();
            }).then(function(result) {
                that.setState({orgs: result});
                return result;
            })
        }
    }


    render() {
        console.log('render');
        console.log(this.state);
        let user = this.state.user;
        return(
            <div>
                <UserDetails user={user} />
                <Repositories repos={this.state.repos} />
                <Organizations orgs={this.state.orgs} />
            </div>
        )
    }
}

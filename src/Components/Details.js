import React from 'react';
import {UserDetails} from './UserDetails';
import {Repositories} from "./Repositories";
import {Organizations} from "./Organizations";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
    uri: "https://api.github.com/graphql",
    request: async (operation) => {
        const token = 'bearer 7edeeecfc3f48e7e50f665b4e17043764e606478';
        operation.setContext({
            headers: {
                authorization: token
            }
        });
    }
});

const detailQ = gql`
    query user($login: String!, $id: ID!, $startDate: GitTimestamp)
    {
        user(login:$login) {
            bio,
            login,
    		avatarUrl,
    		createdAt,
    		email,
    		id,
    		url,
    		location,
    		organizations(first: 100){
    			totalCount,
    			nodes {
                    id,
            				avatarUrl,
            				description,
            				location,
            				name,
            				url,
            				websiteUrl
                }
    		},
    		name,
            createdAt,
            repositories(first: 100) {
                totalCount,
          nodes{
          id,
            name,
            owner {
                login
             },
            description,
            createdAt,
            pushedAt,
            url,
            isFork,
            defaultBranchRef{
      target{
        ... on Commit {
          history(first: 100, since: $startDate, author: {id: $id}){
            totalCount
          }
        }
      }
        }
          },
          
        },
        repositoriesContributedTo(first: 100) {
          totalCount,
          nodes {
          id,
              name,
            owner {
                login
             },
            description,
            createdAt,
            pushedAt,
            url,
            isFork,
            defaultBranchRef{
      target{
        ... on Commit {
          history(first: 100, since: $startDate, author: {id: $id}){
            totalCount
          }
        }
      }
        }
          }
        }
        }
    }
    `;

export class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user:{id: "", location: "", name: "", join_date: "", email: "", avatar_url: ""}, repos: {}, orgs: {}, contRepos: {}};
    }

    componentWillReceiveProps(nextProps){
         if(nextProps.user && Object.keys(nextProps.user).length > 0 && nextProps.user.id !== this.state.id){
             let variables = {
                 "login": nextProps.user.login,
                 "id": nextProps.user.id,
                 "startDate": new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toJSON()
             }
            this.fetchDetails(detailQ, variables);
        }
    }

    fetchDetails(query, variables) {
        const that = this;
        client.query({
            query: query,
            variables: variables
        }).then(async function(res) {
            const repoObj = res.data.user.repositories.nodes;
            const orgObj = res.data.user.organizations.nodes;
            const contRepoObj = res.data.user.repositoriesContributedTo.nodes;
            const commitArr = await that.getCommitCount(repoObj, contRepoObj);
            const totalCommits = commitArr.reduce((a, b) =>
                a + b);

            const userObj = {
                login: res.data.user.login,
                id: res.data.user.id,
                profile: res.data.user.url,
                location: res.data.user.location,
                name: res.data.user.name,
                join_date: new Date(res.data.user.createdAt),
                email: res.data.user.email,
                avatar_url: res.data.user.avatarUrl,
                public_commits: totalCommits,
                public_repos: res.data.user.repositories.totalCount
            };
            that.setState({user: userObj, orgs: orgObj, repos: repoObj, contRepos: contRepoObj})
        });
    }

    async getCommitCount(userRepos, contRepos) {
        const userCommits = userRepos.map(repNode=>{
            return repNode.defaultBranchRef.target.history.totalCount;
        });
        const contCommits = contRepos.map(contNode=>{
            return contNode.defaultBranchRef.target.history.totalCount;
        });

        return [...userCommits, ...contCommits];
    }


    render() {
        let user = this.state.user;
        return(
            <div>
                <UserDetails user={user} />
                {this.state.repos.length > 0 && <Repositories repos={this.state.repos} />}
                {this.state.orgs.length > 0 && <Organizations orgs={this.state.orgs} />}
                {this.state.contRepos.length > 0 && <Repositories repos={this.state.contRepos} contr={true}/>}
            </div>
        )
    }
}

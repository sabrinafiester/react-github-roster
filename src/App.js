import React from 'react';
import ReactDOM from 'react-dom';
import {UserList} from './Components/UserList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Details} from './Components/Details';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
    uri: "https://api.github.com/graphql",
    request: async (operation) => {
        const token = 'bearer ' + process.env.REACT_APP_PAT;
        operation.setContext({
            headers: {
                authorization: token
            }
        });
    }
});
class App extends React.Component {
  constructor(props) {
    super(props);
    this.chooseUser = this.chooseUser.bind(this);
    this.state = { members: [], currentMember: {}, currentMemberIndex: 0 };
  }
  chooseUser(newUser) {
    this.setState({
      currentMemberIndex: newUser
    });
  }
  memberListQ = gql`{
        organization(login:"code42") {
 				  members(first: 100) {
            nodes {
              login,
              id
            }
          }  
      }
}`;

  fetchFirst(query) {
        client.query({
            query: query
        }).then(data=>this.setState({members: data.data.organization.members.nodes}));

    }
    componentWillMount() {
        this.fetchFirst(this.memberListQ);

    }

  render() {
    let currentMember = {};
    if(this.state.members.length>0) {
      currentMember = this.state.members[this.state.currentMemberIndex];
    }
    return (
        <MuiThemeProvider>
            <ApolloProvider client={client}>
            <div>
                <nav className="navbar navbar-light bg-light">
                    <a className="navbar-brand">
                        <img src="https://www.code42.com/wp-content/themes/c42-corporate-wp-theme/dist/images/logo-horizontal.svg" height="30" alt=""/>
                    </a>
                </nav>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-2">
                            <UserList chooseUser={this.chooseUser} users={this.state.members} />
                        </div>
                        <div className="col-sm-10">
                            <Details user={currentMember}/>
                        </div>
                    </div>
                </div>
            </div>
            </ApolloProvider>

        </MuiThemeProvider>
      );
  }
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
  );

export default App;

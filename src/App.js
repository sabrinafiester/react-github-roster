import React from 'react';
import ReactDOM from 'react-dom';
import {UserList} from './Components/UserList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Details} from './Components/Details';

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
  fetchFirst(url) {
        const that = this;
        if (url) {
            fetch('https://api.github.com/orgs/code42/members').then(function (response) {
                return response.json();
            }).then(function (result) {

                that.setState({ members: result, currentMember: result[0]});

            });
        }
    }
    componentWillMount() {

        this.fetchFirst("reactjs");

    }

  render() {
    let currentMember = {};
    if(this.state.members.length>0) {
      currentMember = this.state.members[this.state.currentMemberIndex];
    }
    // console.log("current");
    // console.log(currentMember);
    return (
        <MuiThemeProvider>

            <div>
                <nav className="navbar navbar-light bg-light">
                    <a className="navbar-brand" href="#">
                        <img src="https://www.code42.com/wp-content/themes/c42-corporate-wp-theme/dist/images/logo-horizontal.svg" height="30" alt=""/>
                    </a>
                </nav>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-2">
                            <UserList chooseUser={this.chooseUser} users={this.state.members}/>
                        </div>
                        <div className="col-sm-10">
                            <Details user={currentMember}/>
                        </div>
                    </div>
                </div>
            </div>
        </MuiThemeProvider>
      );
  }
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
  );

export default App;

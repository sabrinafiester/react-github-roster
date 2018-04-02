import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';


export class UserList extends React.Component {
    constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    const userKey = e.target.id;
    this.props.chooseUser(userKey);
  }
    renderUsers() {
        return this.props.users.map((user, index) => (
            <li id={index} key={index} onClick={this.handleClick} className="list-group-item list-group-item-action">{user.login}</li>
            // <ListItem key={index} primaryText={user.login} onClick={this.handleClick} />
            )
    )}
    render() {
        let content = "Loading..";
        if(this.props.users && this.props.users.length > 0 ) {
            content = this.renderUsers();
        }
        return(
            <div>
            <h3 className="card-title py-2">Members</h3>
            <ul className="list-group list-group-flush">
                {content}
            </ul>
            </div>
        )
    }
}
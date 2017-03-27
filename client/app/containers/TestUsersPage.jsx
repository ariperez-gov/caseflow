import React, { PropTypes } from 'react';
import ApiUtil from '../util/ApiUtil';
import Button from '../components/Button';

export default class TestUsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser
    }
  }

  render() {
    let {
      users
    } = this.props;

    return <div className="sub-page">
      <ul>
      {users.map(function(user){
        return <li>
          <Button
            name={user["full_name"]}
            onClick={this.setRole.bind(this, user)}
            classNames={["usa-button", "usa-button-outline"]}
          />
          {Object.keys(user).map(function(s){return user[s]}).join(",")}
        </li>
      }, this)}
      </ul>
    </div>;
  }

  setRole = (user) => {
    ApiUtil.post(`/test/set_user/${user["id"]}`).then(() => {
      window.location.reload()
    }, () => {
      console.log("error!")
    });
  };
}

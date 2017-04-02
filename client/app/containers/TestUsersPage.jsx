import React, { PropTypes } from 'react';
import ApiUtil from '../util/ApiUtil';
import Button from '../components/Button';

export default class TestUsersPage extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    currentUser: this.props.currentUser,
	    loading: {
		demo: false
	    }
	}
    }

    render() {
	let {
	    users
	} = this.props;

	return <div className="sub-page">
    <p>
	{users.map((user) => {
             return <div>
		 <Button
		     app="demo"
		     name={user["css_id"]}
		     onClick={this.setRole.bind(this, user)}
		     loading={this.state.loading.demo}
		     classNames={["usa-button", "usa-button-outline"]}
		     ref={user["station_id"]}
		 />
             </div>
	 })}
    </p>
	</div>;
    }

    setRole = (user) => {
	
	ApiUtil.post(`/test/set-user/${user["id"]}`).then(() => {
	    window.location.reload()
	    console.log("DAYUM")
	}, () => {
	    console.log("error!")
	});
    };
}

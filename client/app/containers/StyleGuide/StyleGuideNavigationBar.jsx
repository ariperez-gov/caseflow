import React from 'react';
import StyleGuideComponentTitle from '../../components/StyleGuideComponentTitle';
import NavigationBar from '../../components/NavigationBar';

export default class StyleGuideNavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false
    };
  }

  handleMenuClick = () => {
    this.setState((prevState) => ({
      menu: !prevState.menu
    }));
  };

  options = () => {
    return [
      {
        title: 'Help',
        link: '#navigation_bar'
      },
      {
        title: 'Send feedback',
        link: '#navigation_bar'
      },
      {
        title: 'Sign out',
        link: '#navigation_bar'
      }
    ];
  }

  render(){
    return <div>
      <StyleGuideComponentTitle
        title="Navigation Bar"
        id="navigation_bar"
        link="StyleGuideNavigationBar.jsx"
      />
    <p>
      The Navigation Bar is a simple white bar that sits on top of every application.
      Our navigation bar is non-sticky and scrolls out of view as the user scrolls
      down the page. It includes branding for the specific application on the left;
      a Caseflow logo and application name (see Application Branding for more details).
    </p>
    <p>
      The Navigation Bar also includes the user menu on the right.
      This menu indicates which user is signed in and contains links to submit feedback,
      view the application’s help page, see newly launched features, and log out.
    </p>
    <p>
      The navigation bar is a total of 90px tall with a 1px border-bottom colored grey-lighter.
    </p>
      <NavigationBar name="App Bar" />
  </div>
  }
}

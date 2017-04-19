import React, { PropTypes } from 'react';
// To be used with the "StickyNav" component

export default class NavLink extends React.Component {
  render() {
    let {
      anchor,
      name
    } = this.props;

    return <li><a href={anchor}>{name}</a></li>;
  }
}

NavLink.propTypes = {
  anchor: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

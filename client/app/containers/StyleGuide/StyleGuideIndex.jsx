import React from 'react';
import StyleGuideModal from './StyleGuideModal';
import StyleGuideTabs from './StyleGuideTabs';
import StyleGuideProgressBar from './StyleGuideProgressBar';
import StyleGuideLoadingButton from './StyleGuideLoadingButton';
import StyleGuideLinkButton from './StyleGuideLinkButton';
import StyleGuideRadioField from './StyleGuideRadioField';
import StyleGuideCheckboxes from './StyleGuideCheckboxes';
import StyleGuideTables from './StyleGuideTables';
import StyleGuideTextInput from './StyleGuideTextInput';
import StyleGuidePlaceholder from './StyleGuidePlaceholder';
import StickyNav from '../../components/StickyNav';
import NavLink from '../../components/NavLink';
import StyleGuideDropdownMenu from './StyleGuideDropdownMenu';
import StyleGuideSearchableDropdown from './StyleGuideSearchableDropdown';

export default class StyleGuideIndex extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      height: 0
    }
  }

  calcHeight = (node) => {
    this.setState({
      height: node.offsetHeight
    })
  }


  render() {
    let {
      height
    } = this.props;
/* eslint-disable max-len */

    let divStyle = {
      height: this.state.height - 155
    }
    console.log(divStyle);

    return <div className="cf-app cf-push-row cf-sg-layout cf-app-segment cf-app-segment--alt"
      ref={(node) => this.calcHeight(node)}>
      <StickyNav style={this.divStyle}>
        <NavLink anchor="/styleguide#" name="Introduction"></NavLink>
        <NavLink anchor="#typography" name="Typography"></NavLink>
        <NavLink anchor="#colors" name="Colors"></NavLink>
        <NavLink anchor="#buttons" name="Buttons"></NavLink>
        <NavLink anchor="#search" name="Search"></NavLink>
        <NavLink anchor="#dropdown" name="Dropdown Menus"></NavLink>
        <NavLink anchor="#checkboxes" name="Checkboxes"></NavLink>
        <NavLink anchor="#radios" name="Radio Fields"></NavLink>
        <NavLink anchor="#date_input" name="Date Input"></NavLink>
        <NavLink anchor="#tables" name="Tables"></NavLink>
        <NavLink anchor="#tabs" name="Tabs"></NavLink>
        <NavLink anchor="#tabs" name="Accordions"></NavLink>
        <NavLink anchor="#tabs" name="Form Fields"></NavLink>
        <NavLink anchor="#loading_buttons" name="Loading Buttons"></NavLink>
        <NavLink anchor="#loading_buttons" name="Alerts"></NavLink>
        <NavLink anchor="#loading_buttons" name="Layout"></NavLink>
        <NavLink anchor="#loading_buttons" name="Messages"></NavLink>
        <NavLink anchor="#loading_buttons" name="Branding"></NavLink>
        <NavLink anchor="#loading_buttons" name="Dashboard"></NavLink>
        <NavLink anchor="#modals" name="Modals"></NavLink>
        <NavLink anchor="#progress_bar" name="Progress Bar"></NavLink>
        <NavLink anchor="#text_input" name="Text Input"></NavLink>
      </StickyNav>
      <div className="cf-push-right cf-sg-content">
      <h1 id="commons">Caseflow Commons</h1>
        <p>
          Caseflow Commons is home to our most up to date style guide, UI Kit, and code for Caseflow products.
          The goal is to maintain consistent styling across Caseflow applications and to keep our interface predictable and familiar to the user.
          This unified system also helps us reuse common code across our apps and increase the efficiency of the design process.
        </p>
        <p>
          <a className="usa-button"
            href="https://github.com/department-of-veterans-affairs/caseflow-commons">
            View on Github
          </a>
          <a className="usa-button usa-button-outline"
          href="https://github.com/department-of-veterans-affairs/appeals-design-research/issues/8">
          Download UI Kit</a>
        </p>
        <div className="cf-help-divider"></div>
        <StyleGuidePlaceholder
          title="Typography"
          id="typography" />
        <StyleGuidePlaceholder
          title="Headings and Body"
          id="headings_and_body"
          subsection={true} />
        <StyleGuidePlaceholder
          title="Styles"
          id="styles"
          subsection={true} />
        <div className="cf-help-divider"></div>
        <StyleGuidePlaceholder
          title="Colors"
          id="colors" />
        <div className="cf-help-divider"></div>
        <StyleGuidePlaceholder
          title="Buttons"
          id="buttons" />
        <div className="cf-help-divider"></div>
        <StyleGuidePlaceholder
          title="Search"
          id="search" />
        <div className="cf-help-divider"></div>
        <StyleGuidePlaceholder
          title="Dropdown Menus"
          id="dropdown" />
        <div className="cf-help-divider"></div>
        <StyleGuidePlaceholder
          title="Date Input"
          id="colors" />
        <div className="cf-help-divider"></div>
        <StyleGuidePlaceholder
          title="Accordions"
          id="colors" />
        <div className="cf-help-divider"></div>
        <StyleGuidePlaceholder
          title="Forms Fields"
          id="colors" />
        <div className="cf-help-divider"></div>
        <StyleGuidePlaceholder
          title="Alerts"
          id="colors" />
        <div className="cf-help-divider"></div>
        <StyleGuidePlaceholder
          title="Layout"
          id="colors" />
        <div className="cf-help-divider"></div>
        <StyleGuidePlaceholder
          title="Messages"
          id="colors" />
        <div className="cf-help-divider"></div>
        <StyleGuidePlaceholder
          title="Branding"
          id="colors" />
        <div className="cf-help-divider"></div>
        <StyleGuidePlaceholder
          title="Dashboard"
          id="colors" />
        <div className="cf-help-divider"></div>
        <StyleGuideModal />
        <div className="cf-help-divider"></div>
        <StyleGuideTabs />
        <div className="cf-help-divider"></div>
        <StyleGuideLoadingButton />
        <div className="cf-help-divider"></div>
        <StyleGuideLinkButton />
        <div className="cf-help-divider"></div>
        <StyleGuideRadioField />
        <div className="cf-help-divider"></div>
        <StyleGuideCheckboxes />
        <div className="cf-help-divider"></div>
        <StyleGuideTables />
        <div className="cf-help-divider"></div>
        <StyleGuideProgressBar />
        <div className="cf-help-divider"></div>
        <StyleGuideTextInput />
        <div className="cf-help-divider"></div>
        <StyleGuideDropdownMenu />
        <div className="cf-help-divider"></div>
        <StyleGuideSearchableDropdown />
    </div>
    </div>;
  }
}

/* eslint-enable max-len */

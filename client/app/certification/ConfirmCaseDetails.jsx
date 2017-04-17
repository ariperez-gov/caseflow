import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Constants from './constants/constants';
import { Redirect } from 'react-router-dom';

import RadioField from '../components/RadioField';
import TextField from '../components/TextField';
import Footer from './Footer';

const representativeTypeOptions = [
  {
    displayText: "Attorney",
    value: Constants.representativeTypes.ATTORNEY
  },
  {
    displayText: "Agent",
    value: Constants.representativeTypes.AGENT
  },
  {
    displayText: "Organization",
    value: Constants.representativeTypes.ORGANIZATION
  },
  {
    displayText: "None",
    value: Constants.representativeTypes.NONE
  },
  {
    displayText: "Other",
    value: Constants.representativeTypes.OTHER
  }
];

/*
 * Confirm Case Details
 *
 * This page will display information from BGS
 * about the appellant's representation for the appeal
 * and confirm it.
 *
 * On the backend, we'll then update that information in VACOLS
 * if necessary. This was created since power of attorney
 * information in VACOLS is very often out of date, which can
 * in case delays -- attorneys can't access the appeal information
 * if they're not noted as being the appellant's representative
 *
 */

export class ConfirmCaseDetails extends React.Component {
  // TODO: updating state in ComponentWillMount is
  // sometimes thought of as an anti-pattern.
  // is there a better way to do this?
  componentWillMount() {
    this.props.updateProgressBar();
  }

  getErroredFields() {
    const erroredFields = [];

    if (!this.props.representativeName && !this.representativeTypeIsNone()) {
      erroredFields.push('representativeName');
    }

    if (!this.props.representativeType) {
      erroredFields.push('representativeType');
    }

    if (this.representativeTypeIsOther() && !this.props.otherRepresentativeType) {
      erroredFields.push('otherRepresentativeType');
    }

    return erroredFields;
  }

  representativeTypeIsNone() {
    return this.props.representativeType === Constants.representativeTypes.NONE;
  }

  representativeTypeIsOther() {
    return this.props.representativeType === Constants.representativeTypes.OTHER;
  }

  getRepresentativeType() {
    return this.representativeTypeIsOther() ?
      this.otherRepresentativeType : this.representativeType;
  }

  onClickContinue() {
    const erroredFields = this.getErroredFields();

    if (erroredFields.length) {
      this.props.onValidationFail(erroredFields);

      return;
    }

    // Translate camelcase React names into snake case
    // Rails key names.
    /* eslint-disable camelcase */
    const data = {
      representative_type: this.props.representativeType,
      representative_name: this.props.representativeName
    };
    /* eslint-enable "camelcase" */

    this.props.startRequest(data);
  }

  render() {
    let { representativeType,
      onRepresentativeTypeChange,
      representativeName,
      onRepresentativeNameChange,
      otherRepresentativeType,
      onOtherRepresentativeTypeChange,
      validationFailed,
      loading,
      updateFailed,
      updateSucceeded,
      match
    } = this.props;

    if (updateSucceeded) {
      return <Redirect
        to={`/certifications/${match.params.vacols_id}/confirm_hearing`}/>;
    }

    if (updateFailed) {
      // TODO: add real error handling and validated error states etc.
      return <div>500 500 error error</div>;
    }

    const shouldShowOtherTypeField =
      representativeType === Constants.representativeTypes.OTHER;

    return <div>
        <div className="cf-app-segment cf-app-segment--alt">
          <h2>Confirm Case Details</h2>

          <div>
            {`Review data from BGS about the appellant's
              representative and make changes if necessary.`}
          </div>

          <RadioField name="Representative type"
            options={representativeTypeOptions}
            value={representativeType}
            onChange={onRepresentativeTypeChange}
            required={true}/>

          {
            shouldShowOtherTypeField &&
            <TextField
              name="Specify other representative type"
              value={otherRepresentativeType}
              onChange={onOtherRepresentativeTypeChange}
              required={true}/>
          }

          <TextField name="Representative name"
            value={representativeName}
            onChange={onRepresentativeNameChange}
            required={true}/>

        </div>

        <Footer
          nextPageUrl={`/certifications/${match.params.vacols_id}/confirm_hearing`}
          disableContinue={validationFailed}
          loading={loading}
          onClickContinue={this.onClickContinue.bind(this)}
        />
    </div>;
  }
}

ConfirmCaseDetails.propTypes = {
  representativeType: PropTypes.string,
  onRepresentativeTypeChange: PropTypes.func,
  representativeName: PropTypes.string,
  onRepresentativeNameChange: PropTypes.func,
  otherRepresentativeType: PropTypes.string,
  onOtherRepresentativeTypeChange: PropTypes.func,
  match: PropTypes.object.isRequired
};


const mapDispatchToProps = (dispatch) => ({
  updateProgressBar: () => {
    dispatch({
      type: Constants.UPDATE_PROGRESS_BAR,
      payload: {
        currentSection: Constants.progressBarSections.CONFIRM_CASE_DETAILS
      }
    });
  },
  onRepresentativeNameChange: (representativeName) => {
    dispatch({
      type: Constants.CHANGE_REPRESENTATIVE_NAME,
      payload: {
        representativeName
      }
    });
  },
  onRepresentativeTypeChange: (representativeType) => {
    dispatch({
      type: Constants.CHANGE_REPRESENTATIVE_TYPE,
      payload: {
        representativeType
      }
    });
  },
  onOtherRepresentativeTypeChange: (otherRepresentativeType) => {
    dispatch({
      type: Constants.CHANGE_OTHER_REPRESENTATIVE_TYPE,
      payload: {
        otherRepresentativeType
      }
    });
  },
  onValidationFail: (invalidFields) => {
    dispatch({
      type: Constants.FAILED_VALIDATION,
      payload: {
        invalidFields,
        validationFailed: true
      }
    });
  },
  startRequest: (data) => {
    dispatch({
      type: Constants.CERTIFICATION_UPDATE_REQUEST,
      payload: {
        data,
        // TODO: this nested bit is a bit complex. Can we refactor this to be
        // a little more legible?
        onComplete: (err) => {
          if (err) {
            return dispatch({
              type: Constants.CERTIFICATION_UPDATE_FAILURE
            });
          }
          dispatch({
            type: Constants.CERTIFICATION_UPDATE_SUCCESS
          });
        }
      }
    });
  }

});

const mapStateToProps = (state) => ({
  updateSucceeded: state.updateSucceeded,
  updateFailed: state.updateFailed,
  representativeType: state.representativeType,
  representativeName: state.representativeName,
  otherRepresentativeType: state.otherRepresentativeType,
  validationFailed: state.validationFailed,
  invalidFields: state.invalidFields,
  loading: state.loading
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmCaseDetails);

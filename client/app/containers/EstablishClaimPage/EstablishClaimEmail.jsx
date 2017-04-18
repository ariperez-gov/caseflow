import React, { PropTypes } from 'react';
import BaseForm from '../BaseForm';

import Checkbox from '../../components/Checkbox';
import Button from '../../components/Button';
import TextareaField from '../../components/TextareaField';
import FormField from '../../util/FormField';
import { formatDate } from '../../util/DateUtil';
import { connect } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';
import SPECIAL_ISSUES from '../../constants/SpecialIssues';

export class EstablishClaimEmail extends BaseForm {
  constructor(props) {
    super(props);
    let {
      appeal
    } = props;

    let specialIssuesStatus = this.props.specialIssues;
    let selectedSpecialIssue = [];

    for (let key in SPECIAL_ISSUES) {
      if (specialIssuesStatus[SPECIAL_ISSUES[key].specialIssue]) {
        selectedSpecialIssue.push(SPECIAL_ISSUES[key].display);
      }
    }

    // Add an and if there are multiple issues so that the last element
    // in the list has an and before it.
    if (selectedSpecialIssue.length > 1) {
      selectedSpecialIssue[selectedSpecialIssue.length - 1] =
        `and ${selectedSpecialIssue[selectedSpecialIssue.length - 1]}`;
    }

    let email = `The BVA Full Grant decision dated` +
      ` ${formatDate(appeal.serialized_decision_date)}` +
      ` for ${appeal.veteran_name},` +
      ` ID #${appeal.sanitized_vbms_id}, was sent to the ARC but` +
      ` cannot be processed here, as it contains ${selectedSpecialIssue.join(', ')}` +
      ` in your jurisdiction. Please proceed with control and implement this grant.`;

    let note = `This claim for Vet ID #${appeal.sanitized_vbms_id}` +
      ` includes Special Issue(s): ${selectedSpecialIssue.join(', ')}` +
      ` not handled by Caseflow`;

    this.state = {
      emailForm: {
        confirmBox: new FormField(false),
        emailField: new FormField(email)
      },
      noEmailNote: note,
      copied: false
    };
  }

  render() {
    return <div>
      { this.props.regionalOfficeEmail &&
        <div>
        <div className="cf-app-segment cf-app-segment--alt">
          <h2>Route Claim: Send Email Notification</h2>
          <div>
            <div className="usa-alert usa-alert-info">
              <div className="usa-alert-body">
                <div>
                  <h3 className="usa-alert-heading">We are unable to create an
                    EP for claims with this Special Issue</h3>
                  <p className="usa-alert-text">
                    Follow the instructions below to route this claim.
                  </p>
                </div>
              </div>
            </div>
            <p>Please send the following email message to the office
              responsible for implementing this grant.</p>
            <p><b>RO:</b> {this.props.regionalOffice}</p>
            <p><b>RO email:</b> {this.props.regionalOfficeEmail.join('; ')}</p>
          </div>

          <div className ="cf-vbms-note">
            <TextareaField
                label="Message:"
                name="emailMessage"
                onChange={this.handleFieldChange('emailForm', 'emailField')}
                {...this.state.emailForm.emailField}
            />

            <div className="cf-app-segment copy-note-button">
              <div className="cf-push-left">
                <CopyToClipboard text={this.state.emailForm.emailField.value}>
                  <Button
                   name="copyNote"
                   classNames={["usa-button-outline"]}>
                   <i className="fa fa-files-o" aria-hidden="true"></i>
                   Copy note
                  </Button>
                </CopyToClipboard>
              </div>
            </div>
          </div>

          <Checkbox
              label="I confirm that I have sent an email to route this claim."
              name="confirmEmail"
              onChange={this.handleFieldChange('emailForm', 'confirmBox')}
              {...this.state.emailForm.confirmBox}
          />

        </div>

        <div className="cf-app-segment" id="establish-claim-buttons">
          <div className="cf-push-left">
            <Button
              name={this.props.backToDecisionReviewText}
              onClick={this.props.handleBackToDecisionReview}
              classNames={["cf-btn-link"]}
            />
          </div>
          <div className="cf-push-right">
            <Button
            name="Cancel"
            onClick={this.props.handleCancelTask}
            classNames={["cf-btn-link", "cf-adjacent-buttons"]}
            />
            <Button
              app="dispatch"
              name="Finish routing claim"
              classNames={["usa-button-primary"]}
              disabled={!this.state.emailForm.confirmBox.value}
              onClick={this.props.handleEmailSubmit}
              loading={this.props.loading}
            />
          </div>
        </div>
      </div>
      }
      { !this.props.regionalOfficeEmail &&
        <div>
          <div className="cf-app-segment cf-app-segment--alt">
            <h2>Route Claim: Process Outside of Caseflow</h2>
            <div>
              <div className="usa-alert usa-alert-warning">
                <div className="usa-alert-body">
                  <div>
                    <h3 className="usa-alert-heading">{this.state.noEmailNote}</h3>
                  </div>
                </div>
              </div>
              <p>You selected a Special Issue Category that cannot be processed
                in Caseflow at this time.</p>
              <p>Please process this claim manually and select Release Claim
                when you are finished.</p>
            </div>
            <Checkbox
                label="I confirm that I have processed this claim outside of Caseflow."
                name="confirmEmail"
                onChange={this.handleFieldChange('emailForm', 'confirmBox')}
                {...this.state.emailForm.confirmBox}
            />
          </div>
          <div className="cf-app-segment" id="establish-claim-buttons">
            <div className="cf-push-left">
              <Button
                name={this.props.backToDecisionReviewText}
                onClick={this.props.handleBackToDecisionReview}
                classNames={["cf-btn-link"]}
              />
            </div>
            <div className="cf-push-right">
              <Button
                  name="Cancel"
                  onClick={this.props.handleCancelTask}
                  classNames={["cf-btn-link", "cf-adjacent-buttons"]}
              />
              <Button
                  app="dispatch"
                  name="Release claim"
                  classNames={["usa-button-secondary"]}
                  disabled={!this.state.emailForm.confirmBox.value}
                  onClick={this.props.handleNoEmailSubmit}
                  loading={this.props.loading}
              />
            </div>
          </div>
        </div>
      }
      </div>;
  }
}

EstablishClaimEmail.propTypes = {
  appeal: PropTypes.object.isRequired,
  handleCancelTask: PropTypes.func.isRequired,
  handleBackToDecisionReview: PropTypes.func.isRequired,
  backToDecisionReviewText: PropTypes.string.isRequired,
  handleEmailSubmit: PropTypes.func.isRequired,
  handleNoEmailSubmit: PropTypes.func.isRequired,
  regionalOffice: PropTypes.string,
  regionalOfficeEmail: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = (state) => {
  return {
    specialIssues: state.specialIssues
  };
};

const ConnectedEstablishClaimEmail = connect(
    mapStateToProps
)(EstablishClaimEmail);

export default ConnectedEstablishClaimEmail;

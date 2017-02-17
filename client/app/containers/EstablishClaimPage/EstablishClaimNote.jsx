import React, { PropTypes } from 'react';
import BaseForm from '../BaseForm';

import Checkbox from '../../components/Checkbox';
import Button from '../../components/Button';
import TextareaField from '../../components/TextareaField';
import FormField from '../../util/FormField';
import { formatDate } from '../../util/DateUtil';

export const VBMS_NOTE = 'vbms';
export const VACOLS_NOTE = 'vacols';

export default class EstablishClaimNote extends BaseForm {
  constructor(props) {
    super(props);
    let {
      appeal,
      specialIssues
    } = props;

    let selectedSpecialIssue = Object.keys(specialIssues).
      filter((key) => specialIssues[key].value).
      map((key) => specialIssues[key].issue);

    // Add an and if there are multiple issues so that the last element
    // in the list has an and before it.
    if (selectedSpecialIssue.length > 1) {
      selectedSpecialIssue[selectedSpecialIssue.length - 1] =
        `and ${selectedSpecialIssue[selectedSpecialIssue.length - 1]}`;
    }

    let note = `The BVA Grant decision date ${formatDate(appeal.decision_date)}` +
      ` for ${appeal.veteran_name}, ID #${appeal.vbms_id}, was sent to the ARC but` +
      ` cannot be processed here, as it contains ${selectedSpecialIssue.join(', ')}` +
      ` in your jurisdiction. Please proceed with control and implement this grant.`;

    this.state = {
      noteForm: {
        confirmBox: new FormField(false),
        noteField: new FormField(note)
      }
    };
  }

  render() {

    let beforeTextBox;
    let textBoxLabel;
    let afterTextBox;
    let routeButtonDisabled;

    if (this.props.typeOfNote === VBMS_NOTE) {
      beforeTextBox = (
        <div>
          {this.props.showNotePageAlert && <div className="usa-alert usa-alert-warning">
            <div className="usa-alert-body">
              <div>
                <h3 className="usa-alert-heading">Cannot edit end product</h3>
                <p className="usa-alert-text">
                  You cannot navigate to the previous page because the end
                  product has already been created and cannot be edited.
                  Please proceed with adding the note below in VBMS.
                </p>
              </div>
            </div>
          </div>}
          <p>To better route this claim, please open VBMS and attach the
          following note to the EP you just created.</p>
        </div>);
      
      textBoxLabel = 'VBMS Note';
      
      afterTextBox = <Checkbox
            label="I confirm that I have created a VBMS note to help route this claim"
            name="confirmNote"
            onChange={this.handleFieldChange('noteForm', 'confirmBox')}
            {...this.state.noteForm.confirmBox}
          />;
      
      routeButtonDisabled = !this.state.noteForm.confirmBox.value;
    } else if (this.props.typeOfNote === VACOLS_NOTE) {
      beforeTextBox = (
        <div>
          <div className="usa-alert usa-alert-info">
            <div className="usa-alert-body">
              <div>
                <h3 className="usa-alert-heading">We are unable to create an
                  EP for claims with this Special Issue</h3>
              </div>
            </div>
          </div>
          <p>To ensure this claim is routed correctly, we will take
          the following steps in VACOLS.</p>
          <p><b>1.</b> Change location to: []</p>
        </div>);
      
      textBoxLabel = <span><b>2.</b> Add the Diary Note</span>;
      
      afterTextBox = <div><p><b>3.</b> Change the ROJ to: []</p></div>;
      
      routeButtonDisabled = this.state.noteForm.noteField.value === '';
    }

    return <div>
        <div className="cf-app-segment cf-app-segment--alt">
          <h2>Route Claim</h2>
          {beforeTextBox}

          <TextareaField
            label={textBoxLabel}
            required={true}
            name="vbmsNote"
            onChange={this.handleFieldChange('noteForm', 'noteField')}
            {...this.state.noteForm.noteField}
          />

          {afterTextBox}

        </div>
        <div className="cf-app-segment" id="establish-claim-buttons">
          <div className="cf-push-right">
            <Button
              name="Finish Routing Claim"
              classNames={["usa-button-primary"]}
              disabled={routeButtonDisabled}
              onClick={this.props.handleSubmit}
            />
          </div>
        </div>
      </div>;
  }
}

EstablishClaimNote.propTypes = {
  appeal: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  typeOfNote: PropTypes.string.isRequired
};

import React from "react";

function DeviceFormErrors(props) {
  if (
    props.formerrors &&
    (props.formerrors.id || props.formerrors.temperature)
  ) {
    return (
      <div className="error container help is-danger">
        <div className="row justify-content-center">
          {props.formerrors.id
            ? "Device must have an ID"
            : ""}
        </div>
        <div className="row justify-content-center">
          {props.formerrors.temperature ? "Temperature for device required" : ""}
        </div>
      </div>
    );
  } else if (props.apierrors) {
    return (
      <div className="error container help is-danger">
        <div className="row justify-content-center">{props.apierrors}</div>
      </div>
    );
  } else if (props.formerrors && props.formerrors.cognito) {
    return (
      <div className="error container help is-danger">
        <div className="row justify-content-center">
          {props.formerrors.cognito.message}
        </div>
      </div>
    );
  } else {
    return <div />;
  }
}

export default FormErrors;

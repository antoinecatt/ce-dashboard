import React from "react";

function FormErrors(props) {
  // if (
  //   props.formerrors &&
  //   (props.formerrors.email || props.formerrors.username || props.formerrors.passwordmatch || props.formerrors.confirm)
  // ) {
  //   return (
  //     <div className="error container help is-danger">
  //       <div className="row justify-content-center">
  //         {props.formerrors.passwordmatch
  //           ? "Password value does not match confirm password value"
  //           : ""}
  //       </div>
  //       <div className="row justify-content-center">
  //         {props.formerrors.username ? "Must have username" : ""}
  //       </div>
  //       <div className="row justify-content-center">
  //         {props.formerrors.email ? "Must have email" : ""}
  //       </div>
  //       <div className="row justify-content-center">
  //         {props.formerrors.value ? "Please select a role" : ""}
  //       </div>
  //       <div className="row justify-content-center">
  //         {props.formerrors.confirm ? "Please confirm password" : ""}
  //       </div>
  //     </div>
  //   );
  // } else if (props.apierrors) {
  //   return (
  //     <div className="error container help is-danger">
  //       <div className="row justify-content-center">{props.apierrors}</div>
  //     </div>
  //   );
  // } else
   if (props.formerrors && props.formerrors.cognito) {
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

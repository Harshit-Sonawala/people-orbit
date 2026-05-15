export const idRegex = /^[a-z0-9-]+$/;
export const nameRegex = /^[A-Za-z\s'-]+$/; // a-z, A-Z, spaces, hyphens
export const designationRegex = /^[A-Za-z0-9\s'-\.&/]+$/; // above + periods, ampersands, slashes
export const phoneRegex =
  /^((\+[1-9]{1,4}[\s\-]*)|([\(][0-9]{2,3}[\)][\s\-]*)|([0-9]{2,4})[\s\-]*)*?[0-9]{3,4}?[\s\-]*[0-9]{3,4}?$/; // complex intl phone regex

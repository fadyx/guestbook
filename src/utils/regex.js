const objectId = /[a-f\d]{24}/;

const username = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

export default { username, objectId };

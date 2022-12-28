export const validRegister = ({
  email,
  password,
  username,
  fullname,
  gender,
  dob,
  cf_password,
}) => {
  const errors = [];

  if (!fullname) {
    errors.push("Please add your name.");
  } else if (fullname.length > 20) {
    errors.push("Your name is up to 20 chars long.");
  }

  if (!email) {
    errors.push("Please Enter a email.");
  } else if (!validateEmail(email)) {
    errors.push("Invalid email format.");
  }

  if (!username) {
    errors.push("Please Enter a Username.");
  } else if (checkUsername(username)) {
    errors.push("Username can not contain empty space.");
  }

  if (!dob) {
    errors.push("Please Enter date of birth.");
  } else if (!dobCheck(dob)) {
    errors.push("Please use mm/dd/yyyy this format for date of birth.");
  }

  if (!password) {
    errors.push("Please Enter a password.");
  } else if (!passCheck(password)) {
    errors.push(
      "Password must be at least 6 characters long, one upper case, one lower case, one number and one Special character."
    );
  } else if (password !== cf_password) {
    errors.push("Password did not match.");
  }

  if (!gender) {
    errors.push("Please Select a gender.");
  } else if (!passgender(gender)) {
    errors.push("Gender must be male or female or others");
  }

  return {
    success: false,
    message: errors,
    error_code: 1301,
    data: {},
  };
};

function passgender(gender) {
  const maleRegex = /^male$/;
  const femaleRegex = /^female$/;
  const othersRegex = /^non-binary$/;
  return (
    maleRegex.test(gender) ||
    femaleRegex.test(gender) ||
    othersRegex.test(gender)
  );
}

function passCheck(password) {
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  return passRegex.test(password);
}

function dobCheck(dob) {
  const dobRegex =
    /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;

  return dobRegex.test(dob);
}

function checkUsername(username) {
  const empty = /\s/;
  return empty.test(username);
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export const validUserType = (type) => {
  const errors = [];

  if (!type) {
    errors.push("Please select a user type.");
  }

  return {
    success: false,
    message: errors,
    error_code: 1307,
    data: {},
  };
};


export const validPostStory = ({
  title,
  communityId,
  summary,
  body,
  tags,
  image,
  user_id,
  email,
  name,
  file,
  type,
}) => {
  const errors = [];

  if (!title) {
    errors.push("Please add your name.");
  } else if (title.length > 100) {
    errors.push("Title is up to 100 chars long.");
  }

  if (!communityId) {
    errors.push("Please Enter a communityId.");
  }

  if (!body) {
    errors.push("Please Enter a some text.");
  } 

  if (!user_id) {
    errors.push("Please Enter your user_id.");
  } 

  if (!email) {
    errors.push("Please Enter your email.");
  } 

  if (file?.length > 0){
    if(file?.length > 4){
      errors.push("Can not submit more than 3 images and 1 video link.");
    }
  } 

  return {
    success: false,
    message: errors,
    error_code: 1301,
    data: {},
  };
};

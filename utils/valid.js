export const validRegister = (name, username, email, password, cf_password, gender, dob, check, captchaRes) => {
    if(!name || !email || !password || !username || !gender || !dob)
    return 'Please add all fields.'

    if(!validateEmail(email))
    return 'Invalid emails.'

    if(checkUsername(username))
    return 'Username can not contain empty space.'
    
    // if(!dobCheck(dob))
    // return 'Please use 01-01-2010 this format for date of birth.'
    
    if(!passCheck(password))
    return 'Password must be at least 6 characters long, one upper case, one lower case, one number and one Special character.'
    
    if(password !== cf_password)
    return 'Password did not match.'

    if(check !== true)
    return 'Please accept the Terms and Privacy Policy.'

      if(!captchaRes)
    return 'Invalid Captcha'
    
}

export const validPass = (password, cf_password) => {
    if(!password)
    return 'Please add all fields.'

    if(!passCheck(password))
    return 'Password must be at least 6 characters long, one upper case, one lower case, one number and one Special character.'
    
    if(password !== cf_password)
    return 'Password did not match.'
    
}


function passCheck(password){
    const passRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    return passRegex.test(password)
}

// function dobCheck(dob){
//     const dobRegex =  /^([0-9]{2})-([0-9]{2})-([0-9]{4})$/
//     const dobRegex2 =  /^([0-9]{2})-([0-9]{1})-([0-9]{4})$/
//     return dobRegex.test(dob) || dobRegex2.test(dob)
// }

function checkUsername(username){
    const empty = /\s/
    return empty.test(username)
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

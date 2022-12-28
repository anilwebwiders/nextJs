const validUserAdmin = (name, username, email, password, cf_password, gender, dob,) => {
    if(!name || !email || !password || !username || !gender || !dob)
    return 'Please add all fields.'

    if(!validateEmail(email))
    return 'Invalid emails.'

    if(checkUsername(username))
    return 'Username can not contain empty space.'


    if(password.length < 6)
    return 'Password must be at least 6 characters.'

    if(password !== cf_password)
    return 'Confirm password did not match.'
}


function checkUsername(username){
    const empty = /\s/
    return empty.test(username)
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export default validUserAdmin
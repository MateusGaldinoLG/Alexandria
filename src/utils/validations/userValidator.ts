const emailRegex: RegExp = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const cpfRegex: RegExp = /^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/;


export function isValidEmail(email: string){
    if(email.length > 50){
        return false;
    }

    if(email.length == 0){
        return false;
    }

    const valid = emailRegex.test(email);
    if(!valid){
        return false;
    }

    //...
    const parts = email.split('@');
    // if(parts[0].length > 64)
    //     return false;

    var domainParts = parts[1].split(".");
    if(domainParts.some(function(part) { return part.length>15; }))
        return false;

    return true;
}

export function isValidCpf(cpf: string){
    const valid = cpfRegex.test(cpf);
    
    return valid;
}

export function isValidPassword(password: string){
    if(password.length < 8){
        return [false, 'Password too short'];
    }
    return [true];
}
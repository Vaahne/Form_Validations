//  Registration form
let register_form = document.getElementById("registration");
let err = document.getElementById("errorDisplay");


register_form.addEventListener('submit',registerSubmit);

function registerSubmit(e){
    e.preventDefault();
    err.textContent = "";
    err.style.display = "none";

    let userName = register_form.querySelector("#username");
    let email = register_form.querySelector("#email");
    let password = register_form.querySelector("#password");
    let passwordCheck = register_form.querySelector("#passwordCheck");

    validateuserName(userName);
    validateEmail(email);
    validatePassword(password,userName);
    // validatePasswordCheck(password,passwordCheck);
}

function validateuserName(el){
    const userNameRegEx = /^(?:(\w)(?!\1)(\w))\w*\1*\2*$/ ;
    if(!userNameRegEx.test(el.value)){
        let p = document.createElement ("p");
        err.style.display = "block";
        p.textContent = "User Name cannot have special characters & atleast 2 unique characters"; 
        err.appendChild(h1);
        return false;
    }    
    return true;
}
function validateEmail(el){
    
    const regCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let emailVal = el.value;
    if(!regCheck.test(emailVal)){
        let h1 = document.createElement ("p");
        err.style.display = "block";
        h1.textContent = "Invalid email"; 
        err.appendChild(h1);
        return false;
    }
    return;
}
function validatePassword(el,userName){
    let passwordVal = el.value;
    let userNameVal = userName.value;
    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|-]).+$/ ;
    if(passwordVal.toLowerCase() == "password"){
        let h1 = document.createElement ("p");
        err.style.display = "block";
        h1.textContent = "Cannot have password as password"; 
        err.appendChild(h1);     
        return false;   
    }else if(passwordVal.includes(userNameVal)){
        let h1 = document.createElement ("p");
        err.style.display = "block";
        h1.textContent = "Password cannot contain user name"; 
        err.appendChild(h1);     
        return false;   
    }else if(!passwordRegEx.test(passwordRegEx)){
        let h1 = document.createElement ("p");
        err.style.display = "block";
        h1.textContent = "Password should contain atleast 1 uppercase,lowercase,number and a Symbol"; 
        err.appendChild(h1);     
        return false;   
    }
}
// console.log(password.value);

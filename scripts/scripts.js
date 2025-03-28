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

    if( validateuserName(userName) && 
        validateEmail(email) && 
        validatePassword(password,userName) && 
    validatePasswordCheck(password,passwordCheck)){
        err.style.display = "none";
        let user = {
            userName : userName.value.toLowerCase(),
            password : password.value,
            email : email.value.toLowerCase()
        }
        
        let storedUsers = JSON.parse(localStorage.getItem("users")) || []; //creates empty array if no local storage
        let exists = false;
        for(s of storedUsers){
            if(s.userName == userName.value.toLowerCase()){
                err.textContent = "User Already exists!!"
                err.style.display = "block";
                exists = true;
                break;
            }
        }
        
        if(!exists){
            storedUsers.push(user);
            localStorage.setItem("users",JSON.stringify(storedUsers));
            register_form.reset();
            alert("Successfully Registered!!!");
        }
    }
}

function validateuserName(el){
    const userNameRegEx = /^(?:(\w)(?!\1)(\w))\w*\1*\2*$/ ;
    if(!userNameRegEx.test(el.value)){
        let p = document.createElement ("p");
        err.style.display = "block";
        p.textContent = "User Name should have atleast 2 unique characters & cannot have special characters"; 
        err.appendChild(p);
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
    return true;
}
function validatePassword(el,userName){
    let passwordVal = el.value;
    let userNameVal = userName.value;
    
    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|-]).{8,}$/
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
    }else if(!passwordRegEx.test(passwordVal)){
        let h1 = document.createElement ("p");
        err.style.display = "block";
        h1.textContent = "Password should contain atleast 1 uppercase,lowercase,number and a Symbol"; 
        err.appendChild(h1);     
        return false;   
    }
    return true;
}
function validatePasswordCheck(ps1,ps2){
    if(ps1.value != ps2.value){
        let h1 = document.createElement ("p");
        err.style.display = "block";
        h1.textContent = "Both Passwords didnt match. Try again"; 
        err.appendChild(h1);     
        return false;   
    }
    return true;
}
// console.log(password.value);


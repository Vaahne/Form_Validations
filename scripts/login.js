// Login Form
let loginForm = document.getElementById("login");
let err = document.getElementById("errorDisplay");

loginForm.addEventListener('submit',loginValidation);

function loginValidation(e){
    e.preventDefault();
    err.style.display = "none";
    
    let userName = loginForm.querySelector("#userName");
    let password = loginForm.querySelector("#password");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if(users.length == 0){
        alert("No Users yet. Please register first!!");
        return ;
    }
    else{
        let found = false;
        
        for(user of users){            
            if(user.userName === userName.value && user.password === password.value){
                alert(`Welcome ${userName.value}`);
                loginForm.reset();
                found = true;
                return;
            }
        }
        if(!found){
            let h1 = document.createElement ("p");
            err.style.display = "block";
            h1.textContent = "User doesnot exist Please register !!!"; 
            err.appendChild(h1);     
        }
            
    }


}
document.getElementById('login-btn').addEventListener("click", function () {

    const userName = document.getElementById('input-username');
    const userNameInput = userName.value;
    console.log(userNameInput);

    const userPassword = document.getElementById('input-password');
    const userPasswordInput = userPassword.value;
    console.log(userPasswordInput);


    if (userNameInput == "admin" && userPasswordInput == "admin123") {
        alert("Sign In Sucessfull")
        window.location.assign('./home.html');
    } else {
        alert("Log in Failed");
        return;
    }

})
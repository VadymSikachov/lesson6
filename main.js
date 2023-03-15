let regLogin = /^[a-zA-Z]{4,16}$/i;
let regPassword = /\S{4,16}/gi;
let regEmail = /^.{1,}@[a-z]{1,}\.[a-z]{1,}$/i;
let Users = [];
$('#sing-up').on('click', function () {
    if (validate()) {
        if (localStorage.length > 0 && localStorage.getItem('Users')) {
            if (!JSON.parse(localStorage.getItem('Users')).some(elem => elem.Email.toLowerCase() == $('#Email')[0].value.toLowerCase())) {
                let User = {};
                User.FirstName = $('#First-name')[0].value;
                User.LastName = $('#Last-name')[0].value;
                User.Email = $('#Email')[0].value;
                User.Password = $('#Password')[0].value;
                let AllUsers = JSON.parse(localStorage.getItem('Users'));
                AllUsers.push(User);
                localStorage.setItem('Users', JSON.stringify(AllUsers));
            }
        }
        else {
            let User = {};
            User.FirstName = $('#First-name')[0].value;
            User.LastName = $('#Last-name')[0].value;
            User.Email = $('#Email')[0].value;
            User.Password = $('#Password')[0].value;
            Users.push(User);
            localStorage.setItem('Users', JSON.stringify(Users));
        }
        $('.singUp')[0].reset();
    }

})
$('.logIn').on('click', function () {
    $('.singUp').addClass('hide');
    $('.singIn').removeClass('hide');
})
$('#sing-in').on('click', function () {
    if (localStorage.length > 0 && localStorage.getItem('Users')) {
        let check = checkUsersBase();
        if (check) {
            $('.singIn').addClass('hide');
            $('.profile').removeClass('hide');
            $('.profile-first-name')[0].textContent = check.FirstName;
            $('.profile-last-name')[0].textContent = check.LastName;
            $('.profile-email')[0].textContent = check.Email;
            $('.singIn')[0].reset();
        }
        else {
            $('.error-log-in').removeClass('hide-op');
            $('.error-log-in').text('Wrong email or password');
            setTimeout(function () {
                $('.error-log-in').addClass('hide-op');
            }, 1000);
        }
    }
    else {
        $('.error-log-in').removeClass('hide-op');
        $('.error-log-in').text('LocalStorage is empty');
        setTimeout(function () {
            $('.error-log-in').addClass('hide-op');
        }, 1000);

    }

})
$('.return-sing-up').on('click', function () {
    $('.singUp').removeClass('hide');
    $('.singIn').addClass('hide');
    $('.singIn')[0].reset();
})
$('#sing-up-home').on('click', function () {
    $('.singUp').removeClass('hide');
    $('.profile').addClass('hide');
})
function checkUsersBase() {
    let AllUsers = JSON.parse(localStorage.getItem('Users'));
    let resoult = false;
    for (let i = 0; i < AllUsers.length; i++) {
        if (AllUsers[i].Email.toLowerCase() == $('#Email-address')[0].value.toLowerCase()
            && AllUsers[i].Password.toLowerCase() == $('#Pass')[0].value.toLowerCase()) {
            resoult = AllUsers[i];
            return resoult;
        }
    }
    return resoult;
}

function validate() {
    if (regLogin.test($('#First-name')[0].value)
        && regLogin.test($('#Last-name')[0].value
            && regPassword.test($('#Password')[0].value)
            && regEmail.test($('#Email')[0].value))) {
        return true;
    }

    else {
        return false;
    }
}
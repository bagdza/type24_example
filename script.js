const updateProfilePage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

    if (!isLoggedIn) {
        window.location.href = 'login.html';
    }


    document.getElementById('user-email-navbar').innerText = user.username;
    document.getElementById('email-display').innerText = user.username;


    document.getElementById('logout')?.addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        window.location.href = 'login.html';
    });


    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
        document.getElementById('profile-image').src = savedImage;
    }
};


const changeProfilePicture = () => {
    document.getElementById('image-upload').click();
};

document.getElementById('image-upload')?.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profile-image').src = e.target.result;
            localStorage.setItem('profileImage', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});


document.getElementById('change-password-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const newPassword = document.getElementById('newPassword').value;
    const user = JSON.parse(localStorage.getItem('user'));

    user.password = newPassword;
    localStorage.setItem('user', JSON.stringify(user));
    alert('Password changed! Please log in with your new password.');
    localStorage.removeItem('loggedIn');
    window.location.href = 'login.html';
});

window.addEventListener('DOMContentLoaded', updateProfilePage);


if (user.password === password) {
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = 'profile.html';
}


function login(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value.trim();
    const loginError = document.getElementById('login-error');

    loginError.textContent = '';


    const storedUser = JSON.parse(localStorage.getItem('user'));

    console.log("Stored user:", storedUser);


    if (storedUser) {

        if (storedUser.email.toLowerCase() === email && storedUser.password === password) {
            alert('Login successful!');
            localStorage.setItem('loggedIn', true);
            window.location.href = 'profile.html';
        } else {
            loginError.textContent = 'Incorrect email or password.';
        }
    } else {
        loginError.textContent = 'No registered user found.';
    }
}


if (localStorage.getItem('loggedIn')) {
    window.location.href = 'profile.html';
}


/* A SCRIPT THAT CHECKS IF THE USER HAS ACCESS AND REDIRECTS HIM */


function isAccessTokenCookieExists() {
    return getCookie('access-token') != undefined;
}


async function isAccessTokenCorrect() {
    let response = await requestToApi('auth/is-authenticated', {
        headers: {
            'Authorization': `Bearer ${getCookie('access-token')}`
        }
    });
    if (response.status == 200)
        return true;
    return false;
}


async function isUserAuthenticated() {
    let test = await isAccessTokenCorrect();
    if (test) {
        if (window.location.href.endsWith('admin/auth.html')) {
            window.location.href = 'control.html';
        }
    }
    else {
        if (isAccessTokenCookieExists()) {
            document.cookie = 'access-token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;'
        }
        if (!window.location.href.endsWith('admin/auth.html')) {
            window.location.href = 'auth.html';
        }
    }
}


isUserAuthenticated();
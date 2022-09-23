// This JS file handles logouts

const logoutHandler = async (event) => {
    event.preventDefault();
    try {
        const logoutResponse = await fetch('/api/user/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })

        if (logoutResponse.ok) {
            document.location.replace('/login');
        } else {
            alert('Logout Failure!');
        };
    } catch (err) {

    }



}

document.getElementById('logoutBt').addEventListener('click', logoutHandler);
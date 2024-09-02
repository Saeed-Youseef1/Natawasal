async function loginClick() {
    const userName = document.getElementById('username');
    const password = document.getElementById('password');
    if (!checkEmpty(userName, password)) {
        return; 
    }

    const loginData = {
        username: userName.value.trim(), 
        password: password.value.trim()  
    };

    try {
        toggleLoader(true);
        const response = await fetch(`https://tarmeezacademy.com/api/v1/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (!response.ok) {
            const errorData = await response.json();  
            throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorData.message || 'Unknown error'}`);
        }
        
        const responseData = await response.json();

        if (responseData.token) {
            localStorage.setItem("token", responseData.token);
            localStorage.setItem("userId", responseData.user.id);
            window.location.href = '/index.html';
            sessionStorage.setItem('showLoginAlert', 'true');
        } else {
            throw new Error('Token not found in response');
        }
    } catch (error) {
        if(error.message ==='HTTP error! Status: 422. Message: The password must be at least 6 characters.') 
            showalert('خطأ!','يجب أن تكون كلمة السر علي الأقل 6 حروف!', 'red');
        else if(error.message ==='HTTP error! Status: 422. Message: The provided credentials are incorrect.') {
            showalert('خطأ!','الرجاء التأكد من اسم المستخدم أو كلمة المرور!', 'red');
        }
        else 
            showalert('خطأ!','حاول مرة أخري!', 'red');
            console.error('Error:', error.message);
    } finally {
        toggleLoader(false);
    }
}

function checkEmpty(userName, password) {
    let isValid = true;

    if (!userName) {
        console.error('Username element is not found');
        return false;
    }

    if (userName.value.trim() === "") {
        userName.style.setProperty('background-color', '#ff000036', 'important');
        isValid = false;
    } else {
        userName.style.setProperty('background-color', '#f9fafa', 'important');
    }

    if (!password) {
        console.error('Password element is not found');
        return false;
    }

    if (password.value.trim() === "") {
        password.style.setProperty('background-color', '#ff000036', 'important');
        isValid = false;
    } else {
        password.style.setProperty('background-color', '#f9fafa', 'important');
    }

    return isValid;
}




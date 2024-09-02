async function registerClick() {
    const nameUser = document.getElementById('name');
    const userName = document.getElementById('username');
    const password = document.getElementById('password');
    const imageInput = document.getElementById('imageInput');
    
    // تحقق من أن جميع الحقول ممتلئة
    if (!checkEmpty(userName, password, nameUser, imageInput)) {
        return; 
    }

    // إنشاء FormData لتضمين الصورة
    const formData = new FormData();
    formData.append('name', nameUser.value.trim());
    formData.append('username', userName.value.trim());
    formData.append('password', password.value.trim());

    if (imageInput.files[0]) {
        formData.append('image', imageInput.files[0]);
    }
    try {
    
        toggleLoader(true);
        const response = await fetch(`https://tarmeezacademy.com/api/v1/register`, {
            method: 'POST',
            body: formData
        });

        
        
        // التحقق من استجابة السيرفر
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            const responseData = await response.json();
            
            if (!response.ok) {
                if(response.status == 200) {
                    showalert('خطأ!', 'هذا الحساب موجود بالفعل!', 'red');
                }else {
                handleServerError(responseData);
                return;}
            }


            if (responseData.token) {
                sessionStorage.setItem('showRegisterAlert', 'true');
                window.location.href = '/login.html';
            } else {
                throw new Error('Token not found in response');
            }
        } else {
            const errorText = await response.text();
            throw  (response.status);
        }

    } catch (error) {
        console.log(error)
        if(error ===200) {
            showalert('خطأ!', 'هذا الحساب موجود بالفعل!', 'red');
            return;
        }else
            showalert('خطأ!',  'حاول مرة أخري!', 'red');
        console.error(error.message);
    } finally {
        toggleLoader(false);
    }
}

function handleServerError(errorData) {
    if (errorData.message === 'The username has already been taken.') {
        showalert('خطأ!', 'هذا الحساب موجود بالفعل!', 'red');
    } else if (errorData.message === 'The password must be at least 6 characters.') {
        showalert('خطأ!', 'يجب أن تكون كلمة السر علي الأقل 6 حروف!', 'red');
    } else {
        showalert('خطأ!', 'حاول مرة أخري!', 'red');
    }
}


function checkEmpty(userName, password,name,imageInput) {
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

    if (!name) {
        console.error('Name element is not found');
        return false;
    }

    if (name.value.trim() === "") {
        name.style.setProperty('background-color', '#ff000036', 'important');
        isValid = false;
    } else {
        name.style.setProperty('background-color', '#f9fafa', 'important');
    }

    if (imageInput.value.trim() === "") {
        imageInput.style.setProperty('background-color', '#ff000036', 'important');
        isValid = false;
    } else {
        imageInput.style.setProperty('background-color', '#f9fafa', 'important');
    }

    return isValid;
}

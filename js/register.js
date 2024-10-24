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
        const response = await fetch('https://tarmeezacademy.com/api/v1/register', {
            method: 'POST',
            body: formData // لا حاجة لتعيين Content-Type عند استخدام FormData
        });

        // التحقق من استجابة السيرفر
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            const responseData = await response.json();

            if (!response.ok) {
                handleServerError(responseData);
                return;
            }

            if (responseData.token) {
                sessionStorage.setItem('showRegisterAlert', 'true');
                window.location.href = '/login.html';
            } else {
                throw new Error('Token not found in response');
            }
        } else {
            const errorText = await response.text();
            throw new Error(`Unexpected response: ${response.status} - ${errorText}`);
        }

    } catch (error) {
        // عرض رسالة الخطأ المناسبة
        if (error.message.includes('200')) {
            showalert('خطأ!', 'هذا الحساب موجود بالفعل!', 'red');
        } else {
            showalert('خطأ!', 'حاول مرة أخرى!', 'red');
        }
    } finally {
        toggleLoader(false);
    }
}

function handleServerError(errorData) {
    switch (errorData.message) {
        case 'The username has already been taken.':
            showalert('خطأ!', 'هذا الحساب موجود بالفعل!', 'red');
            break;
        case 'The password must be at least 6 characters.':
            showalert('خطأ!', 'يجب أن تكون كلمة السر علي الأقل 6 حروف!', 'red');
            break;
        default:
            showalert('خطأ!', 'حاول مرة أخرى!', 'red');
            break;
    }
}

function checkEmpty(userName, password, name, imageInput) {
    let isValid = true;

    const fields = [userName, password, name, imageInput];

    fields.forEach(field => {
        if (field && field.value.trim() === "") {
            field.style.backgroundColor = '#ff000036';
            isValid = false;
        } else if (field) {
            field.style.backgroundColor = '#f9fafa';
        }
    });

    if (imageInput && (!imageInput.files || imageInput.files.length === 0)) {
        imageInput.style.backgroundColor = '#ff000036';
        isValid = false;
    } else if (imageInput) {
        imageInput.style.backgroundColor = '#f9fafa';
    }

    return isValid;
}

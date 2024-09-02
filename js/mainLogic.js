document.querySelector('.header').innerHTML=`
<nav class="shadow-md">
            <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-0 py-2 ">
                <div class="relative flex items-center justify-between h-16">
                    <div class="flex items-center flex-grow">
                        <div class="flex-shrink-0">
                            <a href="index.html"><img class="h-13 w-auto" src="./assets/images/logo.png"
                                    alt="Your Company"></a>
                        </div>
                        <!-- Centering Links -->
                        <div class="hidden md:flex md:space-x-4 flex-grow justify-center">
                            <a data-custom-attribute="/index.html" onclick="homeClicked()" style="margin-right: auto;"
                                class="cursor-pointer  active me-1 text-blue-400  hover:text-blue-700  px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-100  flex items-center">
                                <svg class="h-7 w-7 me-1 " viewBox="0 0 24 24" stroke-width="2"
                                    stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <polyline points="5 12 3 12 12 3 21 12 19 12" />
                                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                                </svg>الصفحة الرئيسية
                            </a>
                            <a data-custom-attribute="/profile.html" onclick="profileClicked(${localStorage.getItem("userId")})"  id="linkProfile"
                                class="cursor-pointer  text-blue-400 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-100 flex items-center">
                                <svg class="h-7 w-7 me-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>الصفحة الشخصية
                            </a>
                            <div class="" style="margin-right: auto; margin-left:0px;">
                                <a href="../register.html">
                                    <button class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="register">
                                    تسجيل
                                    </button>
                                </a>
                                <a href="../login.html">
                                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="login">
                                        تسجيل الدخول
                                    </button>
                                </a>
                                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded hidden" id="logout" onclick="logOut()">
                                        تسجيل الخروج
                                </button>
                            </div>
                            
                        </div>
                    </div>
                    

                    <div class="absolute inset-y-0 left-0 flex items-center pl-2 md:hidden">
                        <button type="button"
                            class=" text-blue-400 inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
                            id="mobile-menu-button" aria-expanded="false">
                            <span class="sr-only">فتح القائمة الرئيسية</span>
                            <!-- Icon when menu is closed (Hamburger Icon) -->
                            <svg id="menu-icon" class="block h-7 w-7" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                            <!-- Icon when menu is open (X Icon) -->
                            <svg id="close-icon" class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Mobile menu, show/hide based on menu state -->
            <div class="md:hidden hidden" id="mobile-menu">
                <div class="space-y-1 px-2 pt-2 pb-3">
                    <a  data-custom-attribute="/index.html" onclick="homeClicked()"
                        class="cursor-pointer  active text-blue-400 hover:text-blue-700 d-flex   px-3 py-2 rounded-md text-base font-medium hover:bg-blue-100 flex items-center">
                        <svg class="h-7 w-7 me-1"  viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <polyline points="5 12 3 12 12 3 21 12 19 12" />
                            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                        </svg> الصفحة الرئيسية
                    </a>
                    <a data-custom-attribute="/profile.html" onclick="profileClicked(${localStorage.getItem("userId")})" id="linkProfile"
                        class="cursor-pointer text-blue-400 hover:text-blue-700  px-3 py-2 rounded-md text-base font-medium hover:bg-blue-100 flex items-center">
                        <svg class="h-7 w-7 me-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg> الصفحةالشخصية
                    </a>
                    <div   style="">
                        <a href="../register.html">
                            <button class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="register2">
                            تسجيل
                            </button>
                        </a>
                        <a href="../login.html">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="login2">
                                        تسجيل الدخول
                            </button>
                        </a>
                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded hidden" id="logout2" onclick="logOut()">
                                        تسجيل الخروج
                        </button>
                        

                    </div>
                </div>
            </div>
        </nav>`;


// استهداف الزر وقائمة الجوال
const menuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

        // التبديل بين الحالة المفتوحة والمغلقة
menuButton.addEventListener('click', () => {
    const isMenuOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('hidden');

            // تبديل الأيقونات
    if (isMenuOpen) {
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    } else {
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const currentUrl = window.location.pathname; // الحصول على مسار الـ URL الحالي
    document.querySelectorAll('nav a').forEach(link => {
        const linkPath =link.dataset.customAttribute;

        link.classList.remove('active');
        if (linkPath === currentUrl) {
            link.classList.add('active');   
        }
    });
});


let urlApi = `https://tarmeezacademy.com/api/v1/`;


function showalert(string1, string2, type, duration = 3000) {
    let alertClass = "";

    if (type === 'green') {
        alertClass = "bg-green-100 text-green-800";
    } else if (type === 'red') {
        alertClass = "bg-red-100 text-red-800";
    } 

    const alertHTML = `<div class="p-4 mb-4 text-sm rounded-lg ${alertClass} w-fit z-11000 opacity-100 transition-opacity duration-500" role="alert">
                            <span class="font-medium">${string1}</span> ${string2}
                        </div>`;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = alertHTML;
    const alertDiv = tempDiv.firstChild;

    const container = document.getElementById('alert-container');
    container.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.classList.remove('opacity-100');
        alertDiv.classList.add('opacity-0');
        setTimeout(() => alertDiv.remove(), 500); 
    }, duration);
}




function toggleLoader(show) {
    if(show) {
        document.getElementById('loader').classList.remove('hidden');
    }
    else{
        document.getElementById('loader').classList.add('hidden');
    }
}

const registerButton = document.getElementById('register');
const registerButton2 = document.getElementById('register2');
const loginButton = document.getElementById('login');
const loginButton2 = document.getElementById('login2');
const logoutButton = document.getElementById('logout');
const logoutButton2 = document.getElementById('logout2');

document.addEventListener('DOMContentLoaded', function() {
    const currentUrl = window.location.pathname;
    if (currentUrl=='/register.html') {
        if (registerButton) {
            registerButton.setAttribute('style', 'display: none !important;');   
            registerButton2.setAttribute('style', 'display: none !important;');   
        }
    }
    if (currentUrl=='/login.html') {
        if (loginButton) {
            loginButton.setAttribute('style', 'display: none !important;');   
            loginButton2.setAttribute('style', 'display: none !important;');   
        }
    }
});


function navbarSetup() { 
    const token = localStorage.getItem('token');
    if(token) {
        registerButton.setAttribute('style', 'display: none !important;');   
        registerButton2.setAttribute('style', 'display: none !important;');
        loginButton.setAttribute('style', 'display: none !important;');   
        loginButton2.setAttribute('style', 'display: none !important;');
        logoutButton.setAttribute('style', 'display: block !important;');
        logoutButton2.setAttribute('style', 'display: block !important;');
    } else {
        document.getElementById('linkProfile').setAttribute('style', 'display: none !important;'); 
    } 

}

function setTextDirection(textElement) {
    const textContent = textElement.textContent || textElement.innerText;
    const isArabic = /[\u0600-\u06FF]/.test(textContent);
    textElement.style.direction = isArabic ? 'rtl' : 'ltr';
}


function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    sessionStorage.setItem('showLogoutAlert', 'true');
    window.location.href = '/index.html';
}


document.addEventListener('DOMContentLoaded', function() {
    const showLogoutAlert = sessionStorage.getItem('showLogoutAlert');
    if (showLogoutAlert === 'true') {
        showalert('تم تسجيل الخروج بنجاح!', '', 'green');
        sessionStorage.removeItem('showLogoutAlert');
    }

    const showLoginAlert = sessionStorage.getItem('showLoginAlert');
    if (showLoginAlert === 'true') {
        showalert('تم تسجيل الدخول بنجاح!', 'مرحباً بك مرة أخرى.', 'green');
        sessionStorage.removeItem('showLoginAlert');
    }

    const showRegisterAlert = sessionStorage.getItem('showRegisterAlert');
    if (showRegisterAlert === 'true') {
        showalert('تم إنشاء حساب بنجاح!', 'مرحباً بك .', 'green');
        sessionStorage.removeItem('showRegisterAlert');
    }
});

navbarSetup();

async function deletePost(e, id,dist) {

    let url = `https://tarmeezacademy.com/api/v1/posts/${id}`;
    const token = localStorage.getItem("token");
    // اظهار المودال
    const modal = document.getElementById("popup-modal");
    modal.classList.remove("hidden");
    const mainContent = document.getElementById('main-content');
    mainContent.classList.add('blur-background');
    // زر التأكيد في المودال
    const confirmButton = document.querySelector("#popup-modal .bg-red-600");
    confirmButton.onclick = async function () {
        
        try {
            toggleLoader(true);
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            modal.classList.add("hidden");
            showalert('نجاح','تم حذف المنشور بنجاح','green');
            if(dist === 'home') {
                page = 1;
                const postspDiv = document.getElementsByClassName('posts')[0];
                postspDiv.innerHTML='';
                showPosts();
                
            }
            else {
                getPosts();
            }
            console.log(dist);


                
        } catch (error) {

            console.error('There was a problem with the delete operation:', error);
        } finally {
            mainContent.classList.remove('blur-background');
            toggleLoader(false);        
        }
    };

    const cancelButton = document.querySelector("#popup-modal button:last-of-type");
    cancelButton.onclick = function () {
        modal.classList.add("hidden"); 
        mainContent.classList.remove('blur-background');
    };
    document.getElementById('closeDeleteModel').onclick = ()=> {
        modal.classList.add("hidden"); 
        mainContent.classList.remove('blur-background');
    }
}


async function profileClicked(id) {
    window.location = `profile.html?userId=${id}`;
}

async function homeClicked() {
    window.location = `../index.html`;
}


function postClicked(postId) {
    window.location = `postDetails.html?postId=${postId}`;
}

function toggleDropdown(postId) {
    const dropdownMenu = document.getElementById(`dropdownMenu-${postId}`);
    dropdownMenu.classList.toggle("hidden");
}

function toggleDropdownshow() {
    const dropdownMenu = document.getElementById(`dropdownMenu-${postId}`);
    dropdownMenu.classList.toggle("hidden");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    const dropdownButtons = document.querySelectorAll('[id^="dropdownButton-"]');
    const dropdownMenus = document.querySelectorAll('[id^="dropdownMenu-"]');

    dropdownButtons.forEach((button) => {
        const dropdownMenu = document.getElementById(`dropdownMenu-${button.id.split('-')[1]}`);
        if (!button.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.add("hidden");
        }
    });
}

function toggleEditModal(isOpen) {
    document.getElementById('imageEditPost').classList.add('hidden');

    const mainContent = document.getElementById('main-content');
    const modal = document.getElementById('editModal');
    if (isOpen) {
        modal.classList.remove('hidden');
        mainContent.classList.add('blur-background');
    } else {
        modal.classList.add('hidden');
        mainContent.classList.remove('blur-background');
    }
}

async function saveChanges(dist) {
    let body = null;
    let image = null;
    const token = localStorage.getItem("token");
    const id= document.getElementById('idPostEdit').value;
    const type = document.getElementById('typePostEdit').value;
    if (type === 'text') {
        body = document.getElementById('editBodyPost').value;
        if (body === "") {
            document.getElementById('editBodyPost').style.setProperty('background-color', '#ff000036', 'important');
            return;
        } else {
            document.getElementById('editBodyPost').style.setProperty('background-color', '#f9fafa', 'important');
        }

    } else {
        body = document.getElementById('editBodyPost').value;
        image = document.getElementById('imageEditPost').files[0];

        if (body === "") {
            document.getElementById('editBodyPost').style.setProperty('background-color', '#ff000036', 'important');
            return;
        } else {
            document.getElementById('editBodyPost').style.setProperty('background-color', '#f9fafa', 'important');
        }

        if (!image) {
            document.getElementById('imageEditPost').style.setProperty('background-color', '#ff000036', 'important');
            return;
        } else {
            document.getElementById('imageEditPost').style.setProperty('background-color', '#f9fafa', 'important');
        }
    }

    const formData = new FormData();
    formData.append("body", body);
    console.log(body);

    if (image) {
        formData.append("image", image);
    }

    try {
        toggleLoader(true);
        const response = await fetch(`https://tarmeezacademy.com/api/v1/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}` // Use the token from localStorage
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

    
        if(dist === 'home') {
                page = 1;
                const postspDiv = document.getElementsByClassName('posts')[0];
                postspDiv.innerHTML='';
                showPosts();
                
            }
            else {
                getPosts();
            }
        showalert('تم تعديل المنشور بنجاح', '', 'green');
    } catch (error) {
        console.error('Error fetching post:', error);
        showalert('خطأ!', error.message, 'red');
    } finally {
        document.getElementById('editBodyPost').value = '';
        document.getElementById('imageEditPost').value = '';
        toggleLoader(false);
        toggleEditModal(false)
        document.getElementById('imageEditPost').classList.add('hidden');
    }


}


async function fillData(id) {
    try {
        const response = await fetch(`https://tarmeezacademy.com/api/v1/posts/${id}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const postData = await response.json();
        const post = postData.data;
        const postImage = Object.keys(post.image).length !== 0 ? `<img src=${post.image} class="w-full" alt=${post.id} style="height: 400px;">` : '';

        if(postImage!='') {
            document.getElementById('typePostEdit').value='image';
            document.getElementById('imageEditPost').classList.remove('hidden');
        }
        else {
            document.getElementById('typePostEdit').value='text';
        }
        document.getElementById('editBodyPost').value=post.body;
        document.getElementById('idPostEdit').value=id;

    } catch (error) {
        console.error('Error fetching or processing posts:', error);
    } finally {
    }
}

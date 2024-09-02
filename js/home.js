let page = 1;
let lastPage = 1;
let isLoading = false; 

async function showPosts() {
    if (isLoading) { 
        return;
    }
    isLoading = true;
    try {
        toggleLoader(true);
        const postsDiv = document.getElementsByClassName('posts')[0];
        const response = await fetch(`https://tarmeezacademy.com/api/v1/posts?limit=25&page=${page}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const postsData = await response.json();
        const posts = postsData.data;
        
        lastPage = postsData.meta.last_page;

        for(let post of posts) {
            const postBodyContent = post.body ? `<p class="post-body" style="color:#4c4747;padding:10px 0;">${post.body}</p>` : '';
            const postImage = Object.keys(post.image).length !== 0 ? `<img src=${post.image} class="w-full" alt=${post.id} style="height: 400px;">` : '';
            const postUserImage = Object.keys(post.author.profile_image).length !== 0 ? `<img src=${post.author.profile_image} class="w-9 h-9 me-2" alt="user" style="border-radius:50%;">` : `<img src="assets/images/user.jpg" class="w-9 h-9 me-2" alt="user" style="border-radius:50%;">`;
            let myPost = localStorage.getItem("token") !== null && JSON.parse(localStorage.getItem("userId")) === post.author.id && localStorage.getItem("userId");
            
            let toggolButton = myPost ? 
            `<div class="relative inline-block text-left ms-3">
                                <button id="dropdownButton-${post.id}" class="inline-flex justify-center w-full me-3 text-xl font-medium text-gray-800 hover:bg-gray-50 " onclick="toggleDropdown(${post.id})">
                                    ⋮
                                </button>
                                <div id="dropdownMenu-${post.id}" class="origin-top-right mt-4 absolute left-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden">
                                <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="dropdownButton-${post.id}">
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center" role="menuitem" onclick="toggleEditModal(true); fillData(${post.id}); toggleDropdown(${post.id})">
                                        <svg class="h-5 w-5  text-blue-500 mr-2" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                    تعديل    
                                    </a>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center" role="menuitem" onclick="deletePost(this, ${post.id}, 'home'); toggleDropdown(${post.id})">
                                    <svg class="h-5 w-5 text-red-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                    </svg>
                                    حذف
                                    </a>
                                </div>
                                </div>

                            </div>` : "";

            const content = `
                <div class="post border-2 px-3 py-2 bg-gray-100 rounded-lg mb-2">
                    <div class="head flex items-center justify-between border-b-2 py-2">
                        <div class="flex items-center cursor-pointer" onclick="profileClicked(${post.author.id})">
                            ${postUserImage}
                            <a href="#" class="text-blue-800 ">${post.author.username}</a>
                        </div>
                        <div class="flex items-center">
                            <p style="color:gray;font-size:14px;" >${post.created_at}</p>

                            ${toggolButton}
                        </div>
                    </div>
                    <div class="body border-b-2">
                        ${postBodyContent}
                        ${postImage}
                    </div>
                    <div class="flex items-center py-2 cursor-pointer w-fit" style="color:gray" onclick="postClicked(${post.id})">
                        <svg class="me-2 h-6 w-6" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                        (${post.comments_count}) تعليق
                    </div>
                </div>
            `;
            postsDiv.innerHTML += content;
        }

        console.log(page);
        const postBodies = document.querySelectorAll('.post-body');
        postBodies.forEach(setTextDirection);

    } catch (error) {
        console.error('Error fetching or processing posts:', error);
    } finally {
        toggleLoader(false);
        isLoading = false;
    }
}




const homeElement = document.getElementById('homeContent');
homeElement.addEventListener('scroll', () => {
    if (homeElement.scrollTop + homeElement.clientHeight >= homeElement.scrollHeight-1 ) {
        page++;
        showPosts();
    }

});


showPosts();


document.addEventListener('DOMContentLoaded', function () {
            const modalToggleButtons = document.querySelectorAll('[data-modal-toggle]');
            const mainContent = document.getElementById('main-content');

            modalToggleButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const modalId = this.getAttribute('data-modal-toggle');
                    const modal = document.getElementById(modalId);

                    if (modal.classList.contains('hidden')) {
                        modal.classList.remove('hidden');
                        modal.classList.add('flex');
                        document.body.classList.add('modal-open'); 
                        mainContent.classList.add('blur-background'); 
                    } else {
                        modal.classList.add('hidden');
                        modal.classList.remove('flex');
                        document.body.classList.remove('modal-open');   
                        mainContent.classList.remove('blur-background');    
                    }
                });
            });
});



async function createNewPostClicked(type) {
    const token = localStorage.getItem("token");
    if (!token) {
        showalert('خطأ!', ' يجب عليك تسجيل الدخول لإضافة منشور.', 'red');
        return;
    }

    let body = null;
    let image = null;

    if (type === 'text') {
        body = document.getElementById('textInput').value;
        if (body === "") {
            document.getElementById('textInput').style.setProperty('background-color', '#ff000036', 'important');
            return;
        } else {
            document.getElementById('textInput').style.setProperty('background-color', '#f9fafa', 'important');
        }

    } else {
        body = document.getElementById('body-post-image').value;
        image = document.getElementById('image-post-input').files[0];

        if (body === "") {
            document.getElementById('body-post-image').style.setProperty('background-color', '#ff000036', 'important');
            return;
        } else {
            document.getElementById('body-post-image').style.setProperty('background-color', '#f9fafa', 'important');
        }

        if (!image) {
            document.getElementById('image-post-input').style.setProperty('background-color', '#ff000036', 'important');
            return;
        } else {
            document.getElementById('image-post-input').style.setProperty('background-color', '#f9fafa', 'important');
        }
    }

    const formData = new FormData();
    formData.append("body", body);

    if (image) {
        formData.append("image", image);
    }

    try {
        toggleLoader(true);
        const response = await fetch(`https://tarmeezacademy.com/api/v1/posts`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}` // Use the token from localStorage
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        page = 1;
        const postsDiv = document.getElementsByClassName('posts')[0];
        postsDiv.innerHTML = '';
        showPosts();
        showalert('تم إنشاء المنشور بنجاح', '', 'green');
    } catch (error) {
        console.error('Error fetching post:', error);
        showalert('خطأ!', error.message, 'red');
    } finally {
        document.getElementById('textInput').value = '';
        document.getElementById('body-post-image').value = '';
        document.getElementById('image-post-input').value = '';
        toggleLoader(false);
        const modal = document.getElementById("crud-modal");
        modal.classList.add("hidden"); 
        const mainContent = document.getElementById('main-content');
        mainContent.classList.remove('blur-background');
    }
}


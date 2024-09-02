const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");

async function getUser() {
    try {
        toggleLoader(true)
        const userUrl = `https://tarmeezacademy.com/api/v1/users/${userId}`; 
        const response = await fetch(userUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json(); 
        const userInfo = document.getElementById('userInfo');
        const UserImage = Object.keys(userData.data.profile_image).length !== 0? `<img src=${userData.data.profile_image} class="w-40 h-40 rounded-full border me-0 lg:me-5 mb-4 lg:mb-0 lg:mr-6 " alt="user">` :`<img src="assets/images/user.jpg" class="w-40 h-40 rounded-full border me-0 lg:me-5 mb-4 lg:mb-0 lg:mr-6   " alt="user">`;

        userInfo.innerHTML = `
            <h1 class="text-gray-500  my-3" style="font-size: 24px;">الصفحة الشخصية</h1>
                <div class="container mx-auto p-4 bg-blue-100 rounded-lg">
                    <div class="flex flex-col lg:flex-row items-center">
                        ${UserImage}
                        <div class="text-center lg:text-left w-fit px-4 mr-4">
                            <h5 class="text-2xl font-bold mb-2" id="name-profile">${userData.data.name}</h5>
                            <p id="username-profile" class="text-secondary mb-2">${userData.data.username}</p>
                            <h5  >عدد المنشورات : <span>${userData.data.posts_count}</span></h5>
                            <h5>عدد التعليقات : <span>${userData.data.comments_count}</span></h5>
                        </div>
                    </div>
                </div>
        
        `
    } catch (error) {
        console.error('Error fetching user:', error);
    }
    finally{
        toggleLoader(false);
        getPosts();
    }
}

async function getPosts() {
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML='';
    try {
        toggleLoader(true)
        const postsUrl = `https://tarmeezacademy.com/api/v1/users/${userId}/posts`; 
        const response = await fetch(postsUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const postsData = await response.json();
        for(let post of postsData.data) {
            const postBodyContent = post.body ? `<p class="post-body" style="color:#4c4747;padding:10px 0;">${post.body}</p>` : '';
            const postImage = Object.keys(post.image).length !== 0? `<img src=${post.image} class="w-full" alt=${post.id} style="height: 400px;">` : '';
            const postUserImage = Object.keys(post.author.profile_image).length !== 0? `<img src=${post.author.profile_image} class="w-9 h-9 me-2 " alt="user" style="border-radius:50%;">` :`<img src="assets/images/user.jpg" class="w-9 h-9 me-2 " alt="user" style="border-radius:50%;">`;
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
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center" role="menuitem" onclick="deletePost(this, ${post.id}, 'user'); toggleDropdown(${post.id})">
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
                <div class="post border-2 px-3 py-2 bg-gray-100 rounded-lg mb-2" >
                    <div class="head flex items-center justify-between border-b-2 py-2">
                        <div class="flex items-center cursor-pointer" onclick="profileClicked(${ post.author.id})">
                            ${postUserImage}
                            <a href="# " class="text-blue-800 bold">${post.author.username}</a>
                        </div>
                        <div class="flex items-center">
                            <p style="color:gray;font-size:14px;" >${post.created_at}</p>
                            ${toggolButton}

                        </div>
                    </div>
                    <div class="body  border-b-2">
                        ${postBodyContent}
                        ${postImage}
                        
                    </div>
                    <div class="flex items-center py-2 cursor-pointer w-fit" style="color:gray" onclick="postClicked(${post.id})">
                        <svg class="me-2 h-6 w-6 0" <svg  width="24"  height="24"  viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M12 20h9" />  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                        (${post.comments_count})  تعلـيق
                    </div>
                </div>
            `;
            
            postsDiv.innerHTML += content;
        }
        if (postsDiv.innerHTML.trim() === '') { // استخدم innerHTML للتحقق من المحتوى
            postsDiv.innerHTML = `<h2 class="text-gray-400 text-center text-lg">لا توجد منشورات</h2>`;
}

        const postBodies = document.querySelectorAll('.post-body');
        postBodies.forEach(setTextDirection);
    } catch (error) {
        console.error('Error fetching posts:', error);
    } finally{
        toggleLoader(false)    
    }
}



getUser();

async function showPost() {
    let urlParams = new URLSearchParams(window.location.search);
    let idPost = urlParams.get("postId");

    try {
        toggleLoader(true);
        const postUrl = `https://tarmeezacademy.com/api/v1/posts/${idPost}`;
        const response = await fetch(postUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const postData = await response.json();
        const post = postData.data;

        let contentPost = '';
        const postImage = Object.keys(post.image).length !== 0? `<img src=${post.image} class="w-full" alt=${post.id} style="height: 400px;">` : '';
        const postUserImage = Object.keys(post.author.profile_image).length !== 0? `<img src=${post.author.profile_image} class="w-9 h-9 me-3 " alt="user" style="border-radius:50%;">` :`<img src="assets/images/user.jpg" class="w-9 h-9 me-3 " alt="user" style="border-radius:50%;">`;
        const postBodyContent = post.body ? `<p class="post-body mt-2" style="color:#4c4747;padding:10px 0; ">${post.body}</p>` : '';

        let commentContent = '';

        for (const comment of post.comments) {
            console.log(comment);
            const commentUserImage  = Object.keys(comment.author.profile_image).length !== 0? `<img src=${comment.author.profile_image} " onclick="profileClicked(${comment.author.id})" class="cursor-pointer w-9 h-9 me-3 " alt="user" style="border-radius:50%;">` :`<img src="assets/images/user.jpg" class="cursor-pointer w-9 h-9 me-3 " onclick="profileClicked(${comment.author.id})" alt="user" style="border-radius:50%;">`;
            commentContent += `
                
                <div class="comment flex items-start w-full mb-3">
                    ${commentUserImage}
                    <div class="py-2 px-3 mt-2 rounded-lg bg-gray-200 comment-details">
                        <a onclick="profileClicked(${comment.author.id})" class="no-underline cursor-pointer text-blue-800" >${comment.author.username}</a>
                        <p class="mb-0 text-gray-600">${comment.body}</p>
                        <div class="sham"></div>
                    </div>
                </div>

            `;
        }

        if(commentContent =='')
            commentContent = `<h2 class="text-gray-400 text-center text-lg">لا توجد تعليقات</h2>`

        contentPost = `
            <div class="post border-2 px-3 py-2 bg-gray-100 rounded-lg mb-2" >
                    <div class="head flex items-center justify-between border-b-2 py-2">
                        <div class="flex items-center cursor-pointer" onclick="profileClicked(${ post.author.id})">
                            ${postUserImage}
                            <a href="# " class="text-blue-800 bold">${post.author.username}</a>
                        </div>
                        <p style="color:gray;font-size:14px;" >${post.created_at}</p>
                    </div>
                    <div class="body  border-b-2">
                        ${postBodyContent}
                        ${postImage}
                        
                    </div>
                    <div class="flex items-center py-2  w-fit" style="color:gray" >
                        <svg class="me-2 h-6 w-6 0" <svg  width="24"  height="24"  viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M12 20h9" />  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                        (${post.comments_count})  تعلـيق
                    </div>
            </div>
            <div class="addPost flex items-center justify-between py-3">
                <input type="text" id="bodyComment" placeholder="أضف تعليـــــــق" class="form-control w-[97%] border border-gray-300 outline-0 me-1 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                <button type="button" onclick="addNewComment(this, ${post.id})" class="btn text-center flex justify-end   text-white rounded-lg w-fit">
                    <svg class="h-9 w-9  hover:text-blue-70 cursor-pointer text-blue-500 hover:text-blue-700 "
                        viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                        <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" />
                    </svg>
                </button>
            </div>

            <div id="comments" class="p-3 rounded bg-body-tertiary">
                ${commentContent}
            </div>
        `;

        document.getElementById('post').innerHTML = contentPost;
        const postBodies = document.querySelectorAll('.post-body');
        postBodies.forEach(setTextDirection);
    } catch (error) {
        console.error('Error fetching post:', error);
    }
    finally{
        toggleLoader(false);
        
    }
}


async function addNewComment(e, id) {
    const bodyComment = document.getElementById('bodyComment').value;
    let token = localStorage.getItem("token");

    if (!token) {
        showalert('خطأ!', 'يجب عليك تسجيل الدخول لإضافة تعليق.', 'red');
        return;
    }

    if (!bodyComment.trim()) {
        showalert('خطأ!', 'حقل التعليق فارغ.', 'red');
        return;
    }

    try {
        toggleLoader(true); // Show loader before starting the request

        const body = {
            body: bodyComment
        };

        const response = await fetch(`https://tarmeezacademy.com/api/v1/posts/${id}/comments`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorData = await response.json(); // Parse the response to get error details
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        showalert('تم إضافة التعليق بنجاح', '', 'green'); // Pass an empty string for the message if not needed
        showPost(); // Refresh the post to show the new comment
        document.getElementById('bodyComment').value = ''; // Clear the input field

    } catch (error) {
        showalert('خطأ!', error.message, 'red'); // Show a specific error message
    } finally {
        toggleLoader(false); // Hide loader once the request is done
    }
}


showPost();



const title = document.getElementById("title");
const content = document.getElementById("content");
const publishBtn = document.getElementById("publishBtn");
const blogList = document.getElementById("blogList");

let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
let editIndex = -1;

showBlogs();

publishBtn.addEventListener("click", function(){

    if(title.value.trim()==="" || content.value.trim()===""){
        alert("Please fill all fields");
        return;
    }

    if(editIndex==-1){

        blogs.push({
            title:title.value,
            content:content.value
        });

    }else{

        blogs[editIndex]={
            title:title.value,
            content:content.value
        };

        editIndex=-1;
        publishBtn.innerText="Publish Blog";
    }

    localStorage.setItem("blogs",JSON.stringify(blogs));

    title.value="";
    content.value="";

    showBlogs();

});

function showBlogs(){

    blogList.innerHTML="";

    blogs.forEach(function(blog,index){

        blogList.innerHTML += `
        <div class="blog">
        <h3>${blog.title}</h3>
        <p>${blog.content}</p>

        <button class="edit" onclick="editBlog(${index})">Edit</button>

        <button class="delete" onclick="deleteBlog(${index})">Delete</button>

        </div>
        `;

    });

}

function editBlog(index){

title.value=blogs[index].title;
content.value=blogs[index].content;

editIndex=index;

publishBtn.innerText="Update Blog";

}

function deleteBlog(index){

if(confirm("Delete this blog?")){

blogs.splice(index,1);

localStorage.setItem("blogs",JSON.stringify(blogs));

showBlogs();

}

}
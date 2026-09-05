let  searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search_btn");

const profileContainer = document.getElementById("profile_container");
const errorContainer = document.querySelector(".error_container");

const avatar = document.getElementById("avatar");
const name = document.getElementById("name");
const username = document.getElementById("username");
const bio = document.getElementById("bio");

const userlocation = document.getElementById("location");
const joinedDate = document.getElementById("joined-date");

const profileLink = document.getElementById("profile-link");

const followers = document.getElementById("followers");
const following = document.getElementById("following");
const repos = document.getElementById("repos");

const company = document.getElementById("company");
const blog = document.getElementById("blog");
const twitter = document.getElementById("twitter");
const blogContainer=document.getElementById("chain_contain");
const twitterContainer= document.getElementById("twitter");
const reposContainer = document.getElementById("repos-container");

searchBtn.addEventListener("click",searchUser)
searchInput.addEventListener("keypress",(e)=>{
if(e.key==="Enter") searchUser();
});

async function searchUser() {
    const username=searchInput.value.trim();

    if (!username) return alert("please enter a username");
    


try{
    profileContainer.classList.add("hidden");
    errorContainer.classList.add("hidden");
    const response=await fetch(`https://api.github.com/users/${username}`);
    if(!response.ok) throw new Error("user not found");
    const userData =await response.json();
    console.log("user data is here",userData);
    displayUserdata(userData);
    fetchrepo(userData.repos_url);
}
catch(error){
showError();
}
}

function displayUserdata(show){
avatar.src=show.
avatar_url;
name.textContent=show.name||show.login; 
username.textContent=`@${show.login}`;
bio.textContent=show.bio||"NO bio";
userlocation.textContent=show.location||"Not Specified";
joinedDate.textContent= formatdate(show.created_at)
joinedDate.textContent=show.created_at;
profileLink.href=show.html_url;
followers.textContent=show.followers;
following.textContent=show.following;
repos.textContent=show.public_repos;
if(show.company) company.textContent=show.company;
else show.company="Not specified";
if (show.blog){
    blog.textContent=show.blog;
    blog.href=show.blog.startsWith("http")?show.blog:`https://${show.blog}`;
}
else{
    blog.textContent="No website";
    blog.href="#";
}

  blogContainer.style.display = "flex";

  if (show.twitter_username) {
    twitter.textContent = `@${show.twitter_username}`;
    twitter.href = `https://twitter.com/${show.twitter_username}`;
  } else {
    twitter.textContent = "No Twitter";
    twitter.href = "#";
  }
  twitterContainer.style.display="flex";
  profileContainer.classList.remove("hidden");

}

function formatdate(date){
    return new Date(date).toLocaleDateString("en-IN", {
        year:"numeric",
        month:"numeric",
        day:"numeric",
    });

}

function showError(){
    errorContainer.classList.remove("hidden")
    profileContainer.classList.add("hidden")
}
 async function fetchrepo(repo){
    reposContainer.innerHTML=`<div class="loading_repo"> Loading repositories..</div>`;
try {
    const response = await fetch(repo);
    const repos= await response.json()
     displayrepo(repos);  
} catch (error) {
    reposContainer.innerHTML=`<div class="no-repos"> ${error.message}</div> `
    
}
 }

 function displayrepo(repos){
    if (repos.length===0){
       reposContainer.innerHTML=`<div class="no-repos">No repo found</div> `;
       return ;
    }
    reposContainer.innerHTML=""

    repos.forEach(repo => {
        const repoCard=document.createElement("div");
        repoCard.className="repos-card";
        const updaate=formatdate(repo.updated_at);
        
    repoCard.innerHTML = `
      <a href="${repo.html_url}" target="_blank" class="repo-name">
        <i class="fas fa-code-branch"></i> ${repo.name}
      </a>
      <p class="repo-description">${repo.description || "No description available"}</p>
      <div class="repo-meta">
        ${
          repo.language
            ? `
          <div class="repo-meta-item">
            <i class="fas fa-circle"></i> ${repo.language}
          </div>
        `
            : ""
        }
        <div class="repo-meta-item">
          <i class="fas fa-star"></i> ${repo.stargazers_count}
        </div>
        <div class="repo-meta-item">
          <i class="fas fa-code-fork"></i> ${repo.forks_count}
        </div>
        <div class="repo-meta-item">
          <i class="fas fa-history"></i> ${updaate}
        </div>
      </div>
    `;

    reposContainer.appendChild(repoCard);
        
    });
 }
searchInput.value=" ";
searchUser();
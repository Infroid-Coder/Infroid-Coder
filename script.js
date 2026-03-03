const projectImgFolder = "./assets/project_images/";
const platformIcons = "./assets/social_icons/";
const icons = "./assets/other_icons/";

function makeProjectCard(name, desc, tech, img, repo_link, live_link, img_position="center"){
    let wrap = document.createElement("div");
    wrap.classList.add("project-card");

    let imgDiv = document.createElement("div");
    imgDiv.classList.add("project-img-div");

    let imgElem = document.createElement("img");
    if(!img){
        img = "General.png"
        imgElem.classList.add("general-img");
        img_position = "right"
    }
    imgElem.src = projectImgFolder + img;
    imgElem.style.objectPosition = img_position;

    imgDiv.appendChild(imgElem);

    let detailDiv = document.createElement("div");
    detailDiv.classList.add("project-card-detail-div");

    let titleDiv = document.createElement("div");
    titleDiv.classList.add("project-title-div");

    let title = document.createElement("h3");
    title.classList.add("project-title");
    title.innerText = name;

    let githubLink;
    if(repo_link){
        githubLink = document.createElement("a");
        githubLink.classList.add("project-github-a");
        githubLink.href = repo_link;
        githubLink.target = "_blank";

        let githubLinkIcon = document.createElement("img");
        githubLinkIcon.classList.add("project-github");
        githubLinkIcon.src = platformIcons + "github.png";
        githubLinkIcon.alt = "Project Source - Github";

        githubLink.appendChild(githubLinkIcon);
    }

    let liveLink;
    if(live_link){
        liveLink = document.createElement("a");
        liveLink.classList.add("project-live-a");
        liveLink.href = live_link;
        liveLink.target = "_blank";

        let liveLinkIcon = document.createElement("img");
        liveLinkIcon.classList.add("project-live");
        liveLinkIcon.src = icons + "external_link.png";
        liveLinkIcon.alt = "Project Live Preview";

        liveLink.appendChild(liveLinkIcon);
    }

    titleDiv.appendChild(title);
    if(githubLink) titleDiv.appendChild(githubLink);
    if(liveLink) titleDiv.appendChild(liveLink);

    detailDiv.appendChild(titleDiv);

    let descElem = document.createElement("p");
    descElem.classList.add("project-desc");
    descElem.innerText = desc;

    detailDiv.appendChild(descElem);

    let usedTechList = document.createElement("div");
    usedTechList.classList.add("project-technologies-list");

    tech.forEach(val => {
        let techItem = document.createElement("p");
        techItem.classList.add("project-tech");
        techItem.innerText = val;

        usedTechList.appendChild(techItem);
    });

    detailDiv.appendChild(usedTechList);

    wrap.appendChild(imgDiv);
    wrap.appendChild(detailDiv);

    return wrap;
}

let loadingScreen = document.getElementById("loading-screen");
let loadingBuffer = document.getElementById("buffer");
let loadingBlocks = document.getElementById("loading-blocks");

fetch("./projects.json")
.then(val => val.json())
.then(json => {
    let projects = Object.values(json);

    let projectCardsDiv = document.getElementById("project-cards");

    for(let i = projects.length-1; i >= 0; i--){
        let project = projects[i];
        let card = makeProjectCard(
            project.name,
            project.desc,
            project.technologies,
            project.img,
            project.repo_link,
            project.live_link,
            project.img_position
        );
        projectCardsDiv.appendChild(card);
    }

    loadingBuffer.animate([
        {transform: "translate(-50%, -100vh)"}
    ], {
        duration: 600
    }).onfinish = () => {
        loadingBuffer.style.display = "none";
        loadingScreen.style.background = "none";
        loadingBlocks.style.display = "block"
        document.styleSheets[document.styleSheets.length-1].insertRule("section {display: grid !important;}",1);
        loadingBlocks.onanimationend = () => {
            loadingBlocks.style.display = "none";
            loadingScreen.style.display = "none";
        }
    }
})
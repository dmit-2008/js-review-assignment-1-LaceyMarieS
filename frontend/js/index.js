
//IMPORTS
import 'bootstrap/dist/css/bootstrap.min.css'
import { getJobs } from './api/jobs';
import { saveJob } from './api/jobs';
import { deleteJob } from './api/jobs';




//VARIABLES
const jobListElement = document.querySelector("#searched-jobs")
const bookmarkListElement = document.querySelector("#my-jobs")
const jobDetailsElement = document.querySelector("#job-details-card")
const bookmarkDetailsElement = document.querySelector("#bookmark-details-card")
const searchTab = document.querySelector("#search-tab")
const bookmarkTab = document.querySelector("#bookmark-tab")
const searchPage = document.querySelector("#search-jobs-tab")
const bookmarkPage = document.querySelector("#my-jobs-tab")
let jobs = []




//INITIALIZE
//get all jobs
renderJobList(`http://localhost:3000/jobs`)
//clear old saved jobs
deleteJob(`http://localhost:3000/saved-jobs`)




//EVENTS
//submit form
document.querySelector("#search-jobs-form").addEventListener("submit", (e) => {
    e.preventDefault()
    const search =  document.querySelector("#query-input").value
    renderJobList(`http://localhost:3000/jobs?search=${search}`)
});

//Click view job button on results page
jobListElement.addEventListener("click", (e)=>{
    if(e.target.classList.contains('view-job-button')){
        renderJobDetails(e.target.id, jobDetailsElement)
    }
})

//click view job button on bookmark page
bookmarkListElement.addEventListener("click", (e)=>{
    if(e.target.classList.contains('view-job-button') === true && e.target.classList.contains('bookmarked') === false){
        renderJobDetails(e.target.id, bookmarkDetailsElement, false)
    }
})

//click save job button in job details
jobDetailsElement.addEventListener("click", (e) =>{
    if(e.target.classList.contains('save-job') === true && e.target.classList.contains('bookmarked') === false){
        getJobs(`http://localhost:3000/jobs/${e.target.id}`).then((data) =>{
            const savedJob = saveJob(data)
            savedJob.then((data) =>{
                renderSavedJobs()
                console.log(`Job ID: ${data.jobId} Saved`)
            })
        })
        e.target.classList.add("bookmarked")
        e.target.classList.remove("btn-success")
        e.target.classList.add("btn-secondary")
        e.target.innerHTML = "Saved"
    }
})

//click on bookmark tab
bookmarkTab.addEventListener("click", (e) =>{
    if(e.target.classList.contains("active") === false){
        bookmarkTab.classList.add("active")
        bookmarkPage.classList.remove("d-none")
        bookmarkPage.classList.add("album")

        searchTab.classList.remove("active")
        searchPage.classList.remove("album")
        searchPage.classList.add("d-none")

        renderSavedJobs()
    }
});

//click on search tab
searchTab.addEventListener("click", (e) =>{
    if(e.target.classList.contains("active") === false){
        searchTab.classList.add("active")
        searchPage.classList.remove("d-none")
        searchPage.classList.add("album")

        bookmarkTab.classList.remove("active")
        bookmarkPage.classList.remove("album")
        bookmarkPage.classList.add("d-none")
    }
});





//METHODS
function renderJobList(url){
    jobListElement.innerHTML = ' '
    jobs = getJobs(url).then((data) =>{
        if(data.length !== 0){
            data.forEach((job =>{
                jobListElement.innerHTML +=
                    `
                        <li class="job-card card my-1" style="width: 18rem;">
                        <div class="card-header">${job.company}</div>
                        <div class="card-body">
                            <h5 class="card-title">${job.title}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">${job.location}</h6>
                            <h6 class="card-subtitle mb-2 text-body-secondary">Posted ${job.date_posted}</h6>
                            <button class="btn btn-primary view-job-button" id="${job.id}">View Job</button>
                        </div>
                        </li>
                    `
            }))
        }else{
            jobListElement.innerHTML =
                `
                    <div class="text-dark">No Results Found</div>
                `
        }
    })
}

function renderJobDetails(id, element){
    element.innerHTML = ' '
    url = `http://localhost:3000/jobs/${id}`
    jobs = getJobs(url).then((job) =>{
        if(element === jobDetailsElement){
            element.innerHTML +=
                `
                    <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">${job.title}</h5>
                        <h4 class="card-subtitle mb-2 text-body-secondary pb-3">${job.company}</h6>
                        <h6 class="card-subtitle mb-2 text-body-secondary ">${job.location}</h6>
                        <h6 class="card-subtitle mb-2 text-body-secondary pb-3">Posted ${job.date_posted}</h6>
                    
                        <h5 class="card-subtitle mb-2">Description</h5>
                        <p class="card-text">${job.description}</p>
                        <h5 class="card-subtitle mb-2">Qualifications</h5>
                        <p class="card-text">${job.qualifications}</p>
                        <button class="btn btn-success save-job" id="${job.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                        </svg>
                        Save Job
                        </button>
                    </div>
                    </div>
                `
        }else{
            element.innerHTML +=
            `
                <div class="card">
                <div class="card-body">
                    <h3 class="card-title">${job.title}</h5>
                    <h4 class="card-subtitle mb-2 text-body-secondary pb-3">${job.company}</h6>
                    <h6 class="card-subtitle mb-2 text-body-secondary ">${job.location}</h6>
                    <h6 class="card-subtitle mb-2 text-body-secondary pb-3">Posted ${job.date_posted}</h6>
                
                    <h5 class="card-subtitle mb-2">Description</h5>
                    <p class="card-text">${job.description}</p>
                    <h5 class="card-subtitle mb-2">Qualifications</h5>
                    <p class="card-text">${job.qualifications}</p>
                    <button class="btn btn-secondary remove-job" id="${job.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                    </svg>
                    Remove Saved Job
                    </button>
                </div>
                </div>
            `
        }
    })
}

function renderSavedJobs(){
    bookmarkListElement.innerHTML = ' '
    jobs = getJobs('http://localhost:3000/saved-jobs').then((job) =>{

        if(job.length !== 0){
            job.forEach((jobId =>{
                getJobs(`http://localhost:3000/jobs/${jobId.jobId}`).then((job) =>{
                    bookmarkListElement.innerHTML +=
                        `
                        <li class="job-card card my-1" style="width: 18rem;">
                        <div class="card-header">${job.company}</div>
                        <div class="card-body">
                            <h5 class="card-title">${job.title}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">${job.location}</h6>
                            <h6 class="card-subtitle mb-2 text-body-secondary">Posted ${job.date_posted}</h6>
                            <button class="btn btn-primary view-job-button" id="${job.id}">View Job</button>
                        </div>
                        </li>
                        `
                })
            }))
        }else{
            bookmarkListElement.innerHTML =
                `
                    <div class="text-dark">No Jobs Saved</div>
                `
        }
    })
}
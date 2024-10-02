
//IMPORTS
import 'bootstrap/dist/css/bootstrap.min.css'
import { getJobs } from './api/jobs';
import { saveJob } from './api/jobs';


//VARIABLES
const jobListElement = document.querySelector("#searched-jobs")
const jobDetailsElement = document.querySelector("#job-details-card")
let jobs = []



//EVENTS
document.querySelector("#search-jobs-form").addEventListener("submit", (e) => {
    e.preventDefault()
    const search =  document.querySelector("#query-input").value
    renderJobList(`http://localhost:3000/jobs?search=${search}`)
});

jobListElement.addEventListener("click", (e)=>{
    if(e.target.classList.contains('view-job-button')){
        renderJobDetails(e.target.id)
    }
})

jobDetailsElement.addEventListener("click", (e) =>{
    if(e.target.classList.contains('save-job')){
        //saveJob(e.currentTarget.id)
        //console.log(e.target.id)
        const saveJob = getJobs(`http://localhost:3000/jobs/${e.target.id}`).then((data) =>{
            saveJob(data)
        })
        
        //console.log()
    }
})

// getJobs(`http://localhost:3000/jobs/7`).then((data) =>{
//     console.log(data)
// })

// function getJobtoSave(id){
//     // getJobs(`http://localhost:3000/jobs/${id}`).then((data) =>{
//     //     console.log(data)
//     // })
// }


//METHODS
function renderJobList(url){
    jobListElement.innerHTML = ' '
    jobs = getJobs(url).then((data) =>{
        if(jobs){
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

function renderJobDetails(id){
    jobDetailsElement.innerHTML = ' '
    url = `http://localhost:3000/jobs/${id}`
    jobs = getJobs(url).then((job) =>{
        jobDetailsElement.innerHTML +=
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
    })
}



//  "main": "index.js",   --> taken from package to try and fix build

//IMPORTS
import 'bootstrap/dist/css/bootstrap.min.css'
import { getJobs } from './api/jobs';
import { renderJobs } from './dom/dom';

//VARIABLES
const jobListElement = document.querySelector("#searched-jobs")
let jobs = []

//METHODS
document.querySelector("#search-jobs-form").addEventListener("submit", (e) => {
    e.preventDefault()
    const search =  document.querySelector("#query-input").value
    render(`http://localhost:3000/jobs?search=${search}`)
});

//render('http://localhost:3000/jobs/7')
//render('http://localhost:3000/jobs?search=Software')
//render('http://localhost:3000/jobs')

async function render(url){
    jobListElement.innerHTML = ' '
    jobs = await getJobs(url)
    if(jobs){
        jobs.forEach((job =>{
            renderJobs(job, jobListElement)
        }))
    }else{
        jobListElement.innerHTML =
            `
                <div class="text-dark">No Results Found</div>
            `
    }
}
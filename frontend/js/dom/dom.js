
export function renderJobs(jobData, element){
    element.innerHTML +=
        `
            <li class="job-card card my-1" style="width: 18rem;">
            <div class="card-header">${jobData.company}</div>
            <div class="card-body">
                <h5 class="card-title">${jobData.title}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${jobData.location}</h6>
                <h6 class="card-subtitle mb-2 text-body-secondary">Posted ${jobData.date_posted}</h6>
                <button class="btn btn-primary view-job-button" job-data-id="${jobData.id}">View Job</button>
            </div>
            </li>
        `
}
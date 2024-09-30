// your code goes here.

import 'bootstrap/dist/css/bootstrap.min.css'
import { getJobs } from './api/jobs';

document.querySelector("#search-jobs-form").addEventListener("submit", (e) => {
    e.preventDefault()
    const search =  document.querySelector("#query-input").value
    render(`http://localhost:3000/jobs?search=${search}`)
});

function render(url){
    getJobs(url).then((data) =>{
        console.log(data)
    })
}
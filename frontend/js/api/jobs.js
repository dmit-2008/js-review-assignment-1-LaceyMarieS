
export async function getJobs(url){
    const res = await fetch(url)
    return await res.json()
}

export async function getSavedJobs(){
    
}

export async function saveJob(job){
    const requestHeader = new Headers()
    requestHeader.append('content-Type', 'application/json')
    const payload = JSON.stringify(job)
    const requestObject = {
        method: 'POST',
        headers: requestHeader,
        body: payload,
        redirect: 'follow',
    }
    
    const res = await fetch('http://localhost:3000/saved-jobs', requestObject)
    return res.json()
}
// your code goes here.

export async function getJobs(url = 'http://localhost:3000/jobs'){
    const res = await fetch(url)
    return await res.json()
}
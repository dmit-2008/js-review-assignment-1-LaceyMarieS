// const getJobs = (url) => {
//     return fetch(url)
//         .then((response)=> {
//             console.log(response)
//             return response.json()
            
//         }).then((data)=> {
//             return data
//         })
// }

export async function getJobs(url){
    console.log(url)
    const res = await fetch(url)
    return await res.json()
}

// export{getJobs}
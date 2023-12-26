export const formatDate=(dated)=>{
    let date = new Date(dated)
    return ` 
    ${date.getDate()}
    ${date.toLocaleDateString("en-US", {month: 'short'})} 
    ${date.getFullYear()} 
    ${date.toLocaleString("en-US", {hour: 'numeric', minute: 'numeric', hour12: true})}
 `

}



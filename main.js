// 1. Define the variables

let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const exportBtn = document.getElementById("export-btn")

// 2. Check if leadsFromLocalStorage is truthy, getting the leads from local storage, setting myLeads to its value and rendering them out

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

// 3. Listen for clicks on the tab button and saving the current tab as a lead

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

// 4. Listen for clicks on the input button, grab the url of current tab and saving myLeads array to localStorage

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    console.log(localStorage.getItem("myLeads"))
}) 

// 5. Render out the myLeads in the ul with inner.HTML and opening them in a new tab (if desired)

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++){
    listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>
                 ${leads[i]}
            </a>
        </li>
    `
    }
    ulEl.innerHTML = listItems
}

// 6. Listen for clicks on teh delete-btn which clears out the localStorage

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads) 
})

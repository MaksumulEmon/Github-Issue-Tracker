const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");
const dataContainer = document.getElementById('dataContainer');
const loadingSpiner = document.getElementById('loadingSpiner');
const issuesdetalismodal = document.getElementById('issues_detalis_modal');
const modalContainer = document.getElementById("modalContainer");
const allCardContainer = document.getElementById("allCardContainer");
let allIssues = [];


// Function Loading
function showLoading() {
    loadingSpiner.classList.remove("hidden");
    dataContainer.innerHTML = "";
}


// Function hidden
function hiddenLoading() {
    loadingSpiner.classList.add("hidden");
}


// Toggle Button
function selectedButton(active) {
    allBtn.classList.remove("btn-primary");
    allBtn.classList.add("btn-outline");

    openBtn.classList.remove("btn-primary");
    openBtn.classList.add("btn-outline");

    closedBtn.classList.remove("btn-primary");
    closedBtn.classList.add("btn-outline");

    if (active == "all") {
        allBtn.classList.remove("btn-outline");
        allBtn.classList.add("btn-primary");
    } else if (active == "open") {
        openBtn.classList.remove("btn-outline");
        openBtn.classList.add("btn-primary");
    }
    else if (active == "closed") {
        closedBtn.classList.remove("btn-outline");
        closedBtn.classList.add("btn-primary");
    }
}



// Load All Data
async function loadData() {
    showLoading();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const info = await res.json();
    hiddenLoading();
    // console.log(data);
    allIssues = info.data;
    displayData(allIssues)

}



function btnEvent(active) {
    showLoading();
    let filteredData = [];

    if (active == "all") {
        filteredData = allIssues;
    }

    else if (active === "open") {
        filteredData = allIssues.filter(item => item.status == "open");
        // hiddenLoading();
    }

    else if (active === "closed") {
        filteredData = allIssues.filter(item => item.status == "closed");
      
    }
      hiddenLoading();

    displayData(filteredData);
    selectedButton(active);
}



// IssueCount
function issueCount(count) {
    const isCount = document.getElementById("issueCount");
    isCount.innerText = count.length + " Issues";
}




// Modal Api
function openModal(id) {
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
        .then(res => res.json())
        .then(detail => displayModal(detail.data));
}


// Show Modalon Display
function displayModal(card) {

    const labels = card.labels.map(label => `
    <div class="badge bg-[#FEECEC] text-[red] border-[#FECACA] text-[12px] font-medium rounded"> ${label}
    </div>
    `).join("");

    modalContainer.innerHTML = `
        <div class="p-4">
            <h3 class="font-semibold text-lg">${card.title}</h3>
            <div class="flex items-center gap-2 my-2">
      <div class="badge ${card.status == "open" ? 'bg-[#00A96E]' : 'bg-[#EF4444]'} text-white text-[12px] font-medium rounded-full">
                    ${card.status}
               </div>
         <div class="text-[#64748B] text-[12px] flex flex-col md:flex-row gap-1">
                    <div>• Opened by ${card.assignee}</div>
             <div>• ${card.createdAt}</div>
                </div>
            </div>
            <div class="flex gap-1 mb-4 mt-4">
               
                <div class="badge flex gap-2">         ${labels}
                </div>
            </div>
            <div class="text-[#64748B] mb-2">${card.description}</div>
            <div class="p-4 grid grid-cols-2 gap-2.5 bg-gray-200 rounded">
                <div>          <p class="text-[#64748B]">Assignee:</p>
                    <h5 class="font-bold">${card.assignee}</h5>
                </div>
                <div>
                    <p class="text-[#64748B]">Priority:</p>
                 <div class="badge ${card.priority == 'high' ? 'bg-[#EF4444]' : card.priority == 'medium' ? 'bg-[#D97706]' : 'bg-[#00A96E]'} text-white text-[12px] font-medium rounded-full">
                        ${card.priority}
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById("my_modal_3").showModal();
}



function displayData(datas) {
    dataContainer.innerHTML = "";

    datas.forEach(data => {
        // Created card
        const card = document.createElement("div");
        card.className = `p-4 rounded-xl shadow-lg bg-white border-t-4 cursor-pointer ${data.status == "open" ? 'border-t-[#00A96E]' : 'border-t-[#A855F7]'}`;


        card.addEventListener("click", () => {
            openModal(data.id);
        });

        // Card Item
        card.innerHTML = `
            <div class="flex justify-between items-center">
                <img src="${data.status == "open" ? './assets/Open-Status.png' : './assets/Closed-Status.png'}" alt="" class="w-6 h-6" />
                <p class="${data.priority == "high"
                ? "text-[#EF4444] bg-[#FEECEC] px-6 py-1 rounded-4xl"
         : data.priority == "low"
                    ? "text-[#9CA3AF] bg-[#EEEFF2] px-6 py-1 rounded-4xl"
                    : "text-[#F59E0B] bg-[#FFF6D1] px-6 py-1 rounded-4xl"
            }">
                ${data.priority}
                </p>
            </div>
            <p class="text-[#1F2937] font-semibold pt-3 line-clamp-1">${data.title}</p>
            <p class="text-[#64748B] text-[0.75rem] line-clamp-2">${data.description}</p>
      <div class="block items-center space-y-3 mt-2">
            <p class="text-[#ef4444] bg-[#FEECEC] flex items-center gap-1 px-6 py-1 rounded-4xl border border-[#FECACA]">
                    <i class="fa-solid fa-bug"></i> ${data.labels[0]}
      </p>
                <p class="text-[#D97706] bg-[#FFF8DB] px-2 py-1.5 border border-[#FDE68A] rounded-4xl ${data.labels[1] ? "" : "hidden"}">
         <i class="fa-solid fa-life-ring"></i> ${data.labels[1] ? data.labels[1] : ""}
        </p>
            </div>

  <div class="border-t border-zinc-400 mt-4 pt-4 pl-4 pr-4">
                <p class="text-[#64748B]">${data.author}</p>
                <p class="text-[#64748B]">${data.createdAt}</p>
            </div>
        `;

        dataContainer.appendChild(card);
    });

    // Update issue count
    issueCount(datas);



}

loadData();



    // Secrch 
    document.getElementById("search-button").addEventListener("click", ()=>{
        const  input = document.getElementById("input-serach");
        const searchValue = input.value.trim().toLowerCase();
        console.log(searchValue);

        showLoading();
        fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
        .then(res => res.json())
        .then(data =>{
            hiddenLoading();
            displayData(data.data);
        });
    })
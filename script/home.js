
const dataContainer = document.getElementById('dataContainer');
const loadingSpiner =document.getElementById('loadingSpiner');



function showLoading (){
    loadingSpiner.classList.remove("hidden");
    dataContainer.innerHTML ="";
}

function hiddenLoading(){
       loadingSpiner.classList.add("hidden");
}



async function loadData() {
    showLoading();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const info = await res.json();
 
    hiddenLoading();
    // console.log(data);
    displayData(info.data)

}



function displayData(datas) {
    console.log(datas);
    datas.forEach(data => {
        console.log(data);


        // Labes




 const card = document.createElement("div")
        card.className = `p-4 rounded-xl shadow-lg bg-white border-t-4 ${data.status === "open" ? 'border-t-[#00A96E]' : 'border-t-[#A855F7]'}`;
        card.innerHTML = `
        
                    <div class="flex justify-between items-center">
                   <img src="${data.status === "open" ? './assets/Open-Status.png' : './assets/Closed-Status.png'}" alt="" class="w-6 h-6" />


                <p class="${data.priority === "high"
                ? "text-[#EF4444] bg-[#FEECEC] px-6 py-1 rounded-4xl"
                : data.priority === "low"
                    ? "text-[#9CA3AF] bg-[#EEEFF2] px-6 py-1 rounded-4xl"
                    : "text-[#F59E0B] bg-[#FFF6D1] px-6 py-1 rounded-4xl"
                    }">
                     ${data.priority}
                    </p>
                    </div>

                    <p class="text-[#1F2937] font-semibold pt-3 line-clamp-1">${data.title}</p>
                    <p class="text-[#64748B] text-[0.75rem] line-clamp-2">${data.description}</p>

                    <div class="flex items-center gap-2 mt-2">
                        <p class="text-[#ef4444] bg-[#FEECEC]  flex items-center gap-1 px-6 py-1 rounded-4xl border border-[#FECACA]"><i
                                class="fa-solid fa-bug"></i> ${data.labels[0]}
                        <p>
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
}

loadData();
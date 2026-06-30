const showroomData = [
    {
        id: 1,
        title: "Minimalist Electronic Showcase",
        category: "electronics",
        prompt: "Commercial studio lighting, sleek wireless earbuds on a solid matte dark blue background, cinematic lighting, 8k resolution, photorealistic --ar 16:9",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "Cyberpunk Tech Gadget",
        category: "electronics",
        prompt: "Futuristic smartwatch prototype, neon glowing matrix accents, floating layout setup, clean dark gray backdrop, product photography --v 6.0",
        image: "https://images.unsplash.com/photo-1517502884422-41eaaced0168?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        title: "Aavya's Virtual Closet Banner",
        category: "fashion",
        prompt: "Hyper-realistic virtual fashion influencer studio, modern aesthetic apparel rack, pastel abstract background, premium lighting design, elegant presentation",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        title: "Geometric Studio Setup",
        category: "backgrounds",
        prompt: "Clean commercial photography backdrop, abstract clay shapes, perfect shadows, minimal product podium, sand color palette, warm soft glow",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
    }
];

const grid = document.getElementById("showroom-grid");
const filterContainer = document.getElementById("filter-container");
const categoryTitle = document.getElementById("active-category-title");
const itemCount = document.getElementById("item-count");
const toast = document.getElementById("toast");

function renderShowroom(data) {
    grid.innerHTML = "";
    itemCount.textContent = `Showing ${data.length} items`;
    
    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "glass-panel rounded-2xl overflow-hidden group hover:border-blue-500/30 transition duration-300 flex flex-col";
        card.innerHTML = `
            <div class="h-48 overflow-hidden bg-gray-900 relative">
                <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                <span class="absolute top-3 right-3 text-xs px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-gray-300 capitalize">${item.category}</span>
            </div>
            <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                    <h3 class="text-base font-bold text-white mb-2">${item.title}</h3>
                    <div class="bg-[#0f1524] p-3 rounded-xl border border-gray-800 text-xs text-gray-400 font-mono break-words relative select-all">${item.prompt}</div>
                </div>
                <button onclick="copyPrompt('${item.prompt.replace(/'/g, "\\'")}')" class="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer">
                    <i class="fa-regular fa-copy"></i> Copy Prompt
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

window.copyPrompt = function(promptText) {
    navigator.clipboard.writeText(promptText).then(() => {
        toast.classList.remove("translate-y-20", "opacity-0");
        toast.classList.add("translate-y-0", "opacity-100");
        setTimeout(() => {
            toast.classList.remove("translate-y-0", "opacity-100");
            toast.classList.add("translate-y-20", "opacity-0");
        }, 2500);
    });
};

function setupFilters() {
    const categories = ["all", ...new Set(showroomData.map(item => item.category))];
    filterContainer.innerHTML = "";
    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = "w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition capitalize cursor-pointer " + 
                        (cat === "all" ? "bg-blue-600 text-white font-semibold" : "text-gray-400 hover:bg-gray-800/50 hover:text-white");
        btn.textContent = cat === "all" ? "🚀 All Masterpieces" : cat;
        
        btn.addEventListener("click", () => {
            document.querySelectorAll("#filter-container button").forEach(b => {
                b.className = "w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition text-gray-400 hover:bg-gray-800/50 hover:text-white capitalize cursor-pointer";
            });
            btn.className = "w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white capitalize cursor-pointer";
            categoryTitle.textContent = cat === "all" ? "All Masterpieces" : `${cat} Showroom`;
            renderShowroom(cat === "all" ? showroomData : showroomData.filter(item => item.category === cat));
        });
        filterContainer.appendChild(btn);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderShowroom(showroomData);
    setupFilters();
});


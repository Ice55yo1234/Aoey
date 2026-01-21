const pages = [
    {
        title: "แด่คนเก่งของเค้า",
        content: "วันนี้เป็นวันสำคัญของเธอ... เค้ามีอะไรจะบอก เปิดอ่านทีละหน้านะ",
        icon: "star",
        color: "from-pink-400 to-rose-500",
        iconColor: "text-yellow-400"
    },
    {
        title: "ความพยายามของเธอ",
        content: "เค้าเห็นนะว่าเธอตั้งใจแค่ไหน เธอก้าวข้ามผ่านทุกความเหนื่อยล้ามาจนถึงวันนี้ได้ มันสุดยอดมากเลยนะ",
        icon: "trophy",
        color: "from-rose-400 to-pink-500",
        iconColor: "text-yellow-500"
    },
    {
        title: "ไม่ต้องกังวลเรื่องผลลัพธ์",
        content: "ไม่ว่าวันนี้จะได้ที่เท่าไหร่ เธอก็ทำดีที่สุดแล้ว ผลการแข่งขันเป็นแค่ตัวเลข แต่ความเก่งของเธอน่ะ 'ของจริง'",
        icon: "heart",
        color: "from-pink-500 to-rose-600",
        iconColor: "text-red-500"
    },
    {
        title: "ความภูมิใจของเค้า",
        content: "อยากบอกว่าเค้าภูมิใจในตัวเธอมากที่สุดเลยนะ ขอบคุณที่พยายามอย่างหนักเพื่อความฝันของตัวเองนะคนดี",
        icon: "star",
        color: "from-rose-500 to-red-500",
        iconColor: "text-white"
    }
];

let currentPage = 0;
let userMessage = "";

const book = document.getElementById('book');
const pageTitle = document.getElementById('page-title');
const pageBody = document.getElementById('page-body');
const pageHeader = document.getElementById('page-header');
const iconContainer = document.getElementById('icon-container');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const dotsContainer = document.getElementById('dots-container');

// ฟังก์ชันสำหรับสร้างหน้ากรอกความรู้สึก (Comment Section)
function showCommentPage() {
    document.getElementById('book-container').classList.add('hidden');
    
    // สร้าง UI สำหรับกรอกข้อความ
    const commentHTML = `
        <div id="comment-page" class="flex flex-col items-center space-y-4 animate-in fade-in zoom-in duration-700 w-full">
            <div class="relative mb-4">
                <i data-lucide="heart" class="text-[#ff4d6d] w-16 h-16 fill-current animate-bounce"></i>
            </div>
            
            <div class="text-center space-y-4 w-full bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white">
                <h1 class="text-2xl font-black text-[#c9184a]">เก่งที่สุดเลยนะ! ❤️</h1>
                <p class="text-sm text-gray-700 font-bold italic">"ภูมิใจในตัวเธอเสมอ... พิมพ์บอกความรู้สึกหน่อยนะ"</p>
                
                <textarea id="user-comment" placeholder="พิมพ์ความรู้สึกตรงนี้เลย..." 
                    class="w-full h-24 p-4 rounded-2xl border-2 border-rose-100 focus:border-rose-400 focus:ring-0 resize-none outline-none bg-white text-gray-700 shadow-inner text-sm"></textarea>
                
                <button id="send-btn" class="w-full bg-rose-500 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-rose-600 transition-all active:scale-95 flex items-center justify-center space-x-2">
                    <i data-lucide="send" class="w-4 h-4"></i>
                    <span>ส่งความรู้สึก</span>
                </button>
            </div>
        </div>
    `;
    
    const appContainer = document.getElementById('app');
    appContainer.insertAdjacentHTML('beforeend', commentHTML);
    initIcons();

    // ปุ่มส่งข้อความ
    document.getElementById('send-btn').addEventListener('click', () => {
        userMessage = document.getElementById('user-comment').value;
        if (userMessage.trim() === "") return;
        
        document.getElementById('comment-page').remove();
        showFinalScreen();
    });
}

// หน้าสุดท้าย
function showFinalScreen() {
    // อัปเดตรูปภาพใน HTML ของหน้าสุดท้ายตามชื่อไฟล์ที่ระบุมา
    const successScreen = document.getElementById('success-screen');
    const images = successScreen.querySelectorAll('img');
    if (images.length >= 2) {
        images[0].src = "ff45cbc0-b8e8-46c1-97c6-608b750c6ec1.jpg";
        images[1].src = "8e2a1b07-7ce9-4d24-bbc0-e8b6e9ac056e.jpg";
    }

    document.getElementById('final-message').innerText = `"${userMessage}"`;
    document.getElementById('success-screen').classList.remove('hidden');
    initIcons();
}

// Initialize Lucide Icons
function initIcons() {
    if (window.lucide) {
        lucide.createIcons();
    }
}

// Background Hearts
function createFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart text-rose-300 opacity-20';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 12 + 6) + 's';
        heart.style.animationDelay = (Math.random() * 5) + 's';
        heart.innerHTML = `<i data-lucide="heart" style="width: ${Math.random() * 30 + 15}px;"></i>`;
        container.appendChild(heart);
    }
    initIcons();
}

// Update Page UI
function updatePage(direction) {
    const page = pages[currentPage];
    
    // Add Animation
    book.classList.add(direction === 'next' ? 'flip-exit' : 'flip-enter');
    
    setTimeout(() => {
        // Update Content
        pageTitle.innerText = page.title;
        pageBody.innerText = page.content;
        pageHeader.className = `h-40 bg-gradient-to-br ${page.color} flex items-center justify-center relative overflow-hidden`;
        iconContainer.innerHTML = `<i data-lucide="${page.icon}" class="${page.iconColor} w-12 h-12 fill-current"></i>`;
        
        // Update Dots
        renderDots();
        initIcons();
        
        // Reset Buttons
        prevBtn.classList.toggle('text-gray-200', currentPage === 0);
        prevBtn.classList.toggle('cursor-not-allowed', currentPage === 0);
        prevBtn.classList.toggle('text-rose-400', currentPage !== 0);
        
        // Remove Animation
        book.classList.remove(direction === 'next' ? 'flip-exit' : 'flip-enter');
    }, 300);
}

function renderDots() {
    dotsContainer.innerHTML = '';
    pages.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `h-2 rounded-full transition-all duration-500 ${currentPage === i ? 'bg-rose-500 w-8' : 'bg-gray-200 w-2'}`;
        dotsContainer.appendChild(dot);
    });
}

// Event Listeners
nextBtn.addEventListener('click', () => {
    if (currentPage < pages.length - 1) {
        currentPage++;
        updatePage('next');
    } else {
        showCommentPage();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        updatePage('prev');
    }
});

document.getElementById('reset-btn').addEventListener('click', () => {
    currentPage = 0;
    userMessage = "";
    document.getElementById('success-screen').classList.add('hidden');
    document.getElementById('book-container').classList.remove('hidden');
    updatePage('prev');
});

// Start
window.onload = () => {
    createFloatingHearts();
    renderDots();
    initIcons();
};
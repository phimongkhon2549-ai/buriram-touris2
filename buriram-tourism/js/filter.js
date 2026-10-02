/**
 * ศูนย์รวมข้อมูลท่องเที่ยวชุมชนจังหวัดบุรีรัมย์ (Buriram Community Tourism)
 * Attractions Listing: Live Search, Category Filters, Sorting & Detail Modal
 */

// ฐานข้อมูลชุมชนท่องเที่ยวบุรีรัมย์ (Buriram Community Tourism Database)
const BURIRAM_COMMUNITIES = [
  {
    id: 'charoen-suk',
    name: 'ชุมชนบ้านเจริญสุข',
    district: 'อ.เฉลิมพระเกียรติ',
    category: 'craft',
    categoryName: 'หัตถกรรมและผ้าไหม',
    tag: 'ผ้าภูอัคนี ดินภูเขาไฟ',
    rating: 4.9,
    reviews: 148,
    image: 'assets/images/charoen-suk-volcano-silk.svg',
    highlight: 'ผ้าภูอัคนี ย้อมดินภูเขาไฟอังคารโบราณหนึ่งเดียวในไทย',
    desc: 'สัมผัสภูมิปัญญาการนำดินภูเขาไฟอังคารที่ดับสนิทแล้วมาย้อมผ้าไหมและผ้าฝ้าย ได้เฉดสีส้มอิฐอบอุ่นเป็นเอกลักษณ์ ชิมอาหารพื้นบ้านพาแลง และพักผ่อนโฮมสเตย์ริมเขา',
    phone: '089-625-5464',
    location: 'ต.เจริญสุข อ.เฉลิมพระเกียรติ จ.บุรีรัมย์',
    activities: ['ทดลองย้อมผ้าภูอัคนีด้วยตนเอง', 'ชมศูนย์ทอผ้าไหมลายโบราณ', 'นั่งรถอีแต๋นชมภูเขาไฟอังคาร', 'รับประทานขันโตกพาแลง']
  },
  {
    id: 'sanuan-nok',
    name: 'ชุมชนท่องเที่ยวบ้านสนวนนอก',
    district: 'อ.ห้วยราช',
    category: 'culture',
    categoryName: 'วัฒนธรรมและวิถีชีวิต',
    tag: 'ไหมสาวโบราณ รถอีแต๋น',
    rating: 4.8,
    reviews: 195,
    image: 'assets/images/sanuan-nok-silk-village.svg',
    highlight: 'นั่งรถอีแต๋น สัมผัสวิถีสาวไหมโบราณ ลิ้มรสดักแด้ทรงเครื่อง',
    desc: 'หมู่บ้านท่องเที่ยววิถีวัฒนธรรมเขมรโบราณ ชมการปลูกหม่อนเลี้ยงไหมแบบครบวงจร สาวไหมเส้นทองด้วยมือ ทอผ้าหางกระรอกคู่ และนั่งรถอีแต๋นสัมผัสทุ่งนาอันเงียบสงบ',
    phone: '080-602-4468',
    location: 'ต.สนวน อ.ห้วยราช จ.บุรีรัมย์',
    activities: ['สาธิตการสาวไหมเส้นทองโบราณ', 'นั่งรถอีแต๋นชมธรรมชาติชุมชน', 'ชิมดักแด้ทอดสมุนไพรและแกงไก่บ้านใส่กล้วย', 'เลือกซื้อผ้าไหมหางกระรอก']
  },
  {
    id: 'kok-mueang',
    name: 'ชุมชนบ้านโคกเมือง',
    district: 'อ.ประโคนชัย',
    category: 'history',
    categoryName: 'ประวัติศาสตร์และอารยธรรม',
    tag: 'อารยธรรมขอม ปราสาทเมืองต่ำ',
    rating: 4.9,
    reviews: 215,
    image: 'assets/images/kok-mueang-ancient-village.svg',
    highlight: 'ชุมชนใต้เงาปราสาทเมืองต่ำ ทอเสื่อกกลายขอมโบราณ',
    desc: 'หมู่บ้านท่องเที่ยวที่ตั้งอยู่เคียงข้างปราสาทหินเมืองต่ำ อายุกว่าพันปี สัมผัสวิถีชีวิตชาวไทย-กวย ทอเสื่อกกย้อมสีธรรมชาติ และปั่นจักรยานชมสระน้ำบารายโบราณ',
    phone: '088-581-2234',
    location: 'ต.จรเข้มาก อ.ประโคนชัย จ.บุรีรัมย์',
    activities: ['ปั่นจักรยานรอบบารายโบราณพันปี', 'ทดลองทอเสื่อกกลายปราสาทเมืองต่ำ', 'ชิมข้าวต้มมัดใบกะพ้อโบราณ', 'พักโฮมสเตย์มาตรฐาน CBT']
  },
  {
    id: 'nong-ta-kai',
    name: 'ชุมชนบ้านหนองตาไก้',
    district: 'อ.นางรอง',
    category: 'agro',
    categoryName: 'เกษตรและธรรมชาติ',
    tag: 'ข้าวเม่าโบราณ เกษตรอินทรีย์',
    rating: 4.7,
    reviews: 110,
    image: 'assets/images/nong-ta-kai-agro-village.svg',
    highlight: 'ตำข้าวเม่าโบราณสดจากรวง ชิมขาหมูนางรองต้นตำรับ',
    desc: 'เรียนรู้วิถีเกษตรอินทรีย์และการแปรรูปข้าวเม่าแบบดั้งเดิม ตั้งแต่การคั่ว การตำด้วยครกกระเดื่องโบราณ พร้อมกิจกรรมเก็บผักสวนครัวปลอดสารพิษปรุงอาหารพื้นถิ่น',
    phone: '081-977-3312',
    location: 'ต.หนองกง อ.นางรอง จ.บุรีรัมย์',
    activities: ['ร่วมตำข้าวเม่าสดด้วยครกกระเดื่อง', 'ทำขนมต้มโบราณรสชาติดั้งเดิม', 'ชมแปลงเกษตรอินทรีย์ผสมผสาน', 'ชิมขาหมูนางรองและผักพื้นบ้าน']
  },
  {
    id: 'khao-kradong',
    name: 'ชุมชนวนอุทยานเขากระโดง',
    district: 'อ.เมืองบุรีรัมย์',
    category: 'agro',
    categoryName: 'เกษตรและธรรมชาติ',
    tag: 'ธรณีวิทยา ภูเขาไฟดับสนิท',
    rating: 4.8,
    reviews: 320,
    image: 'assets/images/khao-kradong-volcano-forest.svg',
    highlight: 'ปากปล่องภูเขาไฟ สะพานแขวนลาวา นมัสการพระสุภัทรบพิตร',
    desc: 'แหล่งท่องเที่ยวเชิงนิเวศและธรณีวิทยาบนยอดภูเขาไฟที่ดับสนิทแล้ว ชมทิวทัศน์เมืองบุรีรัมย์แบบพาโนรามา ข้ามสะพานแขวนชมปากปล่องลาวา และผลิตภัณฑ์หินภูเขาไฟบำรุงดิน',
    phone: '044-637-299',
    location: 'ต.เสม็ด อ.เมือง จ.บุรีรัมย์',
    activities: ['เดินข้ามสะพานแขวนปากปล่องภูเขาไฟ', 'กราบสักการะพระสุภัทรบพิตรคู่บ้านคู่เมือง', 'เดินศึกษาเส้นทางพรรณไม้ภูเขาไฟ', 'ชมพระอาทิตย์อัสดงเหนือเมืองบุรีรัมย์']
  },
  {
    id: 'sai-yao',
    name: 'ชุมชนบ้านสายยาว',
    district: 'อ.เฉลิมพระเกียรติ',
    category: 'culture',
    categoryName: 'วัฒนธรรมและวิถีชีวิต',
    tag: 'ชาติพันธุ์กวย ดนตรีกันตรึม',
    rating: 4.8,
    reviews: 132,
    image: 'assets/images/sai-yao-cultural-village.svg',
    highlight: 'สืบสานเสียงดนตรีกันตรึมโบราณ หัตถศิลป์แกะสลักหินทราย',
    desc: 'ชุมชนชาติพันธุ์กวยและเขมรโบราณที่อนุรักษ์ดนตรีพื้นบ้านกันตรึมอย่างเหนียวแน่น เรียนรู้งานแกะสลักหินทรายเลียนแบบโบราณสถาน และชิมแกงเลียงกวยรสเข้มข้น',
    phone: '086-248-9901',
    location: 'ต.ยายแย้มวัฒนา อ.เฉลิมพระเกียรติ จ.บุรีรัมย์',
    activities: ['ฟังและชมการแสดงดนตรีกันตรึมสด', 'ทดลองแกะสลักลวดลายบนหินทราย', 'ชิมอาหารพื้นถิ่นชนเผ่ากวย', 'ไหว้ศาลปะกำช้างโบราณ']
  }
];

let currentCategory = 'all';
let currentSearchQuery = '';
let currentSort = 'popular';

document.addEventListener('DOMContentLoaded', () => {
  initAttractionFilters();
  initDetailModal();
});

/**
 * ฟังก์ชันที่ 3: ระบบค้นหาและกรองข้อมูลแหล่งท่องเที่ยวชุมชน (Search & Filter)
 */
function initAttractionFilters() {
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const categoryBtns = document.querySelectorAll('.category-filter-btn');
  const sortSelect = document.getElementById('sort-select');
  const resetFiltersBtn = document.getElementById('reset-filters-btn');

  // 1. ค้นหาแบบ Real-time ด้วย Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.trim().toLowerCase();
      if (clearSearchBtn) {
        clearSearchBtn.classList.toggle('hidden', currentSearchQuery === '');
      }
      renderFilteredCommunities();
    });

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        currentSearchQuery = '';
        clearSearchBtn.classList.add('hidden');
        renderFilteredCommunities();
        searchInput.focus();
      });
    }
  }

  // 2. กรองตามหมวดหมู่ (Category Buttons)
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => {
        b.classList.remove('bg-amber-600', 'text-white', 'shadow-sm');
        b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-200');
        b.setAttribute('aria-pressed', 'false');
      });

      btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-200');
      btn.classList.add('bg-amber-600', 'text-white', 'shadow-sm');
      btn.setAttribute('aria-pressed', 'true');

      currentCategory = btn.getAttribute('data-category');
      renderFilteredCommunities();
    });
  });

  // 3. เรียงลำดับข้อมูล (Sort Select)
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderFilteredCommunities();
    });
  }

  // 4. ปุ่มล้างตัวกรองทั้งหมด
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', resetAllFilters);
  }

  // แสดงผลเริ่มต้น
  renderFilteredCommunities();
}

function resetAllFilters() {
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const sortSelect = document.getElementById('sort-select');
  const defaultCategoryBtn = document.querySelector('.category-filter-btn[data-category="all"]');

  if (searchInput) searchInput.value = '';
  if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
  if (sortSelect) sortSelect.value = 'popular';

  currentSearchQuery = '';
  currentCategory = 'all';
  currentSort = 'popular';

  if (defaultCategoryBtn) {
    defaultCategoryBtn.click();
  } else {
    renderFilteredCommunities();
  }
}

function renderFilteredCommunities() {
  const grid = document.getElementById('attractions-grid');
  const countBadge = document.getElementById('result-count');
  const emptyState = document.getElementById('empty-state');
  if (!grid) return;

  // กรองข้อมูลตามคำค้นหาและหมวดหมู่
  let filtered = BURIRAM_COMMUNITIES.filter(item => {
    const matchesCategory = (currentCategory === 'all' || item.category === currentCategory);
    const matchesSearch = currentSearchQuery === '' ||
      item.name.toLowerCase().includes(currentSearchQuery) ||
      item.district.toLowerCase().includes(currentSearchQuery) ||
      item.tag.toLowerCase().includes(currentSearchQuery) ||
      item.desc.toLowerCase().includes(currentSearchQuery) ||
      item.highlight.toLowerCase().includes(currentSearchQuery);

    return matchesCategory && matchesSearch;
  });

  // เรียงลำดับข้อมูล
  if (currentSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (currentSort === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name, 'th'));
  } else if (currentSort === 'reviews') {
    filtered.sort((a, b) => b.reviews - a.reviews);
  }

  // อัปเดตตัวเลขนับจำนวน
  if (countBadge) {
    countBadge.textContent = `พบ ${filtered.length} แหล่งท่องเที่ยวชุมชน`;
  }

  // แสดง Empty State หากไม่พบข้อมูล
  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  // สร้างการ์ดแสดงผลด้วย Grid & Flexbox
  grid.innerHTML = filtered.map(item => `
    <article class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm overflow-hidden flex flex-col card-hover-effect focus-within:ring-2 focus-within:ring-amber-500">
      <div class="relative h-56 img-zoom-container bg-slate-100 dark:bg-slate-700">
        <img src="${item.image}" alt="${item.name} ${item.district} จังหวัดบุรีรัมย์" class="w-full h-full object-cover" loading="lazy" />
        <span class="absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full bg-white/95 dark:bg-slate-900/90 text-amber-700 dark:text-amber-400 backdrop-blur shadow-sm">
          ${item.tag}
        </span>
        <div class="absolute bottom-3 right-4 px-2.5 py-1 rounded-full bg-slate-950/70 text-white text-xs font-medium flex items-center gap-1 backdrop-blur">
          <i class="fa-solid fa-star text-amber-400 text-[10px]"></i>
          <span>${item.rating}</span>
          <span class="text-slate-300">(${item.reviews})</span>
        </div>
      </div>

      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span class="flex items-center gap-1.5"><i class="fa-solid fa-location-dot text-amber-600"></i> ${item.district}</span>
            <span class="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">${item.categoryName}</span>
          </div>
          <h3 class="text-xl font-bold font-heading text-slate-900 dark:text-white mb-2 leading-snug">
            ${item.name}
          </h3>
          <p class="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2 line-clamp-1">
            <i class="fa-solid fa-sparkles"></i> ${item.highlight}
          </p>
          <p class="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
            ${item.desc}
          </p>
        </div>

        <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-3">
          <a href="tel:${item.phone.replace(/-/g, '')}" class="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-amber-600 flex items-center gap-1.5">
            <i class="fa-solid fa-phone text-emerald-600"></i> ${item.phone}
          </a>
          <button type="button" onclick="openDetailModal('${item.id}')" class="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition shadow-sm focus-visible:outline-amber-500">
            ดูรายละเอียด <i class="fa-solid fa-arrow-right text-[10px] ml-1"></i>
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

/**
 * Modal แสดงรายละเอียดชุมชนอย่างเจาะลึก
 */
function initDetailModal() {
  const modal = document.getElementById('community-modal');
  const closeBtn = document.getElementById('close-modal-btn');
  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

function openDetailModal(id) {
  const item = BURIRAM_COMMUNITIES.find(c => c.id === id);
  const modal = document.getElementById('community-modal');
  const content = document.getElementById('modal-body-content');
  if (!item || !modal || !content) return;

  content.innerHTML = `
    <div class="relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-6">
      <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6">
        <span class="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500 text-white w-fit mb-2">${item.tag}</span>
        <h3 class="text-2xl font-bold font-heading text-white">${item.name}</h3>
        <p class="text-sm text-slate-200"><i class="fa-solid fa-location-dot text-amber-400"></i> ${item.location}</p>
      </div>
    </div>

    <div class="space-y-4 text-slate-700 dark:text-slate-300">
      <div>
        <h4 class="font-bold text-slate-900 dark:text-white font-heading mb-1 text-base">จุดเด่นและอัตลักษณ์ชุมชน</h4>
        <p class="text-sm leading-relaxed">${item.desc}</p>
      </div>

      <div>
        <h4 class="font-bold text-slate-900 dark:text-white font-heading mb-2 text-base">กิจกรรมท่องเที่ยวแนะนำ</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          ${item.activities.map(act => `
            <div class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-xs font-medium">
              <i class="fa-solid fa-circle-check text-amber-500"></i> ${act}
            </div>
          `).join('')}
        </div>
      </div>

      <div class="pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span class="text-xs text-slate-500 dark:text-slate-400 block">ติดต่อประสานงานชุมชน</span>
          <span class="text-sm font-bold text-slate-900 dark:text-white">${item.phone}</span>
        </div>
        <div class="flex gap-2">
          <a href="contact.html" class="px-4 py-2 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 rounded-xl hover:bg-amber-100 transition">
            สอบถามการเดินทาง
          </a>
          <a href="tel:${item.phone.replace(/-/g, '')}" class="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition shadow-sm">
            <i class="fa-solid fa-phone mr-1"></i> โทรติดต่อชุมชน
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('community-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
}

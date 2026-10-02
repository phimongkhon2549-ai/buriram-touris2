/**
 * ศูนย์รวมข้อมูลท่องเที่ยวชุมชนจังหวัดบุรีรัมย์ (Buriram Community Tourism)
 * Main JavaScript: Theme Mode Switcher, Mobile Navigation, Accessibility
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initBackToTop();
  highlightActiveNav();
});

/**
 * ฟังก์ชันที่ 1: สลับโหมดสว่าง/มืด (Light/Dark Mode) พร้อมบันทึกลง localStorage
 */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('buriram_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // ตรวจสอบค่าที่เคยบันทึกไว้ หรือการตั้งค่าของระบบ
  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    updateThemeIcons(true);
  } else {
    document.documentElement.classList.remove('dark');
    updateThemeIcons(false);
  }

  // ผูก Event ให้กับปุ่มสลับธีมทุกจุดบนหน้าเว็บ
  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', toggleThemeMode);
  });
}

function toggleThemeMode() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('buriram_theme', isDark ? 'dark' : 'light');
  updateThemeIcons(isDark);
  
  // แจ้งเตือนผู้ใช้สำหรับ Screen Reader (Accessibility)
  const announcer = document.getElementById('a11y-announcer');
  if (announcer) {
    announcer.textContent = isDark ? 'เปลี่ยนเป็นโหมดกลางคืนแล้ว' : 'เปลี่ยนเป็นโหมดสว่างแล้ว';
  }
}

function updateThemeIcons(isDark) {
  const icons = document.querySelectorAll('.theme-toggle-icon');
  const texts = document.querySelectorAll('.theme-toggle-text');
  
  icons.forEach(icon => {
    if (isDark) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun', 'text-amber-400');
    } else {
      icon.classList.remove('fa-sun', 'text-amber-400');
      icon.classList.add('fa-moon', 'text-slate-600');
    }
  });

  texts.forEach(text => {
    text.textContent = isDark ? 'โหมดสว่าง' : 'โหมดกลางคืน';
  });
}

/**
 * ฟังก์ชันที่ 2: ควบคุมเมนูมือถือ (Hamburger Mobile Navigation Menu)
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('mobile-menu-icon');
  
  if (!menuBtn || !mobileMenu) return;

  function toggleMenu() {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    const nextState = !isExpanded;
    
    menuBtn.setAttribute('aria-expanded', String(nextState));
    
    if (nextState) {
      mobileMenu.classList.remove('hidden');
      if (menuIcon) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-xmark');
      }
    } else {
      mobileMenu.classList.add('hidden');
      if (menuIcon) {
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
      }
    }
  }

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // ปิดเมนูเมื่อคลิกนอกพื้นที่
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      if (menuBtn.getAttribute('aria-expanded') === 'true') {
        toggleMenu();
      }
    }
  });

  // ปิดเมนูเมื่อกดปุ่ม Escape บนแป้นพิมพ์
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
      toggleMenu();
      menuBtn.focus();
    }
  });
}

/**
 * ฟังก์ชันปุ่มเลื่อนกลับขึ้นด้านบน (Back to Top)
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.add('opacity-100', 'translate-y-0');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * ไฮไลท์เมนูที่กำลังเปิดอยู่ (Active State)
 */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('text-amber-500', 'dark:text-amber-400', 'font-semibold', 'border-b-2', 'border-amber-500');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('border-b-2', 'border-amber-500');
      link.removeAttribute('aria-current');
    }
  });
}

/**
 * ศูนย์รวมข้อมูลท่องเที่ยวชุมชนจังหวัดบุรีรัมย์ (Buriram Community Tourism)
 * Open-Meteo Weather API Integration
 * พิกัดจังหวัดบุรีรัมย์: ละติจูด 14.9951, ลองจิจูด 103.1029
 */

const BURIRAM_COORDS = {
  lat: 14.9951,
  lon: 103.1029,
  name: 'จังหวัดบุรีรัมย์'
};

/**
 * แผนที่รหัสสภาพอากาศ WMO Weather Code เป็นภาษาไทยและไอคอน Font Awesome
 */
function interpretWeatherCode(code) {
  switch (code) {
    case 0:
      return {
        text: 'ท้องฟ้าแจ่มใส แดดจัด',
        icon: 'fa-sun text-amber-500',
        advice: 'ทัศนวิสัยดีเยี่ยม เหมาะอย่างยิ่งสำหรับเดินชมปราสาทหินและกิจกรรมกลางแจ้ง',
        color: 'from-amber-500/10 to-orange-500/10'
      };
    case 1:
    case 2:
      return {
        text: 'ท้องฟ้าโปร่ง มีเมฆเล็กน้อย',
        icon: 'fa-cloud-sun text-amber-400',
        advice: 'อากาศโปร่งสบาย เหมาะกับการนั่งรถอีแต๋นท่องเที่ยวตามหมู่บ้าน',
        color: 'from-sky-500/10 to-amber-500/10'
      };
    case 3:
      return {
        text: 'มีเมฆเป็นส่วนมาก',
        icon: 'fa-cloud text-slate-400',
        advice: 'แดดไม่แรง อากาศกำลังดี ถ่ายรูปสวย และท่องเที่ยวชุมชนได้ตลอดวัน',
        color: 'from-slate-500/10 to-sky-500/10'
      };
    case 45:
    case 48:
      return {
        text: 'มีหมอกในตอนเช้า',
        icon: 'fa-smog text-slate-400',
        advice: 'ทัศนวิสัยช่วงเช้ามีหมอกบาง ควรขับขี่ระมัดระวัง วิวบนยอดเขากระโดงสวยงาม',
        color: 'from-slate-400/10 to-indigo-500/10'
      };
    case 51:
    case 53:
    case 55:
    case 61:
    case 63:
    case 65:
      return {
        text: 'มีฝนตกโปรยปราย/ปานกลาง',
        icon: 'fa-cloud-rain text-blue-500',
        advice: 'แนะนำกิจกรรมในร่ม เช่น การชมทอผ้าไหมภูอัคนี การย้อมสีธรรมชาติ และทำอาหารพื้นบ้าน',
        color: 'from-blue-500/10 to-cyan-500/10'
      };
    case 80:
    case 81:
    case 82:
      return {
        text: 'มีฝนตกหนักเป็นบางแห่ง',
        icon: 'fa-cloud-showers-heavy text-blue-600',
        advice: 'ควรพกร่มหรือเสื้อกันฝนติดตัวขณะท่องเที่ยวตามชุมชน',
        color: 'from-blue-600/10 to-slate-600/10'
      };
    case 95:
    case 96:
    case 99:
      return {
        text: 'มีพายุฝนฟ้าคะนอง',
        icon: 'fa-cloud-bolt text-purple-500',
        advice: 'ควรหลีกเลี่ยงกิจกรรมกลางแจ้งชั่วคราว และพักผ่อนในโฮมสเตย์หรือศูนย์การเรียนรู้',
        color: 'from-purple-500/10 to-blue-600/10'
      };
    default:
      return {
        text: 'สภาพอากาศตามฤดูกาล',
        icon: 'fa-cloud-sun text-amber-500',
        advice: 'พร้อมต้อนรับนักท่องเที่ยวสู่ชุมชนบุรีรัมย์',
        color: 'from-amber-500/10 to-sky-500/10'
      };
  }
}

/**
 * ฟังก์ชันหลัก: ดึงข้อมูลสภาพอากาศแบบ Real-time จาก Open-Meteo
 * รองรับ Loading State และ Error Handling
 */
async function loadBuriramWeather(containerId, isCompact = false) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // 1. แสดง Loading State (Skeleton Placeholder)
  renderLoadingState(container, isCompact);

  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${BURIRAM_COORDS.lat}&longitude=${BURIRAM_COORDS.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FBangkok`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`การเชื่อมต่อเซิร์ฟเวอร์สภาพอากาศล้มเหลว (รหัสสถานะ: ${response.status})`);
    }

    const data = await response.json();
    
    // 2. แสดงผลข้อมูลสำเร็จ (Success State)
    if (isCompact) {
      renderCompactWeather(container, data);
    } else {
      renderFullWeather(container, data);
    }
  } catch (error) {
    console.error('Weather API Error:', error);
    // 3. จัดการกรณีเกิดข้อผิดพลาด (Error Handling State) พร้อมปุ่ม Retry
    renderErrorState(container, error.message, () => loadBuriramWeather(containerId, isCompact));
  }
}

function renderLoadingState(container, isCompact) {
  if (isCompact) {
    container.innerHTML = `
      <div class="p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 animate-pulse">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-full skeleton-box"></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 w-3/4 rounded skeleton-box"></div>
            <div class="h-3 w-1/2 rounded skeleton-box"></div>
          </div>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 animate-pulse space-y-6">
        <div class="flex justify-between items-center">
          <div class="h-6 w-48 rounded skeleton-box"></div>
          <div class="h-6 w-24 rounded skeleton-box"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="h-24 rounded-2xl skeleton-box"></div>
          <div class="h-24 rounded-2xl skeleton-box"></div>
          <div class="h-24 rounded-2xl skeleton-box"></div>
        </div>
      </div>
    `;
  }
}

function renderErrorState(container, errorMessage, retryCallback) {
  container.innerHTML = `
    <div class="p-6 rounded-3xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-center space-y-3">
      <div class="text-3xl"><i class="fa-solid fa-triangle-exclamation text-rose-500"></i></div>
      <h3 class="font-heading font-semibold text-lg">ไม่สามารถโหลดข้อมูลสภาพอากาศได้</h3>
      <p class="text-sm font-sans opacity-90">${errorMessage || 'กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ตของท่าน'}</p>
      <button id="retry-weather-btn" class="mt-2 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition shadow-sm focus-visible:outline-rose-500">
        <i class="fa-solid fa-rotate-right"></i> ลองใหม่อีกครั้ง
      </button>
    </div>
  `;

  const retryBtn = container.querySelector('#retry-weather-btn');
  if (retryBtn) {
    retryBtn.addEventListener('click', retryCallback);
  }
}

function renderCompactWeather(container, data) {
  const current = data.current;
  const weather = interpretWeatherCode(current.weather_code);

  container.innerHTML = `
    <div class="flex items-center justify-between p-4 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition">
      <div class="flex items-center gap-3">
        <div class="text-3xl"><i class="fa-solid ${weather.icon}"></i></div>
        <div>
          <div class="flex items-baseline gap-1">
            <span class="text-2xl font-bold font-heading text-slate-800 dark:text-white">${Math.round(current.temperature_2m)}°C</span>
            <span class="text-xs text-slate-500 dark:text-slate-400">จ.บุรีรัมย์</span>
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-300 font-medium">${weather.text}</p>
        </div>
      </div>
      <a href="attractions.html#weather-section" class="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1">
        พยากรณ์ <i class="fa-solid fa-arrow-right text-[10px]"></i>
      </a>
    </div>
  `;
}

function renderFullWeather(container, data) {
  const current = data.current;
  const daily = data.daily;
  const weather = interpretWeatherCode(current.weather_code);

  const dayNames = ['วันนี้', 'พรุ่งนี้', 'มะรืนนี้'];
  let forecastHtml = '';

  for (let i = 0; i < Math.min(3, daily.time.length); i++) {
    const dayCode = daily.weather_code[i];
    const dayWeather = interpretWeatherCode(dayCode);
    const maxT = Math.round(daily.temperature_2m_max[i]);
    const minT = Math.round(daily.temperature_2m_min[i]);

    forecastHtml += `
      <div class="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex flex-col items-center text-center">
        <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">${dayNames[i] || daily.time[i]}</span>
        <i class="fa-solid ${dayWeather.icon} text-2xl my-2"></i>
        <span class="text-xs text-slate-700 dark:text-slate-200 line-clamp-1">${dayWeather.text}</span>
        <div class="mt-2 text-sm font-bold text-slate-800 dark:text-white">
          ${maxT}° <span class="text-xs font-normal text-slate-400">/ ${minT}°C</span>
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/10 via-sky-500/5 to-indigo-500/10 dark:from-slate-800 dark:to-slate-900 border border-amber-500/20 dark:border-slate-700 p-6 md:p-8 shadow-sm">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-700 dark:text-amber-300 mb-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500 pulse-indicator"></span>
            Open-Meteo Realtime API
          </div>
          <h2 class="text-xl md:text-2xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
            <i class="fa-solid fa-cloud-sun text-amber-500"></i> สภาพอากาศและการท่องเที่ยววันนี้ในบุรีรัมย์
          </h2>
        </div>
        <button id="refresh-weather-btn" title="อัปเดตสภาพอากาศล่าสุด" class="px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center gap-2 shadow-sm">
          <i class="fa-solid fa-rotate"></i> อัปเดตข้อมูล
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        <!-- อุณหภูมิหลัก -->
        <div class="flex items-center gap-5 p-5 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <div class="text-5xl"><i class="fa-solid ${weather.icon}"></i></div>
          <div>
            <div class="text-4xl font-extrabold font-heading text-slate-900 dark:text-white">${Math.round(current.temperature_2m)}°C</div>
            <div class="text-sm font-semibold text-slate-700 dark:text-slate-200">${weather.text}</div>
            <div class="text-xs text-slate-500 dark:text-slate-400 mt-1">อ.เมืองบุรีรัมย์ และชุมชนโดยรอบ</div>
          </div>
        </div>

        <!-- รายละเอียดความชื้นและลม -->
        <div class="grid grid-cols-2 gap-3">
          <div class="p-4 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 shadow-sm text-center">
            <div class="text-sky-500 text-xl mb-1"><i class="fa-solid fa-droplet"></i></div>
            <div class="text-xs text-slate-500 dark:text-slate-400">ความชื้นสัมพัทธ์</div>
            <div class="text-lg font-bold text-slate-800 dark:text-white">${current.relative_humidity_2m}%</div>
          </div>
          <div class="p-4 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 shadow-sm text-center">
            <div class="text-teal-500 text-xl mb-1"><i class="fa-solid fa-wind"></i></div>
            <div class="text-xs text-slate-500 dark:text-slate-400">ความเร็วลม</div>
            <div class="text-lg font-bold text-slate-800 dark:text-white">${current.wind_speed_10m} km/h</div>
          </div>
        </div>

        <!-- คำแนะนำการท่องเที่ยวชุมชนตามสภาพอากาศ -->
        <div class="p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/20 text-slate-800 dark:text-slate-200">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">
            <i class="fa-solid fa-lightbulb"></i> คำแนะนำท่องเที่ยววันนี้
          </div>
          <p class="text-sm leading-relaxed">${weather.advice}</p>
        </div>
      </div>

      <!-- พยากรณ์ 3 วันล่วงหน้า -->
      <div class="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700/60">
        <h3 class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">พยากรณ์ล่วงหน้า 3 วันสำหรับวางแผนเดินทาง</h3>
        <div class="grid grid-cols-3 gap-3 md:gap-4">
          ${forecastHtml}
        </div>
      </div>
    </div>
  `;

  const refreshBtn = container.querySelector('#refresh-weather-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      refreshBtn.querySelector('i').classList.add('fa-spin');
      loadBuriramWeather('weather-container', false).finally(() => {
        if (refreshBtn.querySelector('i')) {
          refreshBtn.querySelector('i').classList.remove('fa-spin');
        }
      });
    });
  }
}

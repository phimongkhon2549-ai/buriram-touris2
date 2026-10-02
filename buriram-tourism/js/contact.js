/**
 * ศูนย์รวมข้อมูลท่องเที่ยวชุมชนจังหวัดบุรีรัมย์ (Buriram Community Tourism)
 * Contact Page: Real-time Form Validation, Submission Modal & FAQ Accordion
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactFormValidation();
  initFaqAccordion();
});

/**
 * ฟังก์ชันที่ 4: ตรวจสอบความถูกต้องของแบบฟอร์ม (Form Validation)
 */
function initContactFormValidation() {
  const form = document.getElementById('tourism-contact-form');
  const successModal = document.getElementById('form-success-modal');
  const closeSuccessBtn = document.getElementById('close-success-btn');
  if (!form) return;

  const fields = {
    name: {
      el: document.getElementById('contact-name'),
      errorEl: document.getElementById('name-error'),
      validate: (val) => {
        if (!val || val.trim().length < 2) return 'กรุณากรอกชื่อ-นามสกุลอย่างน้อย 2 ตัวอักษร';
        return '';
      }
    },
    email: {
      el: document.getElementById('contact-email'),
      errorEl: document.getElementById('email-error'),
      validate: (val) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!val || !emailRegex.test(val.trim())) return 'กรุณากรอกอีเมลให้ถูกต้อง (เช่น name@example.com)';
        return '';
      }
    },
    phone: {
      el: document.getElementById('contact-phone'),
      errorEl: document.getElementById('phone-error'),
      validate: (val) => {
        // รูปแบบเบอร์โทรศัพท์ไทย 9 หรือ 10 หลักขึ้นต้นด้วย 0
        const phoneRegex = /^0[0-9]{8,9}$/;
        const cleanVal = val.replace(/[- ]/g, '');
        if (!cleanVal || !phoneRegex.test(cleanVal)) return 'กรุณากรอกเบอร์โทรศัพท์ 9-10 หลักที่ถูกต้อง (เช่น 0812345678)';
        return '';
      }
    },
    community: {
      el: document.getElementById('contact-community'),
      errorEl: document.getElementById('community-error'),
      validate: (val) => {
        if (!val || val === '') return 'กรุณาเลือกชุมชนหรือเรื่องที่ต้องการติดต่อ';
        return '';
      }
    },
    message: {
      el: document.getElementById('contact-message'),
      errorEl: document.getElementById('message-error'),
      validate: (val) => {
        if (!val || val.trim().length < 10) return 'กรุณาระบุรายละเอียดข้อความอย่างน้อย 10 ตัวอักษร';
        return '';
      }
    }
  };

  // ตรวจสอบความถูกต้องแบบ Real-time เมื่อพิมพ์หรือหลุดโฟกัส (input / blur)
  Object.keys(fields).forEach(key => {
    const item = fields[key];
    if (!item.el) return;

    item.el.addEventListener('blur', () => {
      validateSingleField(item);
    });

    item.el.addEventListener('input', () => {
      // หากเคยมีข้อผิดพลาด ให้ตรวจสอบใหม่อัตโนมัติทันที
      if (item.el.getAttribute('aria-invalid') === 'true') {
        validateSingleField(item);
      }
    });
  });

  function validateSingleField(item) {
    const errorMsg = item.validate(item.el.value);
    if (errorMsg) {
      item.el.classList.add('border-rose-500', 'focus:ring-rose-500');
      item.el.classList.remove('border-slate-300', 'dark:border-slate-600', 'border-emerald-500');
      item.el.setAttribute('aria-invalid', 'true');
      if (item.errorEl) {
        item.errorEl.textContent = errorMsg;
        item.errorEl.classList.remove('hidden');
      }
      return false;
    } else {
      item.el.classList.remove('border-rose-500', 'focus:ring-rose-500');
      item.el.classList.add('border-emerald-500');
      item.el.setAttribute('aria-invalid', 'false');
      if (item.errorEl) {
        item.errorEl.textContent = '';
        item.errorEl.classList.add('hidden');
      }
      return true;
    }
  }

  // ดักจับเหตุการณ์การกดส่งฟอร์ม (Form Submit)
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isAllValid = true;
    let firstInvalidField = null;

    Object.keys(fields).forEach(key => {
      const isValid = validateSingleField(fields[key]);
      if (!isValid) {
        isAllValid = false;
        if (!firstInvalidField) {
          firstInvalidField = fields[key].el;
        }
      }
    });

    if (!isAllValid) {
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
      return;
    }

    // เมื่อข้อมูลถูกต้องทั้งหมด: แสดง Modal ยืนยันข้อมูล
    const formData = {
      name: fields.name.el.value.trim(),
      email: fields.email.el.value.trim(),
      phone: fields.phone.el.value.trim(),
      community: fields.community.el.options[fields.community.el.selectedIndex].text,
      message: fields.message.el.value.trim()
    };

    showSubmissionSuccess(formData);
    form.reset();

    // ล้างสถานะสีเขียวออกจาก input
    Object.keys(fields).forEach(key => {
      const item = fields[key];
      if (item.el) {
        item.el.classList.remove('border-emerald-500');
        item.el.removeAttribute('aria-invalid');
      }
    });
  });

  function showSubmissionSuccess(data) {
    if (!successModal) return;

    const summaryContent = document.getElementById('submission-summary-content');
    if (summaryContent) {
      summaryContent.innerHTML = `
        <div class="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <p><strong class="text-slate-900 dark:text-white">ผู้ส่งข้อมูล:</strong> ${data.name}</p>
          <p><strong class="text-slate-900 dark:text-white">อีเมล:</strong> ${data.email}</p>
          <p><strong class="text-slate-900 dark:text-white">เบอร์โทรศัพท์:</strong> ${data.phone}</p>
          <p><strong class="text-slate-900 dark:text-white">เรื่องที่ติดต่อ:</strong> ${data.community}</p>
          <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-700/60 mt-2">
            <span class="text-xs text-slate-500 dark:text-slate-400 block mb-1">ข้อความของคุณ:</span>
            <p class="italic text-xs">${data.message}</p>
          </div>
        </div>
      `;
    }

    successModal.classList.remove('hidden');
    successModal.classList.add('flex');
  }

  if (closeSuccessBtn && successModal) {
    closeSuccessBtn.addEventListener('click', () => {
      successModal.classList.add('hidden');
      successModal.classList.remove('flex');
    });

    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.add('hidden');
        successModal.classList.remove('flex');
      }
    });
  }
}

/**
 * FAQ Accordion สำหรับคำถามพบบ่อยเกี่ยวกับการท่องเที่ยวชุมชน
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');
    if (!trigger || !answer) return;

    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      
      // ปิดข้ออื่นหากต้องการให้เปิดได้ทีละข้อ
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          const otherIcon = otherItem.querySelector('.faq-icon');
          if (otherTrigger && otherAnswer) {
            otherTrigger.setAttribute('aria-expanded', 'false');
            otherAnswer.classList.add('hidden');
            if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
          }
        }
      });

      trigger.setAttribute('aria-expanded', String(!isExpanded));
      answer.classList.toggle('hidden', isExpanded);
      if (icon) {
        icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
      }
    });
  });
}

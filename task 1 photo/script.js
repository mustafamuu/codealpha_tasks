// 1. إضافة تأثير التحميل للصور (Shimmer Effect)
const imgWraps = document.querySelectorAll('.frame__imgwrap');
imgWraps.forEach(wrap => {
    const img = wrap.querySelector('img');
    if (img) {
        if (img.complete) {
            wrap.classList.add('is-loaded');
        } else {
            img.addEventListener('load', () => {
                wrap.classList.add('is-loaded');
            });
        }
    }
});

// 2. تشغيل الفلاتر (Filters)
const filterChips = document.querySelectorAll('.filter-chip');
const frames = document.querySelectorAll('.frame');

filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
        // إزالة التفعيل من كل الأزرار وإضافته للزر المضغوط
        filterChips.forEach(c => c.classList.remove('is-active'));
        chip.classList.add('is-active');

        const filterValue = chip.getAttribute('data-filter');

        // إخفاء أو إظهار الصور حسب الفلتر
        frames.forEach(frame => {
            if (filterValue === 'all' || frame.getAttribute('data-category') === filterValue) {
                frame.classList.remove('is-hidden');
            } else {
                frame.classList.add('is-hidden');
            }
        });
    });
});

// 3. تشغيل نافذة عرض الصور (Lightbox)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxIndex = document.getElementById('lightbox-index');
const lightboxCategory = document.getElementById('lightbox-category');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtns = [document.getElementById('lightbox-close'), document.getElementById('lightbox-close-bg')];

frames.forEach(frame => {
    frame.addEventListener('click', () => {
        const img = frame.querySelector('img');
        const index = frame.querySelector('.frame__index').innerText;
        const title = frame.querySelector('.frame__title').innerText;
        const category = frame.getAttribute('data-category');

        // نقل بيانات الصورة المصغرة إلى النافذة الكبيرة
        lightboxImg.src = img.src;
        lightboxIndex.innerText = index;
        lightboxCaption.innerText = title;
        lightboxCategory.innerText = category;

        // فتح النافذة
        lightbox.classList.add('is-open');
    });
});

// إغلاق النافذة
closeBtns.forEach(btn => {
    if (btn) {
        btn.addEventListener('click', () => {
            lightbox.classList.remove('is-open');
        });
    }
});
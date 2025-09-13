document.addEventListener('DOMContentLoaded', () => {
    // --- نام فایل انبار DNS ---
    // برنامه همیشه تلاش می‌کنه از این فایل بخونه
    const DNS_LIST_FILE = 'dnslist.txt';

    // --- متغیر برای نگهداری لیست DNS ها ---
    let dnsList = [];

    // --- انتخاب عناصر صفحه ---
    const generateBtn = document.getElementById('generate-btn');
    const dnsResultContainer = document.getElementById('dns-result-container');
    const dnsOutput = document.getElementById('dns-output');
    const copyBtn = document.getElementById('copy-btn');

    // --- توابع برنامه ---

    // این تابع DNS ها رو از فایل txt میخونه و در متغیر dnsList ذخیره می‌کنه
    async function loadDnsList() {
        try {
            // fetch تلاش می‌کنه فایل رو از سرور (حتی سرور محلی) بگیره
            const response = await fetch(DNS_LIST_FILE);
            
            // اگر فایل پیدا نشه یا مشکلی باشه، خطا میده
            if (!response.ok) {
                throw new Error(`فایل dnslist.txt پیدا نشد. مطمئن شوید پروژه روی سرور محلی اجرا شده است.`);
            }

            const text = await response.text();
            
            // هر خط فایل رو به یک جفت DNS تبدیل می‌کنه
            dnsList = text.split('\n')
                          .map(line => line.trim()) // حذف فاصله‌های اضافی
                          .filter(line => line.length > 0 && line.includes(',')) // حذف خطوط خالی و بدون کاما
                          .map(line => {
                              const parts = line.split(',');
                              return { dns1: parts[0].trim(), dns2: parts[1].trim() };
                          });
            
            if (dnsList.length === 0) {
                // اگر فایل وجود داشت ولی محتوای معتبری نداشت
                alert('لیست DNS خالی است یا فرمت آن صحیح نیست. لطفاً فایل dnslist.txt را بررسی کنید.');
                generateBtn.disabled = true;
                generateBtn.textContent = 'انبار DNS خالی است!';
            }

        } catch (error) {
            console.error('خطا در بارگذاری DNS:', error);
            // نمایش خطا به کاربر
            dnsOutput.textContent = `خطا: ${error.message}`;
            dnsResultContainer.classList.remove('hidden');
            generateBtn.disabled = true;
            generateBtn.textContent = 'خطا در بارگذاری!';
        }
    }

    // این تابع یک DNS تصادفی انتخاب و نمایش میده
    function generateDns() {
        if (dnsList.length === 0) {
            alert('انبار DNS خالی است!');
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * dnsList.length);
        const selectedDns = dnsList[randomIndex];

        const formattedDns = `dns1: ${selectedDns.dns1}\ndns2: ${selectedDns.dns2}`;
        
        dnsOutput.textContent = formattedDns;
        dnsResultContainer.classList.remove('hidden');
    }

    // این تابع DNS نمایش داده شده رو کپی می‌کنه
    function copyDnsToClipboard() {
        if (!dnsOutput.textContent) return;
        navigator.clipboard.writeText(dnsOutput.textContent)
            .then(() => {
                copyBtn.textContent = 'کپی شد!';
                setTimeout(() => { copyBtn.textContent = 'کپی کردن'; }, 2000);
            })
            .catch(err => {
                console.error('خطا در کپی کردن:', err);
                alert('خطا در کپی کردن. لطفاً به صورت دستی کپی کنید.');
            });
    }

    // --- اجرای اولیه برنامه ---
    async function initializeApp() {
        await loadDnsList(); // اول لیست DNS رو از فایل txt لود می‌کنه
        generateBtn.addEventListener('click', generateDns);
        copyBtn.addEventListener('click', copyDnsToClipboard);
    }

    initializeApp();
});
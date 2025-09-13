document.addEventListener('DOMContentLoaded', () => {
    // ... (تمام کدها و متغیرهای قبلی اینجا هستند) ...

    const dnsOutput = document.getElementById('dns-output');
    const copyBtn = document.getElementById('copy-btn');
    // ... (بقیه سلکتورها)

    // ... (توابع loadSubscriptionCodes و loadDnsList بدون تغییر هستند) ...

    function handleLogin() {
        // ... (این تابع بدون تغییر است)
    }

    function generateDns() {
        if (dnsList.length === 0) {
            alert('لیست DNS در دسترس نیست.');
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * dnsList.length);
        const selectedDns = dnsList[randomIndex];

        // --- بخش آپدیت شده ---
        // ساخت HTML جدید برای نمایش DNS
        dnsOutput.innerHTML = `
            <div class="dns-row">
                <span class="dns-label">سرور اول (Primary)</span>
                <span class="dns-ip">${selectedDns.dns1}</span>
            </div>
            <div class="dns-row">
                <span class="dns-label">سرور دوم (Secondary)</span>
                <span class="dns-ip">${selectedDns.dns2}</span>
            </div>
        `;
        // --- پایان بخش آپدیت شده ---
        
        // Display country and flag
        document.getElementById('dns-flag').textContent = selectedDns.flag;
        document.getElementById('dns-country').textContent = selectedDns.country;

        // Display ping
        const pingValueEl = document.getElementById('ping-value');
        const ping = Math.floor(Math.random() * (250 - 100 + 1)) + 100;
        pingValueEl.textContent = ping;
        
        pingValueEl.className = 'ping-value';
        if (ping < 150) pingValueEl.classList.add('ping-good');
        else if (ping < 200) pingValueEl.classList.add('ping-medium');
        else pingValueEl.classList.add('ping-bad');
        
        document.getElementById('dns-result-container').classList.remove('hidden');
    }

    function copyDnsToClipboard() {
        const dnsRows = dnsOutput.querySelectorAll('.dns-row');
        if (dnsRows.length === 0) return;

        // ساخت متن کامل برای کپی کردن
        const dns1 = dnsRows[0].querySelector('.dns-ip').textContent;
        const dns2 = dnsRows[1].querySelector('.dns-ip').textContent;
        const textToCopy = `Primary: ${dns1}\nSecondary: ${dns2}`;

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                copyBtn.textContent = 'کپی شد!';
                setTimeout(() => { copyBtn.textContent = 'کپی کردن کل DNS'; }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy DNS:', err);
                alert('خطا در کپی کردن. لطفاً به صورت دستی کپی کنید.');
            });
    }
    
    // ... (تابع initializeApp بدون تغییر است) ...

    initializeApp();
});

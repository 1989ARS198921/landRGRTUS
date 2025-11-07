// Основные функции для лендинга


document.addEventListener('DOMContentLoaded', function() {
    // Установка текущего года в футере
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Инициализация анимаций при скролле
    initScrollAnimations();
    
    // Обработчики для интерактивных элементов
    initInteractiveElements();
    
    // Аналитика (опционально)
    initAnalytics();
});

// Анимации при скролле
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Наблюдаем за всеми секциями
    document.querySelectorAll('.section, .cta-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Интерактивные элементы
function initInteractiveElements() {
    // Обработка кликов по сервисам
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('click', function() {
            const serviceName = this.querySelector('.service-name').textContent;
            trackServiceClick(serviceName);
            
            // Анимация клика
            this.classList.add('success');
            setTimeout(() => {
                this.classList.remove('success');
            }, 600);
        });
    });
    
    // Обработка кнопки Telegram
    const telegramButton = document.querySelector('.telegram-button');
    if (telegramButton) {
        telegramButton.addEventListener('click', function(e) {
            trackTelegramClick();
            
            // Можно добавить дополнительную логику перед переходом
            console.log('Переход в Telegram...');
        });
    }
    
    // Плавная прокрутка (если будут якорные ссылки)
    initSmoothScroll();
}

// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Трекинг кликов (для аналитики)
function trackServiceClick(serviceName) {
    console.log(`Клик по услуге: ${serviceName}`);
    // Здесь можно добавить Google Analytics, Яндекс.Метрику и т.д.
    // Пример для Яндекс.Метрики:
    // ym(XXXXXX, 'reachGoal', 'service_click', { service: serviceName });
}

function trackTelegramClick() {
    console.log('Клик по кнопке Telegram');
    // Пример для Яндекс.Метрики:
    // ym(XXXXXX, 'reachGoal', 'telegram_click');
}

// Базовая аналитика
function initAnalytics() {
    // Можно добавить инициализацию Google Analytics или Яндекс.Метрики
    console.log('Лендинг загружен');
    
    // Отслеживание времени на странице
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        console.log(`Время на странице: ${timeSpent} секунд`);
        // ym(XXXXXX, 'reachGoal', 'time_spent', { seconds: timeSpent });
    });
}

// Дополнительные утилиты
const utils = {
    // Форматирование чисел
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    
    // Проверка мобильного устройства
    isMobile: function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    // Копирование текста в буфер обмена
    copyToClipboard: function(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Текст скопирован: ' + text);
        }).catch(err => {
            console.error('Ошибка копирования: ', err);
        });
    }
};

// Экспорт для использования в консоли (если нужно)
window.landingUtils = utils;

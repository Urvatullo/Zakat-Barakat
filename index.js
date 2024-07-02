document.addEventListener('DOMContentLoaded', function() {
    const zakatInputs = document.querySelectorAll('.zakat-input');
    const totalZakatButton = document.getElementById('total-zakat-button');
    const transferButton = document.getElementById('transfer-button');
    const currencySelect = document.getElementById('currency-select');
    const languageButtons = document.querySelectorAll('.language-switcher button');
    const goldRate24 = 60;
    const goldRate22 = 55;
    const goldRate18 = 45;
    const silverRate = 0.8;
    const nisabThreshold = 612.36 * silverRate;

    let currentCurrencySymbol = 'USD';
    let currentConversionRate = 1;
    let currentLanguage = 'en';

    const translations = {
        en: {
            currencyLabel: 'Currency:',
            totalZakat: 'Total Zakat: ',
            transferButton: 'Transfer to Fund',
            zakatOnGold: 'Zakat on Gold',
            zakatOnSilver: 'Zakat on Silver',
            zakatOnCash: 'Zakat on Cash',
            zakatOnProperty: 'Zakat on Property Business',
            shares: 'Shares',
            businessWithStock: 'Business with Stock',
            gold24: '24 Carat',
            gold22: '22 Carat',
            gold18: '18 Carat',
            weightGrams: 'Weight (in Grams)',
            cashInCash: 'In Cash',
            cashInBank: 'In the Bank',
            cashInBusinessBank: 'In the Business Bank',
            propertyValue: 'Market Value of Properties for Sale',
            propertyDebt: 'Money Owed within 12 Months',
            tradingShares: 'Trading Shares',
            longTermShares: 'Shares Held for Long Term',
            stockValue: 'Stock Values',
            stockFinance: 'Finance on Stock within 12 Months'
        },
        ru: {
            currencyLabel: 'Валюта:',
            totalZakat: 'Всего закят: ',
            transferButton: 'Перевести в фонд',
            zakatOnGold: 'Закят на золото',
            zakatOnSilver: 'Закят на серебро',
            zakatOnCash: 'Закят на наличные',
            zakatOnProperty: 'Закят на недвижимость',
            shares: 'Акции',
            businessWithStock: 'Бизнес со складскими запасами',
            gold24: '24 карата',
            gold22: '22 карата',
            gold18: '18 карата',
            weightGrams: 'Вес (в граммах)',
            cashInCash: 'В наличных',
            cashInBank: 'В банке',
            cashInBusinessBank: 'В бизнес-банке',
            propertyValue: 'Рыночная стоимость недвижимости на продажу',
            propertyDebt: 'Деньги, задолженные в течение 12 месяцев',
            tradingShares: 'Торговые акции',
            longTermShares: 'Акции на длительный срок',
            stockValue: 'Стоимость запасов',
            stockFinance: 'Финансирование запасов в течение 12 месяцев'
        },
        tj: {
            currencyLabel: 'Асъор:',
            totalZakat: 'Ҳамагӣ закот: ',
            transferButton: 'Интиқол бо фонд',
            zakatOnGold: 'Закот бо тилло',
            zakatOnSilver: 'Закот бо нуқра',
            zakatOnCash: 'Закот бо нақд',
            zakatOnProperty: 'Закот бо амволи ғайриманқул',
            shares: 'Саҳмҳо',
            businessWithStock: 'Бизнес бо захираҳо',
            gold24: '24 карат',
            gold22: '22 карат',
            gold18: '18 карат',
            weightGrams: 'Вазн (дар грамм)',
            cashInCash: 'Дар нақд',
            cashInBank: 'Дар бонк',
            cashInBusinessBank: 'Дар бонки тиҷоратӣ',
            propertyValue: 'Арзиши бозории амвол барои фурӯш',
            propertyDebt: 'Пулҳои қарзӣ дар тӯли 12 моҳ',
            tradingShares: 'Саҳмҳои савдо',
            longTermShares: 'Саҳмҳо барои муддати дароз',
            stockValue: 'Арзишҳои захираҳо',
            stockFinance: 'Молиякунонии захираҳо дар тӯли 12 моҳ'
        }
    };

    const placeholders = {
        en: {
            'gold-24-input': '24 Carat',
            'gold-22-input': '22 Carat',
            'gold-18-input': '18 Carat',
            'silver-input': 'Weight (in Grams)',
            'cash-amount': 'Amount in Cash',
            'bank-amount': 'Amount in Bank',
            'business-bank-amount': 'Amount in Business Bank',
            'property-value-input': 'Market Value of Properties for Sale',
            'property-debt-input': 'Money Owed within 12 Months',
            'trading-shares-input': 'Trading Shares',
            'long-term-shares-input': 'Shares Held for Long Term',
            'stock-value-input': 'Stock Values',
            'stock-finance-input': 'Finance on Stock within 12 Months'
        },
        ru: {
            'gold-24-input': '24 карата',
            'gold-22-input': '22 карата',
            'gold-18-input': '18 карата',
            'silver-input': 'Вес (в граммах)',
            'cash-amount': 'Сумма наличными',
            'bank-amount': 'Сумма в банке',
            'business-bank-amount': 'Сумма в бизнес-банке',
            'property-value-input': 'Рыночная стоимость недвижимости на продажу',
            'property-debt-input': 'Деньги, задолженные в течение 12 месяцев',
            'trading-shares-input': 'Торговые акции',
            'long-term-shares-input': 'Акции на длительный срок',
            'stock-value-input': 'Стоимость запасов',
            'stock-finance-input': 'Финансирование запасов в течение 12 месяцев'
        },
        tj: {
            'gold-24-input': '24 карат',
            'gold-22-input': '22 карат',
            'gold-18-input': '18 карат',
            'silver-input': 'Вазн (дар грамм)',
            'cash-amount': 'Маблағ дар нақд',
            'bank-amount': 'Маблағ дар бонк',
            'business-bank-amount': 'Маблағ дар бонки тиҷоратӣ',
            'property-value-input': 'Арзиши бозории амвол барои фурӯш',
            'property-debt-input': 'Пулҳои қарзӣ дар тӯли 12 моҳ',
            'trading-shares-input': 'Саҳмҳои савдо',
            'long-term-shares-input': 'Саҳмҳо барои муддати дароз',
            'stock-value-input': 'Арзишҳои захираҳо',
            'stock-finance-input': 'Молиякунонии захираҳо дар тӯли 12 моҳ'
        }
    };

    async function fetchExchangeRates() {
        try {
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();
            const rates = data.rates;

            document.querySelectorAll('#currency-select option').forEach(option => {
                const currency = option.value;
                if (rates[currency]) {
                    option.setAttribute('data-rate', rates[currency]);
                }
            });

            updateCurrencySymbol();
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
        }
    }

    function calculateZakat() {
        let totalWealthUSD = 0;
        let totalZakatUSD = 0;

        zakatInputs.forEach(input => {
            const value = parseFloat(input.value) || 0;
            const rate = parseFloat(input.getAttribute('data-rate'));
            
            if (input.id === 'gold-24-input') {
                totalWealthUSD += value * goldRate24;
                totalZakatUSD += value * goldRate24 * 0.025;
            } else if (input.id === 'gold-22-input') {
                totalWealthUSD += value * goldRate22;
                totalZakatUSD += value * goldRate22 * 0.025;
            } else if (input.id === 'gold-18-input') {
                totalWealthUSD += value * goldRate18;
                totalZakatUSD += value * goldRate18 * 0.025;
            } else if (input.id === 'silver-input') {
                totalWealthUSD += value * silverRate;
                totalZakatUSD += value * silverRate * 0.025;
            } else {
                totalWealthUSD += value;
                totalZakatUSD += value * rate;
            }
        });

        if (totalWealthUSD < nisabThreshold) {
            totalZakatUSD = 0;
        }

        const totalZakatConverted = totalZakatUSD * currentConversionRate;
        totalZakatButton.textContent = `${translations[currentLanguage].totalZakat}${currentCurrencySymbol} ${totalZakatConverted.toFixed(2)}`;
    }

    function updateCurrencySymbol() {
        currentCurrencySymbol = currencySelect.options[currencySelect.selectedIndex].value;
        currentConversionRate = parseFloat(currencySelect.options[currencySelect.selectedIndex].getAttribute('data-rate'));
        calculateZakat();
    }

    zakatInputs.forEach(input => {
        input.addEventListener('input', calculateZakat);
    });

    currencySelect.addEventListener('change', () => {
        updateCurrencySymbol();
        calculateZakat();
        transferButton.textContent = `${translations[currentLanguage].transferButton} (${currentCurrencySymbol})`;
    });

    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });

    function switchLanguage(lang) {
        currentLanguage = lang;
        const elementsToTranslate = document.querySelectorAll('[data-translate]');
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-translate');
            element.textContent = translations[lang][key];
        });

        const inputPlaceholders = document.querySelectorAll('[data-placeholder]');
        inputPlaceholders.forEach(input => {
            const key = input.getAttribute('data-placeholder');
            input.placeholder = placeholders[lang][key];
        });

        updateCurrencySymbol();
        transferButton.textContent = `${translations[lang].transferButton} (${currentCurrencySymbol})`;
    }

    function toggleSection(sectionId) {
        const section = document.getElementById(sectionId);
        section.style.display = section.style.display === 'block' ? 'none' : 'block';
    }

    function toggleSubSection(subSectionId) {
        const subSection = document.getElementById(subSectionId);
        subSection.style.display = subSection.style.display === 'block' ? 'none' : 'block';
    }

    window.toggleSection = toggleSection;
    window.toggleSubSection = toggleSubSection;

    fetchExchangeRates();
    switchLanguage(currentLanguage);
});

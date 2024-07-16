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
            gold24: ' 24 Carat',
            gold22: ' 22 Carat',
            gold18: ' 18 Carat',
            weightGrams: 'Weight (in Grams)',
            cashInCash: 'In Cash',
            cashInBank: 'In the Bank',
            cashInBusinessBank: 'In the Business Bank',
            propertyValue: 'Market Value of Properties for Sale',
            propertyDebt: 'Money Owed within 12 Months',
            tradingShares: 'Trading Shares',
            longTermShares: 'Shares Held for Long Term',
            stockValue: 'Stock Values',
            stockFinance: 'Finance on Stock within 12 Months',
            zakatOnProduce: 'Zakāt on Agricultural Produce',
            zakatOnLivestock: 'Zakāt on Livestock',
            weightKgs: 'Weight (in Kgs)',
            numCattle: 'Number of Cattle',
            numSheep: 'Number of Sheep',
            cattle: 'Cattle',
            sheep: 'Sheep',
            donate: 'Donate',
            zakatfundcharity: 'Zakat Fund is a Russian charitable organization that specializes in collecting and distributing Zakat. The fund aims to help those in need and support various social projects both in Russia and abroad.',
            insancharity: 'The Insan Charity Fund is dedicated to collecting and distributing Zakat and other forms of charity in Russia. The fund focuses on providing assistance to underprivileged families and supporting educational and social projects.',
            alabugacharity: 'The Alabuga Charity Fund is engaged in collecting and distributing Zakat and other forms of charity in Russia. The fund provides assistance to needy families and supports educational and social projects.'
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
            gold24: ' 24 карата',
            gold22: ' 22 карата',
            gold18: ' 18 карата',
            weightGrams: 'Вес (в граммах)',
            cashInCash: 'В наличных',
            cashInBank: 'В банке',
            cashInBusinessBank: 'В бизнес-банке',
            propertyValue: 'Рыночная стоимость недвижимости на продажу',
            propertyDebt: 'Деньги, задолженные в течение 12 месяцев',
            tradingShares: 'Торговые акции',
            longTermShares: 'Акции на длительный срок',
            stockValue: 'Стоимость запасов',
            stockFinance: 'Финансирование запасов в течение 12 месяцев',
            zakatOnProduce: 'Закят на сельскохозяйственную продукцию',
            zakatOnLivestock: 'Закят на скот',
            weightKgs: 'Вес (в кг)',
            numCattle: 'Количество голов',
            numSheep: 'Количество овец',
            cattle: 'Скот',
            sheep: 'Овцы',
            donate: 'Пожертвовать',
            zakatfundcharity: 'Фонд Закят — российская благотворительная организация, которая специализируется на сборе и распределении закята. Целью фонда является помощь нуждающимся и поддержка различных социальных проектов как в России, так и за рубежом.',
            insancharity: 'Благотворительный фонд «Инсан» занимается сбором и распределением закята и других форм благотворитель- ности в России. Фонд фокусируется на оказании помощи малообеспеченным семьям и поддержке образовательных и социальных проектов.',
            alabugacharity: 'Благотворительный фонд «Алабуга» занимается сбором и распределением закята и других форм благотворитель- ности в России. Фонд оказывает помощь нуждающимся семьям и поддерживает образовательные и социальные проекты.'
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
            gold24: ' 24 карат',
            gold22: ' 22 карат',
            gold18: ' 18 карат',
            weightGrams: 'Вазн (дар грамм)',
            cashInCash: 'Дар нақд',
            cashInBank: 'Дар бонк',
            cashInBusinessBank: 'Дар бонки тиҷоратӣ',
            propertyValue: 'Арзиши бозории амвол барои фурӯш',
            propertyDebt: 'Пулҳои қарзӣ дар тӯли 12 моҳ',
            tradingShares: 'Саҳмҳои савдо',
            longTermShares: 'Саҳмҳо барои муддати дароз',
            stockValue: 'Арзишҳои захираҳо',
            stockFinance: 'Молиякунонии захираҳо дар тӯли 12 моҳ',
            zakatOnProduce: 'Закот бо маҳсулоти кишоварзӣ',
            zakatOnLivestock: 'Закот бо чорво',
            weightKgs: 'Вазн (дар кг)',
            numCattle: 'Шумораи говҳо',
            numSheep: 'Шумораи гӯсфандҳо',
            cattle: 'Гов',
            sheep: 'Гӯсфанд',
            donate: 'Xайрия',
            zakatfundcharity: 'Фонди закот як созмони хайрияи Русия аст, ки ба ҷамъоварӣ ва тақсими закот тахассус дорад. Ҳадафи ин фонд кӯмак ба ниёзмандон ва дастгирии лоиҳаҳои гуногуни иҷтимоӣ дар Русия ва хориҷ аз он аст.',
            insancharity: 'Фонди хайрияи «Инсан» барои ҷамъоварӣ ва паҳн кардани закот ва дигар шаклҳои хайрия дар Русия бахшида шудааст. Фонд ба расонидани кӯмак ба оилаҳои камбизоат ва дастгирии лоиҳаҳои таълимӣ ва иҷтимоӣ тамаркуз мекунад.',
            alabugacharity: 'Фонди хайрияи Алабуга ба ҷамъоварӣ ва паҳн кардани закот ва дигар шаклҳои хайрия дар Русия машғул аст. Фонд ба оилаҳои ниёзманд кумак мерасонад ва лоиҳаҳои таълимӣ ва иҷтимоиро дастгирӣ мекунад.'
        },
        kz: {
            currencyLabel: 'Валюта:',
            totalZakat: 'Жалпы зекет: ',
            transferButton: 'Қорға аудару',
            zakatOnGold: 'Алтынның зекеті',
            zakatOnSilver: 'Күміс зекет',
            zakatOnCash: 'Қолма-қол зекет',
            zakatOnProperty: 'Мүлік бизнесінің зекеті',
            shares: 'Акциялар',
            businessWithStock: 'Стокпен бизнес',
            gold24: ' 24 карат',
            gold22: ' 22 карат',
            gold18: ' 18 карат',
            weightGrams: 'Салмақ (грамммен)',
            cashInCash: 'Қолма-қол ақшамен',
            cashInBank: 'Банкте',
            cashInBusinessBank: 'IІскерлік банкте',
            propertyValue: 'Сатылатын жылжымайтын мүліктің нарықтық құны',
            propertyDebt: '12 ай ішінде қарыз ақша',
            tradingShares: 'Саудалық акциялар',
            longTermShares: 'Ұзақ мерзімді ұсталған акциялар',
            stockValue: 'акциялық құндылықтар',
            stockFinance: '12 ай ішінде қордағы қаржыландыру',
            zakatOnProduce: 'Ауылшаруашылық өнімдерінің зекеті',
            zakatOnLivestock: 'Мал зекеті',
            weightKgs: 'Салмақ (Кг)',
            numCattle: 'Ірі қара мал саны',
            numSheep: 'Қой саны',
            cattle: 'мал',
            sheep: 'Қой',
            donate: 'Cадақа беру',
            zakatfundcharity: 'Зекет қоры зекет жинауға және таратуға маманданған ресейлік қайырымдылық ұйымы. Қор Ресейде де, шетелде де мұқтаж жандарға көмек көрсетуге және түрлі әлеуметтік жобаларға қолдау көрсетуге бағытталған.',
            insancharity: '«Инсан» қайырымдылық қоры Ресейде зекет пен басқа да қайырымдылық түрлерін жинауға және таратуға арналған. Қор аз қамтылған отбасыларға көмек көрсетуге, білім беру және әлеуметтік жобаларды қолдауға бағытталған.',
            alabugacharity: '«Алабуга» қайырымдылық қоры Ресейде зекет және басқа да қайырымдылық түрлерін жинаумен және таратумен айналысады. Қор аз қамтылған отбасыларға көмек көрсетіп, білім беру және әлеуметтік жобаларды қолдайды.'
        },
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
            'stock-finance-input': 'Finance on Stock within 12 Months',
            'produce-input': 'Weight in Kgs',
            'cattle-input': 'Number of Cattle',
            'sheep-input': 'Number of Sheep'
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
            'stock-finance-input': 'Финансирование запасов в течение 12 месяцев',
            'produce-input': 'Вес в кг',
            'cattle-input': 'Количество голов',
            'sheep-input': 'Количество овец'
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
            'stock-finance-input': 'Молиякунонии захираҳо дар тӯли 12 моҳ',
            'produce-input': 'Вазн дар кг',
            'cattle-input': 'Шумораи говҳо',
            'sheep-input': 'Шумораи гӯсфандҳо'
        },
        kz: {
            'gold-24-input': '24 карат',
            'gold-22-input': '22 карат',
            'gold-18-input': '18 карат',
            'silver-input': 'Салмақ (грамммен)',
            'cash-amount': 'қолма-қол ақша сомасы',
            'bank-amount': 'Банктегі сома',
            'business-bank-amount': 'Бизнес банкіндегі сома',
            'property-value-input': 'Сатылатын мүліктің нарықтық құны',
            'property-debt-input': '12 ай ішінде қарыз ақша',
            'trading-shares-input': 'Саудалық акциялар',
            'long-term-shares-input': 'ұзақ мерзімді акциялар',
            'stock-value-input': 'акция құны',
            'stock-finance-input': '12 айға арналған қор қаржысы',
            'produce-input': 'Салмағы кг',
            'cattle-input': 'бас саны',
            'sheep-input': 'Қой саны'
            },
    };

    const infoButtons = document.querySelectorAll('.info-btn');

    infoButtons.forEach(button => {
        button.addEventListener('click', function () {
            const infoText = this.nextElementSibling;

            if (infoText.style.display === 'block') {
                infoText.style.display = 'none';
            } else {
                infoText.style.display = 'block';
                positionInfoText(this, infoText);
            }

            closeOtherInfoTexts(infoText);
        });
    });

    function closeOtherInfoTexts(currentInfoText) {
        const allInfoTexts = document.querySelectorAll('.info-text');
        allInfoTexts.forEach(text => {
            if (text !== currentInfoText && text.style.display === 'block') {
                text.style.display = 'none';
            }
        });
    }

    function positionInfoText(button, infoText) {
        const rect = button.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        
        let leftPosition = rect.left + scrollLeft;
        let topPosition = rect.bottom + scrollTop;

        const infoTextWidth = infoText.offsetWidth;
        const windowWidth = window.innerWidth;
        const rightEdge = leftPosition + infoTextWidth;

        if (rightEdge > windowWidth) {
            leftPosition = windowWidth - infoTextWidth;
        }

        infoText.style.left = `${leftPosition}px`;
        infoText.style.top = `${topPosition}px`;
    }

    window.addEventListener('resize', function () {
        infoButtons.forEach(button => {
            const infoText = button.nextElementSibling;
            if (infoText.style.display === 'block') {
                positionInfoText(button, infoText);
            }
        });
    });

    window.addEventListener('scroll', function () {
        infoButtons.forEach(button => {
            const infoText = button.nextElementSibling;
            if (infoText.style.display === 'block') {
                positionInfoText(button, infoText);
            }
        });
    });

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

    document.getElementById('transfer-button').addEventListener('click', function () {
        document.querySelectorAll('.category, .total-zakat, .currency-switcher, .language-switcher').forEach(function (element) {
            element.style.display = 'none';
        });
        document.querySelector('.total-zakat').style.display = 'block';
        document.querySelector('.language-switcher').style.display = 'flex';
        document.querySelector('.currency-switcher').style.display = 'flex';
        document.getElementById('funds-section').classList.remove('hidden');
    });

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

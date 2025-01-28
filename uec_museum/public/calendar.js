document.addEventListener('DOMContentLoaded', () => {
    const calendarElement = document.getElementById('calendar');
    const now = new Date();
    let currentMonth = now.getMonth();
    let currentYear = now.getFullYear();

    // 月ごとの画像データ
    const monthImages = {
        0: { image: 'january', position: 'bottom', percentage: '50%' },         // 1月
        1: { image: 'february', position: 'bottom 5%', percentage: '45%' },     // 2月
        2: { image: 'march', position: 'top 45%', percentage: '25%' },           // 3月
        3: { image: 'april', position: 'bottom 5%', percentage: '50%' },           // 4月
        4: { image: 'may', position: 'bottom 30%', percentage: '30%' },             // 5月
        5: { image: 'june', position: 'bottom 20%', percentage: '40%' },            // 6月
        6: { image: 'july', position: 'center', percentage: '40%' },            // 7月
        7: { image: 'august', position: 'center', percentage: '30%' },          // 8月
        8: { image: 'september', position: 'top 32%', percentage: '25%' },       // 9月
        9: { image: 'october', position: 'center', percentage: '30%' },         // 10月
        10: { image: 'november', position: 'center', percentage: '40%' },       // 11月
        11: { image: 'december', position: 'top 40%', percentage: '40%' }        // 12月
    };

    function updateMonthImage() {
        const header = document.querySelector('.calendar-header');
        if (!header) return;

        // 月に応じた画像パスを生成
        const imageUrl = "./img/" + monthImages[currentMonth].image + ".jpg";
        header.style.backgroundImage = `url(${imageUrl}), url('./img/background.jpg')`;;
        header.style.backgroundSize = `${monthImages[currentMonth].percentage} auto, cover`;
        header.style.backgroundPosition = `center ${monthImages[currentMonth].position}, center`;
        header.style.backgroundRepeat = "no-repeat, no-repeat";
    }

    function handleLinkClick(event) {
        // クリックされた要素がボタンであれば遷移を防止
        if (event.target.tagName === 'BUTTON') {
            event.preventDefault(); // ページ遷移を防ぐ
            return false; // 遷移しない
        }
        return true; // ボタン以外の部分がクリックされたら遷移する
    }

    // 静的な予定を定義 (例)
    const staticEvents = [
        { title: "冬季休業", date: "2025-01-01", color: "red" },
        { title: "冬季休業", date: "2025-01-02", color: "red" },
        { title: "冬季休業", date: "2025-01-03", color: "red" },

        { title: "成人の日", date: "2025-01-13", color: "red" },

        { title: "後学期試験", date: "2025-02-10", color: "blue" },
        { title: "建国記念日", date: "2025-02-11", color: "red" },
        { title: "後学期試験", date: "2025-02-11", color: "blue" },
        { title: "後学期試験", date: "2025-02-12", color: "blue" },
        { title: "後学期試験", date: "2025-02-13", color: "blue" },
        { title: "後学期試験", date: "2025-02-14", color: "blue" },

        { title: "春季休業", date: "2025-02-17", color: "red" },
        { title: "春季休業", date: "2025-02-18", color: "red" },
        { title: "春季休業", date: "2025-02-19", color: "red" },
        { title: "春季休業", date: "2025-02-20", color: "red" },
        { title: "春季休業", date: "2025-02-21", color: "red" },
        { title: "天皇誕生日", date: "2025-02-23", color: "red" },
        { title: "振替休日", date: "2025-02-24", color: "red" },
        { title: "春季休業", date: "2025-02-24", color: "red" },
        { title: "春季休業", date: "2025-02-25", color: "red" },
        { title: "春季休業", date: "2025-02-26", color: "red" },
        { title: "春季休業", date: "2025-02-27", color: "red" },
        { title: "春季休業", date: "2025-02-28", color: "red" },
        { title: "春季休業", date: "2025-03-03", color: "red" },
        { title: "春季休業", date: "2025-03-04", color: "red" },
        { title: "春季休業", date: "2025-03-05", color: "red" },
        { title: "春季休業", date: "2025-03-06", color: "red" },
        { title: "春季休業", date: "2025-03-07", color: "red" },
        { title: "春季休業", date: "2025-03-10", color: "red" },
        { title: "春季休業", date: "2025-03-11", color: "red" },
        { title: "春季休業", date: "2025-03-12", color: "red" },
        { title: "春季休業", date: "2025-03-13", color: "red" },
        { title: "春季休業", date: "2025-03-14", color: "red" },
        { title: "春季休業", date: "2025-03-17", color: "red" },
        { title: "春季休業", date: "2025-03-18", color: "red" },
        { title: "春季休業", date: "2025-03-19", color: "red" },
        { title: "春季休業", date: "2025-03-20", color: "red" },
        { title: "春分の日", date: "2025-03-20", color: "red" },
        { title: "春季休業", date: "2025-03-21", color: "red" },
        { title: "春季休業", date: "2025-03-24", color: "red" },
        { title: "春季休業", date: "2025-03-25", color: "red" },
        { title: "春季休業", date: "2025-03-26", color: "red" },
        { title: "春季休業", date: "2025-03-27", color: "red" },
        { title: "春季休業", date: "2025-03-28", color: "red" },
        { title: "春季休業", date: "2025-03-31", color: "red" },
        { title: "春季休業", date: "2025-04-01", color: "red" },
        { title: "春季休業", date: "2025-04-02", color: "red" },

        { title: "昭和の日", date: "2025-04-29", color: "red" },

        { title: "憲法記念日", date: "2025-05-03", color: "red" },
        { title: "みどりの日", date: "2025-05-04", color: "red" },
        { title: "こどもの日", date: "2025-05-05", color: "red" },
        { title: "振替休日", date: "2025-05-06", color: "red" },

        { title: "海の日", date: "2025-07-21", color: "red" },
        { title: "授業あり", date: "2025-07-21", color: "#93df20" },

        { title: "前学期試験", date: "2025-07-30", color: "blue" },
        { title: "前学期試験", date: "2025-07-31", color: "blue" },
        { title: "前学期試験", date: "2025-08-01", color: "blue" },
        { title: "前学期試験", date: "2025-08-04", color: "blue" },
        { title: "前学期試験", date: "2025-08-05", color: "blue" },

        { title: "夏季休業", date: "2025-08-06", color: "red" },
        { title: "夏季休業", date: "2025-08-07", color: "red" },
        { title: "夏季休業", date: "2025-08-08", color: "red" },
        { title: "夏季休業", date: "2025-08-11", color: "red" },
        { title: "夏季休業", date: "2025-08-12", color: "red" },
        { title: "夏季休業", date: "2025-08-13", color: "red" },
        { title: "夏季休業", date: "2025-08-14", color: "red" },
        { title: "夏季休業", date: "2025-08-15", color: "red" },
        { title: "夏季休業", date: "2025-08-18", color: "red" },
        { title: "夏季休業", date: "2025-08-19", color: "red" },
        { title: "夏季休業", date: "2025-08-20", color: "red" },
        { title: "夏季休業", date: "2025-08-21", color: "red" },
        { title: "夏季休業", date: "2025-08-22", color: "red" },
        { title: "夏季休業", date: "2025-08-25", color: "red" },
        { title: "夏季休業", date: "2025-08-26", color: "red" },
        { title: "夏季休業", date: "2025-08-27", color: "red" },
        { title: "夏季休業", date: "2025-08-28", color: "red" },
        { title: "夏季休業", date: "2025-08-29", color: "red" },
        { title: "夏季休業", date: "2025-09-01", color: "red" },
        { title: "夏季休業", date: "2025-09-02", color: "red" },
        { title: "夏季休業", date: "2025-09-03", color: "red" },
        { title: "夏季休業", date: "2025-09-04", color: "red" },
        { title: "夏季休業", date: "2025-09-05", color: "red" },
        { title: "夏季休業", date: "2025-09-08", color: "red" },
        { title: "夏季休業", date: "2025-09-09", color: "red" },
        { title: "夏季休業", date: "2025-09-10", color: "red" },
        { title: "夏季休業", date: "2025-09-11", color: "red" },
        { title: "夏季休業", date: "2025-09-12", color: "red" },
        { title: "夏季休業", date: "2025-09-15", color: "red" },
        { title: "夏季休業", date: "2025-09-16", color: "red" },
        { title: "夏季休業", date: "2025-09-17", color: "red" },
        { title: "夏季休業", date: "2025-09-18", color: "red" },
        { title: "夏季休業", date: "2025-09-19", color: "red" },
        { title: "夏季休業", date: "2025-09-22", color: "red" },
        { title: "夏季休業", date: "2025-09-23", color: "red" },
        { title: "夏季休業", date: "2025-09-24", color: "red" },
        { title: "夏季休業", date: "2025-09-25", color: "red" },
        { title: "夏季休業", date: "2025-09-26", color: "red" },
        { title: "夏季休業", date: "2025-09-29", color: "red" },
        { title: "夏季休業", date: "2025-09-30", color: "red" },

        { title: "冬季休業", date: "2025-12-26", color: "red" },
        { title: "冬季休業", date: "2025-12-29", color: "red" },
        { title: "冬季休業", date: "2025-12-30", color: "red" },
        { title: "冬季休業", date: "2025-12-31", color: "red" },
        { title: "冬季休業", date: "2026-01-02", color: "red" },
        { title: "冬季休業", date: "2026-01-03", color: "red" },

        { title: "後学期試験", date: "2026-02-09", color: "blue" },
        { title: "後学期試験", date: "2026-02-10", color: "blue" },
        { title: "後学期試験", date: "2026-02-11", color: "blue" },
        { title: "後学期試験", date: "2026-02-12", color: "blue" },
        { title: "後学期試験", date: "2026-02-13", color: "blue" },
        
    ];

    // ローカルストレージから動的イベントを読み込む
    const storedEvents = localStorage.getItem('calendarEvents');
    const dynamicEvents = storedEvents ? JSON.parse(storedEvents) : [];

    function saveEvents() {
        // 動的イベントだけを保存（静的イベントは保存不要）
        localStorage.setItem('calendarEvents', JSON.stringify(dynamicEvents));
    }

    function renderCalendar(month, year) {
        const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
        const firstDay = new Date(Date.UTC(year, month, 1)).getUTCDay();

        // 静的イベントと動的イベントを結合
        const events = [...staticEvents, ...dynamicEvents];

        let calendarHTML = `
            <div class="calendar-header">
                <button id="prev">← 前月</button>
                    <a href="https://www.museum.uec.ac.jp/" target="_blank">
                        <h2>${year}年 ${month + 1}月</h2>
                    </a>
                <button id="next">次月 →</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>日</th>
                        <th>月</th>
                        <th>火</th>
                        <th>水</th>
                        <th>木</th>
                        <th>金</th>
                        <th>土</th>
                    </tr>
                </thead>
                <tbody>
        `;

        let day = 1;
        for (let i = 0; i < 6; i++) {
            calendarHTML += '<tr>';
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    calendarHTML += '<td></td>';
                } else if (day > daysInMonth) {
                    calendarHTML += '<td></td>';
                } else {
                    const formattedDate = new Date(Date.UTC(year, month, day)).toISOString().split('T')[0];
                    const isToday = day === now.getUTCDate() && month === now.getUTCMonth() && year === now.getUTCFullYear();

                    // イベントを取得
                    const dayEvents = events.filter(event => event.date === formattedDate);
                    const eventHTML = dayEvents.map(event => `<div class="event" style="background-color: ${event.color};">${event.title}</div>`).join('');

                    calendarHTML += `<td class="${isToday ? 'today' : ''}">
                        ${day}
                        ${eventHTML}
                    </td>`;
                    day++;
                }
            }
            calendarHTML += '</tr>';
        }

        calendarHTML += `
                </tbody>
            </table>
        `;
        calendarElement.innerHTML = calendarHTML;



        document.getElementById('prev').addEventListener('click', () => {
            event.stopPropagation();
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar(currentMonth, currentYear);
        });

        document.getElementById('next').addEventListener('click', () => {
            event.stopPropagation(); // 親のリンクへの伝播を防ぐ
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar(currentMonth, currentYear);
        });

        updateMonthImage(); // 月の画像を更新
    }

    document.getElementById('add-event').addEventListener('click', () => {
        const title = document.getElementById('event-title').value.trim();
        const date = document.getElementById('event-date').value;

        if (!title || !date) {
            // エラーメッセージを表示
            alert('イベント名と日時の両方を入力してください！');
            return;
        }

        // 動的イベントを追加
        dynamicEvents.push({ title, date });
        // ローカルストレージに保存
        saveEvents();
        renderCalendar(currentMonth, currentYear);

        // 入力フォームをリセット
        document.getElementById('event-title').value = '';
        document.getElementById('event-date').value = '';
    });

    renderCalendar(currentMonth, currentYear);
});
  
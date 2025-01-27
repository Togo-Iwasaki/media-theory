document.addEventListener('DOMContentLoaded', () => {
    const calendarElement = document.getElementById('calendar');
    const now = new Date();
    let currentMonth = now.getMonth();
    let currentYear = now.getFullYear();

    // 月ごとの画像データ
    const monthImages = {
        0: "january",   // 1月
        1: "february",  // 2月
        2: "march",     // 3月
        3: "april",     // 4月
        4: "may",       // 5月
        5: "june",      // 6月
        6: "july",      // 7月
        7: "august",    // 8月
        8: "september", // 9月
        9: "october",   // 10月
        10: "november", // 11月
        11: "december", // 12月
    };

    function updateMonthImage() {
        const header = document.querySelector('.calendar-header');
        if (!header) return;

        // 月に応じた画像パスを生成
        const imageUrl = "./img/" + monthImages[currentMonth] + ".jpg";
        header.style.backgroundImage = `url(${imageUrl})`;
        header.style.backgroundSize = "cover";
        header.style.backgroundPosition = "center";

        console.log(currentMonth);
    }

    // 静的な予定を定義 (例)
    const staticEvents = [
        { title: "会議", date: "2025-01-21" },
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
                <h2>${year}年 ${month + 1}月</h2>
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
                    const eventHTML = dayEvents.map(event => `<div class="event">${event.title}</div>`).join('');

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
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar(currentMonth, currentYear);
        });

        document.getElementById('next').addEventListener('click', () => {
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
  
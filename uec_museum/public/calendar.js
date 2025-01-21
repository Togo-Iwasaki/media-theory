//イベントを追加すると行の幅が大きくなってしまっているので、月表示では一定の幅で固定してイベントは縦に積み重ねるように表示する
//月の日にちをクリックすると日にちのイベントが表示される
document.addEventListener('DOMContentLoaded', () => {
    const calendarElement = document.getElementById('calendar');
    const now = new Date();
    let currentMonth = now.getMonth();
    let currentYear = now.getFullYear();

    const events = []; // イベントを格納する配列

    function renderCalendar(month, year) {
        const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
        const firstDay = new Date(Date.UTC(year, month, 1)).getUTCDay();

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
    }

    document.getElementById('add-event').addEventListener('click', () => {
        const title = document.getElementById('event-title').value.trim();
        const date = document.getElementById('event-date').value;

        if (!title || !date) {
            // エラーメッセージを表示
            alert('イベント名と日時の両方を入力してください！');
            return;
        }

        events.push({ title, date });
        renderCalendar(currentMonth, currentYear);

        // 入力フォームをリセット
        document.getElementById('event-title').value = '';
        document.getElementById('event-date').value = '';
    });

    renderCalendar(currentMonth, currentYear);
});

document.addEventListener('DOMContentLoaded', () => {
    const calendarElement = document.getElementById('calendar');
    const now = new Date();

    let currentMonth = now.getMonth();
    let currentYear = now.getFullYear();

    function renderCalendar(month, year) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();

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
                    const isToday = day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
                    calendarHTML += `<td class="${isToday ? 'today' : ''}">${day}</td>`;
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

        // イベントリスナーを追加
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

    renderCalendar(currentMonth, currentYear);
});

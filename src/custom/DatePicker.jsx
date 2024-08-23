import moment from 'moment'
import { useState, useEffect } from 'react'

function DatePicker({ setChosenDate }) {
    const today = new Date()
    const [currentMonth, setCurrentMonth] = useState(today.getMonth())
    const [currentYear, setCurrentYear] = useState(today.getFullYear())
    const [selectedDay, setSelectedDay] = useState(
        sessionStorage.getItem('day') || today.getDate()
    )
    const [selectedMonth, setSelectedMonth] = useState(
        sessionStorage.getItem('month') || today.getMonth()
    )
    const [selectedYear, setSelectedYear] = useState(
        sessionStorage.getItem('year') || today.getFullYear()
    )

    const monthNames = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Deciembre',
    ]

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    const changeMonth = (offset) => {
        let newMonth = currentMonth + offset
        let newYear = currentYear

        if (newMonth < 0) {
            newMonth = 11
            newYear--
        } else if (newMonth > 11) {
            newMonth = 0
            newYear++
        }

        setCurrentMonth(newMonth)
        setCurrentYear(newYear)
    }

    const renderCalendar = () => {
        const firstDay = new Date(currentYear, currentMonth, 0).getDay()
        let monthLength = daysInMonth[currentMonth]

        if (currentMonth === 1) {
            if (
                (currentYear % 4 === 0 && currentYear % 100 !== 0) ||
                currentYear % 400 === 0
            ) {
                monthLength++
            }
        }

        const rows = []
        let day = 1

        for (let i = 0; i < 6; i++) {
            const cells = []

            for (let j = 0; j < 7; j++) {
                const thisDate = new Date(currentYear, currentMonth, day)

                if (i === 0 && j < firstDay) {
                    cells.push(<td key={j}>&nbsp;</td>)
                } else if (day <= monthLength) {
                    const isBlocked =
                        thisDate.getDay() === 0 || // Sunday
                        (currentMonth === today.getMonth() &&
                            day < today.getDate()) // A day in the past
                    const isSelected =
                        day == selectedDay &&
                        currentMonth == selectedMonth &&
                        currentYear == selectedYear

                    cells.push(
                        <td
                            key={j}
                            className={`day ${isBlocked ? 'day-blocked' : ''} ${
                                isSelected ? 'day-selected' : ''
                            }`}
                            onClick={() => {
                                if (!isBlocked) {
                                    setSelectedDay(day)
                                    setSelectedMonth(currentMonth)
                                    setSelectedYear(currentYear)
                                    sessionStorage.setItem('day', day)
                                    sessionStorage.setItem(
                                        'month',
                                        currentMonth
                                    )
                                    sessionStorage.setItem('year', currentYear)

                                    if (setChosenDate) {
                                        const momentDate = moment(
                                            new Date(
                                                currentYear,
                                                currentMonth,
                                                day
                                            )
                                        )
                                        setChosenDate(
                                            momentDate.format('DD/MM/YYYY')
                                        )
                                    }
                                }
                            }}
                        >
                            {day}
                        </td>
                    )

                    day++
                } else {
                    cells.push(<td key={j}>&nbsp;</td>)
                }
            }

            rows.push(<tr key={i}>{cells}</tr>)
        }

        return rows
    }

    useEffect(() => {
        if (currentMonth === today.getMonth()) {
            document.querySelector('.prev-mth').style.visibility = 'hidden'
        } else {
            document.querySelector('.prev-mth').removeAttribute('style')
        }
    }, [currentMonth])

    return (
        <div className="calendar">
            <div className="calendar-header">
                <div
                    className="arrows prev-mth"
                    style={{ fontFamily: 'Futura' }}
                    onClick={() => changeMonth(-1)}
                >
                    &lt;
                </div>
                <div className="mth">{`${monthNames[currentMonth]} ${currentYear}`}</div>
                <div
                    className="arrows next-mth"
                    style={{ fontFamily: 'Futura' }}
                    onClick={() => changeMonth(1)}
                >
                    &gt;
                </div>
            </div>

            <table id="calendar-body">
                <thead>
                    <tr>
                        <th className="week-day">Lun</th>
                        <th className="week-day">Mar</th>
                        <th className="week-day">Mie</th>
                        <th className="week-day">Jue</th>
                        <th className="week-day">Vie</th>
                        <th className="week-day">Sab</th>
                        <th className="week-day">Dom</th>
                    </tr>
                </thead>

                <tbody id="calendar-dates">{renderCalendar()}</tbody>
            </table>

            <input
                type="hidden"
                name="date"
                id="reserv-date"
                // onChange={(e) => setChosenDate(e.target.value)}
            />
        </div>
    )
}

export default DatePicker

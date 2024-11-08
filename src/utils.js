const colors = ['#718427', '#6F9940', '#3d6413', '#619c21', '#638a1b', '#4c7327', '#22421A', '#286F29']
const reservas = [
    {
        "id": "1",
        "arrivalTimestamp": 12425234324,
        "name": "John",
        "hour": "19:00",
        "pax": "3",
        "phone": "23443532",
        "comment": "lorem ipsum dolor sit amet",
        "date": "01/02/2024",
        "email": "example@gmail.com",
        "confirmed": 1,
        "table": "10"
    },
    {
        "id": "2",
        "arrivalTimestamp": 1733979600000,
        "name": "Cate",
        "hour": "14:00",
        "pax": "2",
        "phone": "979007565",
        "comment": "lorem ipsum dolor sit amet",
        "date": "01/02/2024",
        "email": "foobar@gmail.com",
        "confirmed": 0,
        "table": "10"
    },
    {
        "id": "5",
        "arrivalTimestamp": 1734238800000,
        "name": "Sofia",
        "hour": "22:30",
        "pax": "2",
        "phone": "933007565",
        "comment": "lorem ipsum dolor sit amet",
        "date": "01/02/2024",
        "email": "foobar@gmail.com",
        "confirmed": 0,
        "table": "10"
    },
    {
        "id": "3",
        "arrivalTimestamp": 32464326243,
        "name": "Lana",
        "hour": "21:00",
        "pax": "6",
        "phone": "36677345",
        "comment": "lorem ipsum dolor sit amet",
        "date": "01/02/2024",
        "email": "lorem@gmail.com",
        "confirmed": 1,
        "table": "10"
    },
    {
        "id": "4",
        "arrivalTimestamp": 1734066000000,
        "name": "Mike",
        "hour": "18:30",
        "pax": "2",
        "phone": "556326363",
        "comment": "lorem ipsum dolor sit amet",
        "date": "01/02/2024",
        "email": "token@gmail.com",
        "confirmed": 0,
        "table": "11"
    }
]

const getDummyReservas = (date, part, delay = 1000) => {
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reservas.sort((a, b) => {
                if (a.confirmed < b.confirmed) return -1
                if (a.confirmed > b.confirmed) return 1
                return a.arrivalTimestamp - b.arrivalTimestamp
            })
            resolve(JSON.stringify(reservas))
        }, delay)
    })
}

export {colors, getDummyReservas}
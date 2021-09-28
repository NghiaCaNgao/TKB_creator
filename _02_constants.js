const pattern = [{
        start: [7, 0],
        end: [7, 50],
    },
    {
        start: [8, 0],
        end: [8, 50],
    },
    {
        start: [9, 0],
        end: [9, 50],
    },
    {
        start: [10, 0],
        end: [10, 50],
    },
    {
        start: [11, 0],
        end: [11, 50],
    },
    {
        start: [12, 0],
        end: [12, 50],
    },
    {
        start: [13, 0],
        end: [13, 50],
    },
    {
        start: [14, 0],
        end: [14, 50],
    },
    {
        start: [15, 0],
        end: [15, 50],
    },
    {
        start: [16, 0],
        end: [16, 50],
    },
    {
        start: [17, 0],
        end: [17, 50],
    },
    {
        start: [18, 0],
        end: [18, 50],
    },
    {
        start: [19, 0],
        end: [19, 50],
    },
    {
        start: [20, 0],
        end: [20, 50],
    },
];
const baseUnitDay = 86400000;
const baseUnitHour = 3600000;
const baseUnitMin = 60000;
const dayTime = [0, 1, 2, 3, 4, 5, 6].map(item => item * baseUnitDay);
const lessonTime = pattern.map(item => {
    return {
        start: item.start[0] * baseUnitHour + item.start[1] * baseUnitMin,
        end: item.end[0] * baseUnitHour + item.end[1] * baseUnitMin
    }
});

const getStartNextWeek = () => {
    const now = new Date();
    const date = now.getDate();
    const day = (now.getDay() == 0) ? 7 : now.getDay();
    const month = now.getMonth();
    const year = now.getFullYear();
    const adding = (8 - day) * baseUnitDay;
    const subtracting = (day - 1) * baseUnitDay;
    const compensation = (start_from_next_week) ? adding : -subtracting;
    const startToday = (new Date(year, month, date)).getTime();
    return (new Date(startToday + compensation)).getTime();
}

const startNextWeek = getStartNextWeek();
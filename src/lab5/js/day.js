document.getElementById('datepicker').addEventListener('change', function () {
    let selectedDate = new Date(this.value);
    if (!isNaN(selectedDate.getTime())) {
        let day = selectedDate.getDate();
        let month = selectedDate.getMonth() + 1;
        let year = selectedDate.getFullYear();

        if (month <= 2) {
            month += 12;
            year -= 1;
        }

        let a = Math.floor((14 - month) / 12);
        let y = year - a;
        let m = month + 12 * a - 2;
        let dayOfWeek = (day + y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + Math.floor(31 * m / 12)) % 7;

        let daysOfWeek = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];
        document.getElementById('result').textContent = daysOfWeek[dayOfWeek];
    }
});

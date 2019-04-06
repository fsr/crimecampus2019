const btnsend = document.getElementById("btnsend");
const password = document.getElementById('password');
const table = document.getElementById('table');
btnsend.addEventListener('click', function () {
    let pw = password.value;
    if (pw == "geheim") {
        window.location.replace("/prototypes/filters/");
    }
    else {
        let color1 = Math.floor((Math.random() * 10));
        let color2 = Math.floor((Math.random() * 10));
        let color3 = Math.floor((Math.random() * 10));
        table.style.backgroundColor = "#" + color1 + color2 + color3;
        table.style.borderColor = "#" + color1 + color2 + color3;
        let color4 = 9 - color1;
        let color5 = 9 - color2;
        let color6 = 9 - color3;
        table.style.color = "#" + color4 + color5 + color6;
    }
});
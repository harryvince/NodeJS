let ts = Date.now();
let date_ob = new Date(ts);
let year = date_ob.getFullYear();
let footer = document.getElementById('DynamicFooter');
footer.innerText = "Harry Vince - "+year;
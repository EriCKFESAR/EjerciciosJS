/* < Mosuse Hover > */
const panelElemets = document.querySelectorAll('.box-hover');
const body = document.querySelector('body');

for (const element of panelElemets) {
    element.addEventListener('mouseover', (e) => body.style.backgroundColor = e.currentTarget.style.backgroundColor);
    element.addEventListener('mouseout', () => body.style.backgroundColor = '#FBFBFB');
}
/* </ Mosusehover > */

/* < Conversor de unidades > */
const convForm = document.getElementById('conversor');
const fecha = document.getElementById('fecha');
const apiBanjico = "https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718,SF46410/datos/oportuno?";
const token = "df57a2348b7b35913056cd83a29760c6a5c3afdfe8a716a66f960e0448bafdfe";
const cambio = [];

fetch(`${apiBanjico}token=${token}`).then(res => res.json()).then(data => {
    fecha.innerHTML += data.bmx.series[1].datos[0].fecha;
    for (const item of data.bmx.series) {
        if(item.idSerie == 'SF43718') cambio['dolar'] = item.datos[0].dato;
        if(item.idSerie == 'SF46410') cambio['euro'] = item.datos[0].dato;
    }
    cambio['peso'] = 1;
});

convForm.addEventListener('submit', (e) => {
    e.preventDefault();
    convForm['salida'].value = ((convForm['entrada'].value * cambio[convForm['mi-divisa'].value]) / cambio[convForm['conv-a'].value]).toFixed(2)
})
/* </ Conversor de unidades > */

/* < Password > */
const contrasena = document.getElementById('contrasena');
const llavePublica = "0ada7fbc5b952174153d073ea6b6b4e3";

contrasena.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(CryptoJS.MD5(contrasena['entrada'].value).toString() == llavePublica? 'Acceso Consedido' : 'Acceso denegado');
});
/* </ Password > */

/* < Saludo > */
const saludo = document.getElementById('saludo');
const panelSaludo = document.getElementById('panelSaludo');
const hora = new Date();

saludo.addEventListener('submit', (e) => {
    e.preventDefault();
    panelSaludo.innerHTML = `Hola ${saludo['entrada'].value} que tengas ${getSaudo(hora.getHours())}` 
})

function getSaudo(aux){
    if(aux > 18) return 'buenas noches.';
    if(aux > 12) return 'buenas tardes.';
    return 'buenos dias.';
}
/* </ Saludo > */
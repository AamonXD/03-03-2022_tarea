//1- Paso
let form = document.querySelector('#formulario');
let citas = [];
let btnLimpiar = document.querySelector('.btnLimpiar');


form.addEventListener('submit', e => {
    e.preventDefault();

    getDatos();
});

btnLimpiar.addEventListener('click', () => {
    form.reset();
});

const getDatos = () => {
    let name = document.getElementById('nombre').value;
    let date = document.getElementById('fecha').value;
    let time = document.getElementById('hora').value;
    let symptoms = document.getElementById('sintomas').value;

    if (name === 0 || date == 0 || time === 0 || symptoms === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debes rellenar todos los campos',
            footer: '<a href="">Por favor hazlo de nuevo</a>'
          })
    }else {
        let registrarCitas = {
            id: Math.round(Math.random()*(100-1)+1),
            name,
            date,
            time,
            symptoms
        };
        console.log(registrarCitas);
    
            
        const keyClave = JSON.parse(localStorage.getItem('citasLlave'));
    
        if (keyClave !== null) {
            keyClave.unshift(registrarCitas); 
            localStorage.setItem('citasLlave', JSON.stringify(keyClave));
        } else {
            citas.unshift(registrarCitas);
            localStorage.setItem('citasLlave', JSON.stringify(citas));    
        }
    
        getLocalStorage();
    
    };
    }

   



//2 paso - listar

let listarCitas = document.getElementById('listarCita');

const getLocalStorage = () =>{
    listarCitas.innerHTML = '';
    let getCitaFromLocalStorage = JSON.parse(localStorage.getItem('citasLlave'));

    getCitaFromLocalStorage.map(cita => {
        const {id, name, date, time, symptoms} = cita;

        listarCitas.innerHTML += `
        <td>${name}</td>
        <td>${date}</td>
        <td>${time}</td>
        <td>${symptoms}</td>
        <td><button id= ${id} class="btn btn-danger">Delete</button></td>

        `
    });


};


// 3 paso - cargar DOM

document.addEventListener('DOMContentLoaded', getLocalStorage)

//4 paso - btn borrar

listarCitas.addEventListener('click', e => {
    console.log(e);

    const btnDelete = e.target.classList.contains('btn-danger');
    
    const id = e.target.id;
    console.log(id);
    const local = JSON.parse(localStorage.getItem('citasLlave'));

    const buscar = local.find(data => data.id === Number(id));
    console.log(buscar);

    if (btnDelete) {
        local.forEach((element, index) => {
            if (element.id === buscar.id) {
                local.splice(index, 1);
                localStorage.setItem('citasLlave', JSON.stringify(local))
                getLocalStorage();
            };
        });
    };
});

//5 paso - busqueda por nombre

let btnBuscar = document.getElementById('btnBuscar');
let buscarName = document.getElementById('busqueda');

btnBuscar.addEventListener('click', e => {
    e.preventDefault();

    let inputBuscar = document.getElementById('inputBuscar').value;
    let data = JSON.parse(localStorage.getItem('citasLlave'));

    let filtro = data.filter(datos => datos.name.toLowerCase().includes(inputBuscar.toLowerCase()));
    console.log(filtro);

    buscarName.innerHTML = '';
    filtro.length === 0 ?
            buscarName.innerHTML += `<div>El nombre ${inputBuscar} No existe</div>`
    :
    filtro.map(cita => {
        const {name, date, time, symptoms} = cita
        buscarName.innerHTML += `
        <div>
            <div><h1>${name}</h1></div>
            <div>
                <h3>${date}</h3>
                <h3>${time}</h3>
                <h3>${symptoms}</h3>
            </div>
        </div>        
        `
    });
});




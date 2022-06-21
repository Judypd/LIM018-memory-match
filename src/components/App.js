//
// Para incluir los diferentes sets de cartas podemos _importar_ el archivo
// JavasSript que contenga el `export` correspondiente...
//
//
// O alternativamente podríamos cargar el JSON de forma asíncrona usando
// `fetch` en el momento que consideremos necesario.
//
// fetch('./data/pokemon/pokemon.json')
//   .then(resp => resp.json())
//   .then(console.log)
//   .catch(console.error);
//

import data from '../data/pokemon/pokemon.js';
import {stopCounter} from './timer.js';

import  createMedals from './medallas.js'



let score = 0;
let countTurn = 0;
const puntaje = document.getElementById("puntos");
const mensaje = document.getElementById("mensaje");
const turn = document.getElementById("turnos");
const modalContainer = document.getElementById("modalContainer")


const itemsPokemon = [...data.items, ...data.items];
console.log(itemsPokemon)

//const dobleitems = [...itemsPokemon, ...itemsPokemon];
//console.log(dobleitems)
 
function shuffle (array){    // Función para barajar cartas y desordenarlas
  const sortedArray = array.sort(()=>{return Math.random()-0.5});//utilizamos sort para desordenar los 18 items mediante el método math.random
  return [...sortedArray]
}

const sortedPokemon = shuffle(itemsPokemon);
console.log(sortedPokemon)


const createCards = () => {
  const areaCarta = document.createElement('div');
  areaCarta.className = "areaCarta";

  sortedPokemon.forEach(item => {
    //Creando div "tarjeta"
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";
    tarjeta.setAttribute("data-pokemonid",`${item.id}`);
  
    //Creando div "cara posterior"
    const caraPosterior = document.createElement("div");
    caraPosterior.className = "cara posterior";
    caraPosterior.setAttribute("id", "posterior");
    //Creando variable para presentar imagen de pokemon
    const imagePokemon = document.createElement("img");
    imagePokemon.src = `${item.image}`;
    caraPosterior.appendChild(imagePokemon);

    //Creando div "cara superior"  
    const caraSuperior = document.createElement("div");
    caraSuperior.className = "cara superior";
    //Creando variable para presentar imagen de signo de interrogación
    const imagePregunta = document.createElement("img");
    imagePregunta.src = "./img/signo-de-interrogacion.png";
    caraSuperior.appendChild(imagePregunta);

    tarjeta.appendChild(caraPosterior);
    tarjeta.appendChild(caraSuperior);
    areaCarta.appendChild(tarjeta);

    tarjeta.addEventListener("click",flipCards)
  });
  
  return areaCarta

}


//console.log(theTarget);
let selection =[];
function flipCards (e) {
  e.currentTarget.style.transform = "rotateY(180deg)";
  console.log(e.currentTarget)
  selection.push(e.currentTarget);
  const selectLength= selection.length
  
  if (selectLength == 2){
  deseleccionar(selection);
  winner(selection);
  counterTurns(selection);
 
  selection = [];
  }
}

//console.log(e.currentTarget.dataset.pokemonid)
function deseleccionar(selecciones) {
  setTimeout(()=> {
      if (selecciones[0].dataset.pokemonid != selecciones[1].dataset.pokemonid){
        selecciones[0].style.transform = "rotateY(0deg)";
        selecciones[1].style.transform = "rotateY(0deg)";
      }
    },1100);
}

function winner(selecciones){
  if (selecciones[0].dataset.pokemonid == selecciones[1].dataset.pokemonid){
    score +=100
    puntaje.innerHTML = `${score}`
    if(score == 900) {
      modalContainer.style.opacity = "1";
      modalContainer.style.visibility ="visible";
      const win = document.createElement ("div");
      win.className = "ganador"
      win.textContent = "Ganaste"
      mensaje.appendChild(win);
      createMedals(countTurn)
      stopCounter()
    }
    
  }
}

function counterTurns(){
  countTurn++
  turn.innerHTML = `${countTurn}`
  return countTurn
}

/*function loser (){
  if(segundos == 0 && score < 900){
    const perdiste = document.createElement ("div");
        perdiste.className = "perdedor"
        perdiste.textContent = " INTÉNTALO OTRA VEZ";
        mensaje.appendChild(perdiste);
  }

}
*/
export default createCards;

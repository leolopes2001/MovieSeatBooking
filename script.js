const movieSelect = document.getElementById('movie')
const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')

let ticketPrice = +movieSelect.value



//Save Selected movie e price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('slectedMvoiePrice', moviePrice)

}

movieSelect.addEventListener('change', (e) =>{
    ticketPrice = e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    updatedCount()
})

function updatedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected')

    //Copy selected seats into arr
    //Map through array
    //Return a new Array indexes
    
    const seatsIndex = [...selectedSeats].map(function(seat ){
        return [...seats].indexOf(seat)
    })


    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))


    const numberOfseats = selectedSeats.length
    count.innerText = numberOfseats 
    total.innerText = numberOfseats * ticketPrice
}

//Get data from localstorage and populateUI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

    //Verificando se tem algo no armazenamento local

    //Verificando se o array não esta vazio
   
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) =>{

            /* Ele pega o seat e o index do seat de todos os assentos,ai ele compara todos, se algum desse indexs tiver no array dos seats que foram selecionados anteriormente ,ele pega esse seat e coloca a classe 'selected' */
             
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    }


    const movieIndex = localStorage.getItem('selectedMovieIndex')
    const moviePrice = localStorage.getItem('selectedMoviePrice')

    if(movieIndex !== null){
        movieSelect.selectedIndex = movieIndex
    }
    

}


container.addEventListener('click', e => {

    if (e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected')
        updatedCount()
    }
})

populateUI()

//Initial count and total

updatedCount()
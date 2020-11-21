const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieselect = document.getElementById('movie');
populateUI();
let ticketPrice = +movieselect.value;
//save selected movie index and price
function setMovieData(movieIndex,moviePrice){
	localStorage.setItem('selctedMovieIndex', movieIndex);
	localStorage.setItem('selctedMoviePrice', moviePrice);  
	
}
function updateSelectedCount(){
	const selectedSeats=document.querySelectorAll('.row .seat.selected');

	//console.log(selectedSeats);
	  //copy selected seats into arr
	  //Map through array
	  //return a new array  indexes
	const seatsIndex = [...selectedSeats].map(function(seat){
		return [... seats].indexOf(seat);
	});
	localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex)); 
	//	console.log("~"+ seatsIndex);
	const selectedSeatsCount = selectedSeats.length;
	count.innerText = selectedSeatsCount;
	total.innerText=selectedSeatsCount*ticketPrice;
}

// get data from localstorage and populate ui
function populateUI(){
	const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));
	console.log(selectedSeats);
	if(selectedSeats !== null && selectedSeats.length>0){
		seats.forEach((seat,index)=>{
			if(selectedSeats.indexOf(index)>-1){
				seat.classList.add('selected');
			}
		} );
	}
	const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
	if(selectedMovieIndex !==null){
		movieSelect.selectedIndex=selectedMovieIndex;
	}
}


//Movie select event
movieselect.addEventListener('change',function(e){
	ticketPrice= +e.target.value;
	setMovieData(e.target.selectedIndex);
	updateSelectedCount();

});
//Seat click event
container.addEventListener('click',function(e){
	if(
		e.target.classList.contains('seat') && 
		!e.target.classList.contains('occupied')){
		e.target.classList.toggle('selected');
	 updateSelectedCount();
	}
	
});
// Initial count and total se
updateSelectedCount();



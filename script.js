const rain=["Rain","Drizzle"];
const skycons = new Skycons({"color": "#F5F5F5"});
//skycons.add("icon", Skycons.PARTLY_CLOUDY_DAY);
//skycons.play();

document.getElementById("c").addEventListener('click',()=>{
	let long;
	let lat;
	let temperatureDesc=document.querySelector(".temperature-description")
	let temperatureDeg=document.querySelector(".temperature-degree")
	let location=document.querySelector(".location-timezone")
	
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position=>{
			console.log(position);
			long=position.coords.longitude;
			lat=position.coords.latitude;
			const api=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=50876041e8b0c7db0f2d2f83a1e3b894`
		fetch(api).then(response=>{
			return response.json();
		}).then(data=>{//console.log(data);
			console.log(data.main.temp);
			console.log(data.weather[0].main+": "+data.weather[0].description);
			console.log(data.name);

			//set dom elements from the api
			
			temperatureDeg.textContent=data.main.temp;
			

			temperatureDesc.textContent=data.weather[0].description;
			location.textContent=data.name+"/"+data.sys.country;
			setIcons("icon",getIconId(data.weather[0].main));

		});
			


		});

		
	}else{
		h1.textContent="Please enable location"
	}
});

window.addEventListener('load',()=>{
	
	let temperatureDesc=document.querySelector(".temperature-description")
	let temperatureDeg=document.querySelector(".temperature-degree")
	let location=document.querySelector(".location-timezone")
	
	
	const api=`https://api.openweathermap.org/data/2.5/weather?q=Agartala&units=metric&appid=50876041e8b0c7db0f2d2f83a1e3b894`
	fetch(api).then(response=>{
			return response.json();
		}).then(data=>{//console.log(data);
			console.log(data.main.temp);
			console.log(data.weather[0].main+": "+data.weather[0].description);
			console.log(data.name);

			//set dom elements from the api
			
			temperatureDeg.textContent=data.main.temp;
			

			temperatureDesc.textContent=data.weather[0].description;
			location.textContent=data.name+"/"+data.sys.country;
			setIcons("icon",getIconId(data.weather[0].main));

		});
		
	
});






function getIconId(main){
	if(rain.includes(main)){
		return Skycons.RAIN;
	}
	if (main == "Thunderstorm"){
		return  Skycons.SLEET;
	}
	if (main =="Clear"){
		const hours = new Date().getHours()
		if(hours > 5 && hours < 18){
			return  Skycons.CLEAR_DAY;
		}
		else{
			return Skycons.CLEAR_NIGHT;
		}

	}
	if (main =="Clouds"){
		const hours = new Date().getHours()
		if(hours > 5 && hours < 18){
			return  Skycons.PARTLY_CLOUDY_DAY;
		}
		else{
			return Skycons.PARTLY_CLOUDY_NIGHT;
		}
	
	}
	return Skycons.FOG;
}



function setIcons(icon,iconID){
	skycons.set(icon, iconID);
	skycons.play();
}

// api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=50876041e8b0c7db0f2d2f83a1e3b894
//https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&units=metric&appid=3b66a0265e71c035cfbae51edf251f70
//https://api.openweathermap.org/data/2.5/weather?q=Agartala&units=metric&appid=3b66a0265e71c035cfbae51edf251f70
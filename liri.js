const env     = require("dotenv").config();
const keys    = require("./keys.js");
const Spotify = require("node-spotify-api");
const Twitter = require("twitter");
const request = require("request");
const fs      = require("fs");
const spotify = new Spotify(keys.spotify);
const client  = new Twitter(keys.twitter);

let input     = process.argv[2];

function writeLog(act,input){

}

function processInput(inp,inp2){

	switch(inp){

		/* Print latest 20 tweets */

		case "my-tweets":{
			
			var params = {screen_name: 'hot_poppers',
						  count:       20            };

			client.get('statuses/user_timeline', params, function(error, tweets, response) {

			  if (!error) {

			    tweets.forEach(p => console.log(`@${p.user.screen_name}: ${p.text}`));

			  } else {

			  	console.log(error);

			  }

			});
			break;
		}

		/* Show information about a song */

		case "spotify-this-song":{
			
			let song;

			if(inp2)
				song = inp2;

			else if(process.argv[3])
				song = process.argv[3];

			else
				song = `The Sign`;

			spotify.search({ type: 'track,artist', query: song }, function(err, data) {

			  if (err) {
			    return console.log('Error occurred: ' + err);
			  }

			  let found = false;
			 
			  if(song == `The Sign`)
				  data.tracks.items.forEach(p =>{
				  	if(p.artists[0].name === "Ace of Base" && !found){ 
					  	console.log(`Track:   ${p.name}`);
					  	console.log(`Artists: ${p.artists[0].name}`); 
					    console.log(`Albums:  ${p.album.name}`); 
			 			console.log(`Preview: ${p.preview_url}`); 
				  		found = true;
				  	}
				  });

			  else{

			  	let artists = "";
			  	for(let i = 0 ; i < data.tracks.items[0].artists.length; ++i){
			  		artists += data.tracks.items[0].artists[i].name;
			  		if(i !== data.tracks.items[0].artists.length - 1)
			  			artists+=", ";
			  	}

			  	console.log(`Track:   ${data.tracks.items[0].name}`);
			  	console.log(`Artists: ${artists}`); 
			    console.log(`Albums:  ${data.tracks.items[0].album.name}`); 
	 			console.log(`Preview: ${data.tracks.items[0].preview_url}`); 
			    	
			  }



			});

			break;
		}

		/* Movie info */

		case "movie-this":{

			/* * Title of the movie.
	           * Year the movie came out.
	           * IMDB Rating of the movie.
	           * Rotten Tomatoes Rating of the movie.
	           * Country where the movie was produced.
	           * Language of the movie.
	           * Plot of the movie.
	           * Actors in the movie.*/

	           break;
		}

		default: {
			console.log("I'm sorry Dave, I'm afraind I can't do that.");
		}
	}

 }

if(input === "do-what-it-says"){
	console.log("liri is listening");
	fs.readFile("random.txt","utf8",function(error,data){
		if(error)
			return console.log("error");

		let splitData = data.split(",");
		processInput(splitData[0],splitData[1]);

	});

} else {
	processInput(input);
}

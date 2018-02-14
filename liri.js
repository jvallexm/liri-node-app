const env     = require("dotenv").config();
const keys    = require("./keys.js");
const Spotify = require("node-spotify-api");
const Twitter = require("twitter");
const request = require("request");
const fs      = require("fs");
const spotify = new Spotify(keys.spotify);
const client  = new Twitter(keys.twitter);

let input     = process.argv[2];

function logAndLog(txt){

	console.log(txt);
	addToLog(`${txt}, `)

}

function addToLog(txt){

	fs.appendFile("./log.txt",txt,function(err){
		if(err)
			console.log(err);
	});

}

function processInput(inp,inp2){

	switch(inp){

		/* Print latest 20 tweets */

		case "my-tweets":{
			
			var params = {screen_name: 'hot_poppers',
						  count:       20            };

			client.get('statuses/user_timeline', params, function(error, tweets, response) {

			  if (!error) {

			    tweets.forEach(p => logAndLog(`@${p.user.screen_name}: ${p.text} @ ${p.created_at}`));

			  } else {

			  	logAndLog(error);

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
			{
				song = process.argv[3];
				addToLog(`${song}, `)
			}

			else
				song = `I Hate the Weekend`;

			spotify.search({ type: 'track,artist', query: song }, function(err, data) {

			  if (err) {
			    return console.log('Error occurred: ' + err);
			  }

			  let found = false;

			  	let artists = "";
			  	for(let i = 0 ; i < data.tracks.items[0].artists.length; ++i){
			  		artists += data.tracks.items[0].artists[i].name;
			  		if(i !== data.tracks.items[0].artists.length - 1)
			  			artists+=", ";
			  	}

			  	logAndLog(`Track:   ${data.tracks.items[0].name}`);
			  	logAndLog(`Artists: ${artists}`); 
			    logAndLog(`Album:   ${data.tracks.items[0].album.name}`); 
	 			logAndLog(`Preview: ${data.tracks.items[0].preview_url}`); 
			

			});

			break;
		}

		/* Movie info */

		case "movie-this":{

	        let title;

	        if(inp2)
	        	title = inp2;
	        else if(process.argv[3]){
	        	title = process.argv[3];
	        	addToLog(`${title}, `);
	        }
	        else 
	        	title = "Mr. Nobody";

	        request(`http://www.omdbapi.com/?t=${title}&y=&plot=short&apikey=trilogy`, function(e, r, b) {

			  // If the request is successful (i.e. if the response status code is 200)
			  if (!e && r.statusCode === 200) {

			   let data = JSON.parse(b);

			   logAndLog(`Title: ${data.Title}`);
			   logAndLog(`Year: ${data.Year}`);
			   data.Ratings.forEach(p =>{
			   	  if(p.Source === `Internet Movie Database` || p.Source === `Rotten Tomatoes`)
			   	  	logAndLog(`${p.Source} Rating: ${p.Value}`);
			   });
			   logAndLog(`Contry: ${data.Country}`);
			   logAndLog(`Language: ${data.Language}`);
			   logAndLog(`Plot: ${data.Plot}`);
			   logAndLog(`Actors: ${data.Actors}`);
			  }

			});
	        break;
		}

		default: {
			console.log("I'm sorry Dave, I'm afraid I can't do that.");
		}
	}

}

addToLog(`${input}, `);

if(input === "do-what-it-says"){

	fs.readFile("random.txt","utf8",function(error,data){
		if(error)
			return console.log("error");

		let splitData = data.split(",");
		processInput(splitData[0],splitData[1]);

	});

} else {
	processInput(input);
}

const env     = require("dotenv").config();
const keys    = require("./keys.js");
const Spotify = require("node-spotify-api");
const Twitter = require("twitter");
const spotify = new Spotify(keys.spotify);
const client  = new Twitter(keys.twitter);

let input     = process.argv[2];

function writeLog(act,input){

}

switch(input){

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

	case "spoitify-this-song":{
		console.log("DO A SONG");
		let song;

		if(process.argv[3])
			song = process.argv[3];
		else
			song = `"The Sign" by Ace of Base`;

		// Artist(s)
		// Song's name
		// Preview link
		// Album song is from

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

	/* Do things from random txt */

	case "do-what-it-says":{

	}

	default: {
		console.log("Hot Poppers!");
	}
}
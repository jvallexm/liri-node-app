# Liri Node App

A simple node application to get data from the command line that saves your commands in a `log.txt` file.

## Getting Started

Silmply clone the repo, install the package dependencies, and run Liri via the command line.

### Prerequisites

You'll need the following npm packages:

   * [Twitter](https://www.npmjs.com/package/twitter)
   
   * [Spotify](https://www.npmjs.com/package/node-spotify-api)
   
   * [Request](https://www.npmjs.com/package/request)

   * [DotEnv](https://www.npmjs.com/package/dotenv)

### Installing   

You'll  need credentials from the [Spotify API](https://developer.spotify.com/my-applications/#!/) and [Twitter API](https://apps.twitter.com/app/new) in your `.env` file

## Using Liri

### My Tweets

You can use Liri in Node from the command line to view the latest 20 of my personal human tweets 

```
node liri my-tweets
```

### Spotify This Song

Liri can get song data from the spotfy API and return the track name, artists, album, and a preview (if available). 

```
node liri spotify-this-song "What's Your Fantasy?"
```

returns 
```
Track:   What's Your Fantasy (Featuring Shawna)
Artists: Ludacris, Shawnna
Albums:  Back For The First Time
Preview: null
```

If you don't pass a song, Liri will return data for [I Hate the Weekend](https://www.youtube.com/watch?v=DhPdDvT3wHk) by Tacocat

```
node liri spotify-this-song
```

### Movie This

Using the [OMDB API](http://www.omdbapi.com/) Liri gets data about movies and returns, the title, year, IMDB rating, Rotten Tomatoes Rating, Country of production, Language(s), a brief plot summary, and a list of the actors.

```
node liri movie-this "Mad Max Fury Road"
```

returns

```
Title: Mad Max: Fury Road
Year: 2015
Internet Movie Database Rating: 8.1/10
Rotten Tomatoes Rating: 97%
Contry: Australia, USA
Language: English, Russian
Plot: A woman rebels against a tyrannical ruler in postapocalyptic Australia in search for her home-land with the help of a group of female prisoners, a psychotic worshipper, and a drifter named Max.
Actors: Tom Hardy, Charlize Theron, Nicholas Hoult, Hugh Keays-Byrne
```

### Do What it Says

Liri can also get a command stored in the `random.txt` file separated by commas. The default is set to `movie-this,"But I'm a Cheerleader"`.

```
node liri do-what-it-says
```

returns

```
Title: But I'm a Cheerleader
Year: 1999
Internet Movie Database Rating: 6.6/10
Rotten Tomatoes Rating: 35%
Contry: USA
Language: English
Plot: A naive teenager is sent to rehab camp when her straitlaced parents and friends suspect her of being a lesbian.
Actors: Natasha Lyonne, Michelle Williams, Brandt Wille, Bud Cort
```

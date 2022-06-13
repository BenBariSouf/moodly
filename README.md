# Moodly

> A Web app that uses Spotify's Web API to generate a playlist of tracks that match your selected "mood" and genres.

Check it out [here.](http://moodly-one.vercel.app/)

## Overview

Once authorized, Moodly prompts the user to select their current mood by draging an intercative character across a defined area called the mood selector. They can then select the desired genre of tracks they would like moodly to recommend them(maximum of 5 genres).

If they like the recommended playlist, the user has the option to save it to their spotify account for later listening.

The "mood" is represented as a combination of happiness (valence) and energy levels, each on a scale of 0 to 1. Spotify's recommendation API lets you set a minimum and maximum values for these properties as a seed, and get tracks that match those properties.

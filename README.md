## [Google Places Search](http://dianpan.github.io/google-places-search) by Dian Pan
This is a simplified version of the [Google Maps](https://www.google.com/maps) search feature. Users can search for a specific address or places within a city or location.  Results display on the left hand navigation bar as well as on the map itself as indicated by pins.  Clicking on either the result list item or the pin will bring up additional
information on each location.

### Technologies
* Javascript
* Jquery
* Google [Places](https://developers.google.com/places/) API

### Notes
- the CSS and JS files have been minified and compressed down to one file each,
to improve page load time.  The original files are available in the respective
folders.

### Things I thought about/struggled with
- pagination of results: a better user experience would be to limit the number of results instead
of displaying the API's default of 20 results.  Unfortunately, I did not see a way within their
documentation to limit the result number.
- security: it would be preferable not to expose my Google Maps API token within the call to
Google's API but unfortunately the URL did not concatenate correctly when I hid used a variable
to hide my API token.
- documentation: the google places api documentation was not as comprehensive as I would have liked,
I struggled to find documentation on the available attributes I could access.

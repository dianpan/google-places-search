## [Google Places Search](http://dianpan.github.io/google-places-search) by Dian Pan
This is a simplified version of the [Google Maps](https://www.google.com/maps) search feature. Users can search for a specific address or places within a city or location.  Results display on the left hand navigation bar as well as on the map itself as indicated by pins.

### Some additional things I thought about/struggled with:
- pagination of results: a better user experience would be to limit the number of results instead
of displaying the API's default of 20 results.  Unfortunately, I did not see a way within their
documentation to limit the result number.
- security: it would be preferable not to expose my Google Maps API token within the call to
Google's API but unfortunately the URL did concatentate correctly when I hid the token within a variable.
- documentation: the google places api documentation was not as comprehensive as I would have liked,
I struggled to find documentation on the available attributes I could access.

### Technologies
* Javascript
* Jquery
* Google [Places](https://developers.google.com/places/) API

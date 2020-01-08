# Live Dive

https://ringarochkryss.github.io/Milestonetwo/.

### *Dive into the bubbles of beginners Springboard and platform diving* 

Diving is a sport where divers compete in how to perform technical divies as correct as possible. Each dives has different levels of difficulty (DD) and the dives is named with a combination of numbers and letters describing how the dive is to be performed. The different dives is performed on springboards ( 1m and 3m ) and platforms:( 5m ,7.5m and 10m). 

This app is great for beginners of the sport of diving. It provides a variety of information useful for divers and is also ment to be brought to the pool to be used while practicing. Map contents on this app is most useful for users located in Sweden.  

### UX
---
#### Mockups 
##### Marvel Mockup<img src="https://github.com/ringarochkryss/Milestonetwo/blob/master/marvel%20mockup%20.png" height="150">
My first mockup was made in Marvel and it looks great. Unfortunately this is a school project and  I dumped the idea (for now) to be able to show charts. 

I only had one user story here:

* User should go to the pool - chose a level(button) and get a random dive to perform. Over and over again. Since it's used by the pool the buttons is really big.
Data viz should show the dive hight, difficulty etc.

My second mockup looked much less nice - made in word. But hey, I had a couple of things I wanted to do in D3 and I couldn't draw
it anyway. The background to rethink came from my dive instructor. He went practicing outdoors and didn't keep track on winds
and wawes - he got really hurt in a foot.  So I added one map for showing places for cities (with safe indoor dive platforms) and one map for weather and wind. 
And a bubble chart to show all dives listed in a json. Level of difficulty makes the bubbles larger or smaller. The level where you find the dive in the game decides the color of the bubble. 


* User can use this app to keep thrack on weather, winds and temperature before diving outdoor
* user can look for indoor platforms to perform at -wich is safer -and on this site the dive clubs is marked on a map with the platforms they are practicing on. 
* user can see what dives is present on this site and wich dives is sorted for wich level. Also the difficulty of a dive is easy to see on hover.

##### Mobile Mockup with modal<img src="https://github.com/ringarochkryss/Milestonetwo/blob/master/divemockupmobile.png" height="150">
##### Desktop Mockup with modal<img src="https://github.com/ringarochkryss/Milestonetwo/blob/master/divemockupdesktop.png" height="150">

In the last version of the site I added darker background colors and a image of syncronized platform divers in the middle. This to make it  more clear what kind of diving this is about. In swedish we use the word "Swim -jump" for this kind of diving but on english its's more easy to mix it up with scuba diving as both is reffered to as Diving. 

My own "Swim jump" -team calls itself "We who are living on the hope" in swedish the words "hope" and "jump" is the same. So maybe a way to translate it to english would be Live dive - therefore the name on this site. 
### Features
---

* Feature 1: User can see all dives present in this particular Dive App as they are displayed in a colorful Bubble Chart. User can hoover the bubbles to see the level of difficulty of each dive. 

* Feature 2. User can press one of three "level buttons" to choose a level of difficulty for practice. After that the user can press the button "new dive" and he or she will see a randomly selected dive displayed with dive code, difficulty and hight specified. User can change level of difficulty at any time to make the app useful for serveral divers practicing togehter. 

* Feature 3: User can hover a Sweden Map to see where in Sweden there are Diving Clubs teaching this sport. The map markers have different colors depending on the hight of the platform at the Swim Arena. Swich buttons makes it possible to select heights to be desplayed. This is especially helpful for atheltes looking for practicing the highest dives -as high platforms (7.5-10m) is very rare in Sweden.

* Feature 4: User can zoom in an out of a Weather map and see the conditions of temperature and wind. This is useful for outdoor practice. 


### Technologies used
---
* Html5
* CSS
* Javascript
* Jquery
* D3
* Leaflet

### Suggested Contribution
---
* This app only contains dives on beginner-levels, it could be extended with more advanced levels.
* A user input and log in function could be very userful on this site. It should be possible for users to make and name their own dive lists. Also the users should be able to comment the dives with results and coach reviews. 
* A login function for trainers could make it possible to prepare practice for groups and individual divers. 
* The dives could be displayed with images/videos etc. This function could be interactive with users who want to contribute.
* The map of diving clubs only displays arenas where Diving Clubs practice. It could be completed with all Sweden Swim Arenas where Diving is possible and also provide information on good practice environments outdoors.
* The map of diving clubs could have a input for user contribution on good dive sites.
* The leaflet map could have more information on waves since this is important for outdoor practice regarding performance and water depth.

### Testing
---
* This app is tested with Jasmine to see that: 
  * Buttons work in dive app
  * D3 map works and is created with the right sizes on height and width
 * Diveapp and functions in D3 is tested for functionality with blackbox tests from several users
 * Web Validators is used to inspect code.
  

### Deployment
---
This app is deployed at github -to commit to github, creta a new repostory on github.
This app is written in Visual Studio and committed to github with the github addon for VS.

* git add . (all files)
* git commit -m "header" -m "description"
* git push

Final editing of this site is made in Gitpod. The master bransh holds the final version of this app. 

### Credits
---
* I got help with how to test the D3 -map from [Busy people](https://busypeoples.github.io/post/testing-d3-with-jasmine/)
* This is my syntax knight for writing Markup [Adam Pritchard ](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
* The photo of the guy is from [Unsplash](https://unsplash.com/)
* The photo of the girls is from [Fina](www.fina.org)



Thankyou:
* Mentor  Oluwaseun Owonikoko
* Teacher Tim Nelson
* Tutor: Kevin at Code Institute

### License
---
* Student at:
Code Institute 2020
by Petra Mellbrand 2020









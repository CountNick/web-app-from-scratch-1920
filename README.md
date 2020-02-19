# Web App From Scratch 

![Jaar2](https://user-images.githubusercontent.com/47485018/73750395-64639580-475d-11ea-8e5b-65df65fe5064.png)

[live linkk](https://countnick.github.io/web-app-from-scratch-1920/)

# API used

[Rick and morty API](https://rickandmortyapi.com/)

## Downsides

* The api has a maximum call rate of 100000 requests per day, this seems like a lot but when you get caught in a infinite loop you might exceed your request rate very quickly

* The information on characters is a little shallow, there are no bio's for the characters etc. 

# Design patterns

as for now:

* Lazy loading 

* Live search function

* No global variables

* USe tabs to indent code


want to implement:

breadcrumb trails
Search functionality   

# Actor diagram

![actorDiagram](https://i.imgur.com/on3F5KJ.png)

# Interaction Diagram

![interaction](https://i.imgur.com/e0XztH0.png)

# What does the app do?

The app fetches data from the Rick and morty API and renders a card for every character. Users can click on these cards, which will lead them to a detailpage about the character. The detail page holds additional information like: 

* Character species
* Which planet the character is from 

![OVerview](https://i.imgur.com/fSGFwMp.png)
![Detail](https://i.imgur.com/EuPWK6m.png)


[Rubric](https://docs.google.com/spreadsheets/d/e/2PACX-1vTjZGWGPC_RMvTMry8YW5XOM79GEIdgS7I5JlOe6OeeOUdmv7ok1s9jQhzojNE4AsyzgL-jJCbRj1LN/pubhtml?gid=0&single=true)
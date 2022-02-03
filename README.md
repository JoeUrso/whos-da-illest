
# Who's Da Illest?

Inspired by the popular Hip Hop competition Verzuz, Kool Moe Dee’s rap report card, and websites like Miniclip and Addicting Games, “Who’s Da Illest?” combines the competitive nature of Hip Hop music with a criteria based grading system, allowing users to have a say in which rapper reigns supreme.


## Stack

FRONT END - React, JavaScript, HTML5, SASS/SCSS

BACK END - Node.js, Express, Knex, MySQL

## Features

- Rappers ranked by average grade
- Battle Board ranked by battles fought
- Spotify stats for each rapper
- Tooltips to explain each criterion
- Microphone slider used to grade rapper
- Results page to display winner
- Animations and Sound FX
- Responsive


## Installation

```bash
  cd client and npm install
  cd server and npm install
```
- Database
    - cd into server
    - if Knex is not installed
        - $ npm install knex --save
        - $ npm install mysql --save
    - start MySQL
    - CREATE DATABASE whose_da_illest
    - make sure knexfile.js has the appropriate info
    - knex migrate:latest
    - knex seed:run

- Additional info
    - see .env.sample
## API Reference

#### Get all rappers

```http
  GET /rappers
```

#### Patch to update rapper wins and losses
```http
  PATCH /rappers/rapper1-wins
  PATCH /rappers/rapper2-wins
  PATCH /rappers/rapper1-losses
  PATCH /rappers/rapper2-losses
```

#### Get all grades

```http
  GET /grades
```

#### Get rapper avg grades

```http
  GET /grades/avg-grades
```

#### Post new grades

```http
  POST /grades
```

#### Get criteria

```http
  GET /criteria
```

#### Get all battles

```http
  GET /battles
```

#### Patch rapper wins and losses

```http
  PATCH /battles/rapper1
  PATCH /battles/rapper2
```

#### Get spotify data for battles

```http
  GET /battles/rapper-data
```





## Screenshots

![Screen Shot 2022-02-01 at 7 21 07 PM](https://user-images.githubusercontent.com/93886898/152279523-1a947b71-55cc-4b7f-b4f5-acce45157157.jpg)

![Screen Shot 2022-02-01 at 7 20 40 PM 2](https://user-images.githubusercontent.com/93886898/152279527-95ff1ac7-acc6-4c76-a94a-7c5cb97c6a02.jpg)

![Screen Shot 2022-02-01 at 7 23 02 PM 3](https://user-images.githubusercontent.com/93886898/152279535-3e0abac2-4126-468e-9faa-f0d18e8ad08a.jpg)


## Lessons Learned

- How well knex and MySQL work together
- How to make more exciting animations
- How to use sound fx onClick
- How to use state more effectively
- How fun building a passion project can be

## Next Steps

- Set up Oauth using passport.js
- Build a page for users to submit their own battles
- Make necessary changes to support multiple users playing the game
- Deploy
The content below is an example project proposal / requirements document. Replace the text below the lines marked "__TODO__" with details specific to your project. Remove the "TODO" lines.

(__TODO__: your project name)

#  Fit Journal 

## Overview

Fit Journal is a web application designed to help fitness enthusiasts keep track of their fitness journey. 

The app offers a range of features that allow users to create, view, and post their fitness journals, which include training and diet lists. Users can register and login to access their accounts, where they can plan their workouts for the day and cross over each exercise as they finish. In the diet list, users can plan their meals for the day and calculate the total calories. 

Additionally, there is an evaluation functionality that allows users to self-evaluate their progress for the day. 

Whether users are cutting, bulking, or maintaining their physique, Fit Journal provides an ideal and simple platform for monitoring their fitness progress and staying motivated every step of the way.


## Data Model

The application will store Users, Posts and Lists

* users can have multiple posts (via references)
* each posts can have multipe lists and a self-evaluation review (via references)
* each list can have multiple items (by embedding)


An Example User:
```javascript
{
  username: "smartFit001",
  hash: // a password hash,
  posts: // an array of references to Post documents
  email: "smart@nyu.edu",
  height: 175,
  weight: 58,
  age: 22,
}
```

An Example Post with Embedded Items:
```javascript
{
  user: // a reference to a User object
  week: "1";
  day: "1";
  title: "It's gonna be a productive day!",
  lists: // an array of references to List documents
  review: //  references to Review document
  createdAt: // timestamp
}
```

An Example Training List with Embedded Items:

```javascript
{
  user: // a reference to a User object
  name: "Shoulder Workout",
  items: [
    { name: "Seated Dumbbell Press", sets: "4", reps:"6-8",intervals:"1-2 mins", checked: false},
    { name: "Lateral Raises", sets: "4", reps:"10-12",intervals:"1-2 mins", checked: true},
  ],
  createdAt: // timestamp
}
```
An Example Diet List with Embedded Items:

```javascript
{
  user: // a reference to a User object
  name: "Breakfast",
  items: [
    { name: "2 slices of whole-grain toast", calories: "200", protein:"8g",carbs:"12g", checked: false},
   { name: "3 large eggs", calories: "210", protein:"18g",carbs:"0", checked: false},
    { name: "1 medium avocado", calories: "240", protein:"3g",carbs:"12g", checked: false},
   
  ],
  createdAt: // timestamp
}
```

An Example Review:
```javascript
{
  user: // a reference to a User object
  score: "98",
  review: "It really is a very productive day, i;m proud of myself! Tomorrow I'm gonna try to swim a bit.",
  createdAt: // timestamp
}
```


## [Link to Commented First Draft Schema](db.mjs) 



## Wireframes



/login - page for logging in

![log in](documentation/log-in.jpeg)

/signup - page for signing up

![sign up](documentation/sign-up.jpeg)

/posts - page for all the posts from the user

![posts](documentation/posts.jpeg)

/slug - page for a specific post

![slug](documentation/slug.jpeg)


/create - page for create a new post

![create](documentation/create-new.jpeg)

## Site map
![flow-chart](documentation/flow.jpeg)


## User Stories or Use Cases



1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new fit journal post
4. as a user, I can view all of the journal psots I've created 
5. as a user, I can add new post with new lists
6. as a user, I can add items to an existing training list
7. as a user, I can cross off items in an existing training list
8. as a user, I can add items to an existing diet list
9. as a user, I can cross off items in an existing diet list

## Research Topics



* (5 points) Integrate user authentication
    * What is it? User authentication is the process of verifying the identity of a user who wants to access a web application. It usually involves asking the user to enter a username and password, and then checking these credentials against a database of authorized users.
  * Why use it? User authentication is an essential security measure for web applications that handle sensitive data or require user-specific functionality. By requiring users to authenticate themselves before accessing the application, you can prevent unauthorized access and protect user data.
  * List of possible candidate modules or solutions: Passport, Firebase Auth, Okta
* (5 points) Deploy two applications: a fron-end and back-end on Vercel and Heroku.
    * What is it? Vercel is a cloud platform for static sites and serverless functions. Heroku is a cloud platform that provides a platform as a service (PaaS) to deploy, run, and manage applications written in various programming languages.
    * Why use it? Vercel is an ideal platform for React because it is designed for static sites and serverless functions, making it easy to deploy and scale front-end applications. It offers features such as automatic SSL, CDN caching, and serverless functions that are well-suited for React development. Heroku, on the other hand, is a popular choice for back-end development because it provides a platform as a service (PaaS) for deploying, running, and managing applications written in various programming languages. It offers a range of services such as app hosting, database management, and add-ons, making it a versatile platform for back-end development.
* (5 points) ReactJS
    * What is it? ReactJS is a popular JavaScript library for building user interfaces. It allows developers to build complex, interactive UI components using a declarative syntax and a component-based architecture.
    * Why use it? ReactJS makes it easier to build large-scale web applications by breaking down complex UI components into smaller, reusable pieces. It also provides tools for managing state and handling user interactions, making it easier to build robust and responsive applications.
    * List of possible candidate modules or solutions: Redux, React Router, Material-UI



## [Link to Initial Main Project File](app.mjs) 

(__TODO__: create a skeleton Express application with a package.json, app.mjs, views folder, etc. ... and link to your initial app.mjs)

## Annotations / References Used

(__TODO__: list any tutorials/references/etc. that you've based your code off of)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on react](https://www.w3schools.com/react/react_intro.asp) - (add link to source code that was based on this)


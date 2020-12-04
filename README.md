### Tech challenge Cofi

There have been 3 classes created:

- Product: it creates new products with a really simple interface
- Discounts: contains the different discounts and a method for assigning discounts to products
- Basket: it allows you to create basket with different methods. I decided to do it this way so in the future we can assign ids to the baskets and save them later for the users or run different analysis.

Concerning 'Discounts' I considered creating a method that allowed you to create different discounts based on baseType (%, absolute, amount), value (%, €, €/unit, free units), target (item, all basket), etc but I didn't proceed since I thought it was out of the scope of the challenge.

There are also two type of test:

- Unit testing for each class
- Integration to check how the three classes work together

Finally, I would set up a layered architecture for the backend following this structure:
src
│ app.js # App entry point  
└───api # Express route controllers for all the endpoints of the app  
└───config # Environment variables and configuration related stuff  
└───models # Database models  
└───services # All the business logic is here  
└───types # Type declaration files (d.ts) for Typescript  

NOTE1: there's no products.json or any sort of database.  
NOTE2: I have not worked with Git commits despite I usually do it :)

### Run tests

Aftern running 'npm install' in the root folder, you can run the script

```
npm test
```

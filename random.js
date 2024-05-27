class RandomSnippets {
  snippets = [
    // Declaring and initializing a variable
    `// Declaring and initializing a variable
let number = 10;
console.log(number);`,

    // Using string interpolation
    `// Using string interpolation
let firstName = 'Alice';
let lastName = 'Smith';
console.log(\`Full Name: \${firstName} \${lastName}\`);`,

    // Basic arithmetic operations
    `// Basic arithmetic operations
let x = 5;
let y = 3;
console.log('Sum:', x + y);`,

    // Using comparison operators
    `// Using comparison operators
let a = 10;
let b = 20;
console.log(a < b);`,

    // If statement
    `// If statement
let temperature = 25;
if (temperature > 20) {
  console.log('It\'s a warm day!');
}`,

    // Array declaration and accessing elements
    `// Array declaration and accessing elements
let fruits = ['Apple', 'Banana', 'Orange'];
console.log(fruits[0]);`,

    // Looping through an array
    `// Looping through an array
let numbers = [1, 2, 3, 4, 5];
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}`,

    // Adding elements to an array
    `// Adding elements to an array
let colors = ['Red', 'Blue'];
colors.push('Green');
console.log(colors);`,

    // Function declaration and calling
    `// Function declaration and calling
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
greet('Alice');`,

    // Returning a value from a function
    `// Returning a value from a function
function add(x, y) {
  return x + y;
}
console.log(add(3, 5));`,

    // Object declaration and accessing properties
    `// Object declaration and accessing properties
let person = {
  name: 'John',
  age: 30,
  city: 'New York'
};
console.log(person.name);`,

    // Adding a property to an object
    `// Adding a property to an object
let car = {
  brand: 'Toyota',
  color: 'Red'
};
car.year = 2022;
console.log(car);`,

    // Using the '&&' logical operator
    `// Using the '&&' logical operator
let isLogged = true;
let isAdmin = false;
if (isLogged && isAdmin) {
  console.log('Welcome, Admin!');
} else {
  console.log('You do not have admin privileges.');
}`,

    // Using the '||' logical operator
    `// Using the '||' logical operator
let isMember = false;
let isPremium = true;
if (isMember || isPremium) {
  console.log('You have access to premium content.');
} else {
  console.log('Please upgrade to access premium content.');
}`,

    // Using the '!' logical operator (negation)
    `// Using the '!' logical operator (negation)
let isAuthenticated = false;
if (!isAuthenticated) {
  console.log('Please log in to continue.');
}`
  ]

  getSnippet = () => {
    const randomIndex = Math.floor(Math.random() * this.snippets.length);
    return this.snippets[randomIndex];
  }
}


export default new RandomSnippets();
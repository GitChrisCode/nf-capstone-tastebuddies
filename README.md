TasteBuddies

TasteBuddies is a recipe app with a focus on creating menus based on the preferences and dislikes of your guests, along with features like a shopping list and a menu planner.

Features

  - Guest Preferences: Users can specify their taste preferences, including allergies, dietary restrictions, and personal preferences. This allows for personalized menu creation.
  - Menu Creation: Enables users to create menus by selecting from a collection of recipes. Users can combine various appetizers, main courses, side dishes, and desserts to create a complete menu.
  - Menu Recommendation Algorithm: Implements an algorithm that automatically generates suitable menu suggestions based on the preferences and dislikes of the guests.

Technologies Used

  - Frontend: The frontend of the app is built using React, a popular JavaScript library for building user interfaces.
  - Backend: The backend is developed using Java and the Spring Framework, specifically Spring Boot, which provides a robust and efficient server-side infrastructure.
  - Database: MongoDB is used as the database to store recipes, user preferences, and other relevant data.
  - External API: The app integrates with the Spoonacular API to fetch recipes and gather additional information such as ingredients and instructions.

Getting Started

To run the TasteBuddies app locally, follow these steps:

1. Clone the repository: git clone https://github.com/your-username/tastebuddies.git
2. Navigate to the project directory: cd tastebuddies
3. Set up the frontend:
  - Install dependencies: cd frontend && npm install
  - Start the development server: npm start
4. Set up the backend:
  - Open another terminal and navigate to the project directory: cd tastebuddies
  - Build the backend server: mvn clean install
  - Run the backend server: mvn spring-boot:run
 
Make sure to configure the necessary environment variables, such as the API keys required for integration with external services.

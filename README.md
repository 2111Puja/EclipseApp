# Eclipse Restaurant Menu App:
The Eclipse Restaurant Menu App is a React Native application coded in TypeScript, designed for managing and displaying the menu of Eclipse Restaurant. This app enables a chef to:
+ View menu items and filter them by course (Starters, Mains, Desserts)
+ Enter and edit details for each dish, including name, description, and price
+ Calculate the average price of each course

YouTube video link for final POE: https://youtu.be/V8JAmXh_hOs

## Getting Started
1. If you're using React Native, you can say npm expo start in the terminal.
2. You can also run the app on Expo Go on your phone or scan the QR code displayed in the terminal.

## Running the App
1. Clone this repository
2. Install dependencies
3. In the terminal enter: cd ChefApp and npm expo start
4. Start Expo Go: paste the url link

## Features and Screens:
1. Menu Display (MainScreen): View a list of menu items, including the name, description, course and price.
2. Manage Menu (ManageMenuScreen): Navigate to a separate screen to manage the menu items (add, update or delete dish items from the menu).
3. Filtering (FilterMenuScreen): Filter menu items based on their course (Starter, Main, Dessert).
4. Average Price Calculation: Display the average price for each course category.
5. Navigation: Stack-based navigation using React Navigation.
   
## Navigation
This app uses react-navigation with a stack navigator to manage different screens:
1. Menu (Main screen)
2. Manage Menu (Manage menu screen)
3. Filter Menu (Advanced filter screen)

## Changelog: 
Added:
1. Implemented the Menu Screen on the MainScreen to display restaurant menu items including name, description, course, and price.
2. Introduced filtering functionality to filter menu items by course (Starters, Mains, Desserts, or All) on the Advanced Filters Screen.
3. Calculated and displayed the average price for each course on the Menu Screen.
4. Created the Manage Menu Screen to add, update, or remove menu items.
5. Added navigation using React Navigation with a stack navigator between the Menu Screen and Manage Menu Screen.
6. Styled the app with a custom theme, including colours and layout.
7. Ensured that the dish name, description and price display one below the other. The dish name is in a larger font size than the description and price.

##Refractoring:
1. I edited how the prices display on the menu by making the container that it was in smaller.
2. I edited how the price of the dishes in the manage menu screen display.
3. Ensured that the dish, description and price display one below the other - changed the font sizes of the dish name name and made the course font type italics.








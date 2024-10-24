## Eclipse Restaurant Menu App:
This project is a React Native application that is coded in Typescript and is for managing and displaying the menu of Eclipse Restaurant. The app allows a Chef to view menu items, filter them by course (Starters, Mains, Desserts), enter the dish name, dish description and price of a dish item and calculate the average price of each course. Additionally, there is a screen for managing the menu where the Chef can add, edit, or remove items.

## What is needed to run this app?
1. If you're using React Native, you can say npm expo start in the terminal.
2. You can also run the app on Expo Go on your phone or scan the QR code displayed in the terminal.

## Features and Screens:
1. Menu Display (MainScreen) : View a list of menu items, including the name, description, course and price.
2. Manage Menu (ManageMenuScreen) : Navigate to a separate screen to manage the menu items (add, update or delete dish items from the menu).
3. Filtering (FilterMenuScreen) : Filter menu items based on their course (Starters, Mains, Desserts, or All).
4. Average Price Calculation: Display the average price for each course category.
5. Navigation: Stack-based navigation using React Navigation.

## Navigation
This app uses react-navigation with a stack navigator to manage different screens:
1. Menu (Main screen)
2. Manage Menu (Manage menu items)
3. Filter Menu (Filter items)

## Changelog: 
Added:
1. Implemented the Menu Screen on the MainScreen to display restaurant menu items including name, description, course, and price.
2. Introduced filtering functionality to filter menu items by course (Starters, Mains, Desserts, or All) on the Advanced Filters Screen.
3. Calculated and displayed the average price for each course on the Menu Screen.
4. Created the Manage Menu Screen to add, update, or remove menu items.
5. Added navigation using React Navigation with a stack navigator between the Menu Screen and Manage Menu Screen.
6. Styled the app with a custom theme, including colours and layout.
7. Ensured that the dish name, description and price display one below the other. The dish name is in a larger font size than the description and price.









import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ManageMenuScreen from './ManageMenuScreen';
import FilterMenuScreen from './FilterMenuScreen';
import { MenuItem, RootStackParamList } from './types';

// Create the stack navigator
const Stack = createStackNavigator<RootStackParamList>();

// Function to calculate average price for each course
const calculateAveragePrice = (items: MenuItem[], course: string) => {
  const filteredItems = items.filter(item => item.course === course);
  if (filteredItems.length === 0) return 0;
  const totalPrice = filteredItems.reduce((sum, item) => sum + item.price, 0);
  return totalPrice / filteredItems.length;
};

// Main App component
export default function App() {
  const initialDishes: MenuItem[] = []; // Initial state for menu items
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialDishes);

  // Calculate average price for each course
  const averageStartersPrice = calculateAveragePrice(menuItems, 'Starter');
  const averageMainsPrice = calculateAveragePrice(menuItems, 'Main');
  const averageDessertsPrice = calculateAveragePrice(menuItems, 'Dessert');

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Menu Screen */}
        <Stack.Screen name="Menu" options={{ title: 'Eclipse Restaurant Menu' }}>
          {({ navigation }) => (
            <SafeAreaView style={styles.container}>
              <StatusBar style="auto" />
              <View style={styles.headingContainer}>
                <Text style={styles.appName}>Eclipse Restaurant Menu</Text>
              </View>

              {/* Display average prices */}
              <View style={styles.averagePriceContainer}>
                <Text style={styles.averagePriceText}>Average Starters Price: R{averageStartersPrice.toFixed(2)}</Text>
                <Text style={styles.averagePriceText}>Average Mains Price: R{averageMainsPrice.toFixed(2)}</Text>
                <Text style={styles.averagePriceText}>Average Desserts Price: R{averageDessertsPrice.toFixed(2)}</Text>
              </View>

              {/* FlatList for displaying menu items */}
              <FlatList
                data={menuItems} // Display all menu items without filtering
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    {/* Dish name */}
                    <Text style={styles.dishName}>{item.name}</Text>

                    {/* Dish description */}
                    <Text style={styles.dishDescription}>{item.description}</Text>

                    {/* Course type */}
                    <Text style={styles.courseType}>{item.course}</Text>

                    {/* Price */}
                    <View style={styles.priceContainer}>
                      <Text style={styles.priceText}>R{item.price.toFixed(2)}</Text>
                    </View>
                  </View>
                )}
              />

              <Text style={styles.totalItems}>Total Menu Items: {menuItems.length}</Text>

              {/* Navigate to Manage Menu screen */}
              <TouchableOpacity
                style={styles.navigateButton}
                onPress={() => navigation.navigate('Manage Menu', { menuItems, setMenuItems })}
              >
                <Text style={styles.buttonText}>Manage Menu</Text>
              </TouchableOpacity>

              {/* Navigate to Filter Menu Screen */}
              <TouchableOpacity
                style={styles.navigateButton}
                onPress={() => navigation.navigate('FilterMenu', { items: menuItems, navigation })}
              >
                <Text style={styles.buttonText}>Advanced Filters</Text>
              </TouchableOpacity>
            </SafeAreaView>
          )}
        </Stack.Screen>

        {/* Manage Menu Screen */}
        <Stack.Screen name="Manage Menu">
          {({ route, navigation }) => (
            <ManageMenuScreen
              navigation={navigation}
              route={route} // Pass both navigation and route props
            />
          )}
        </Stack.Screen>

        {/* Filter Menu Screen */}
        <Stack.Screen name="FilterMenu">
          {({ route, navigation }) => <FilterMenuScreen items={route.params.items} navigation={navigation} route={undefined} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*Stackoverflow, 2024
  React typescript onClick event typing
  Stackoverflow
  https://stackoverflow.com/questions/70907199/react-typescript-onclick-event-typing
  [Accessed 30 September 2024].*/

/* IIEVC School of Computer Science, 2024
   MAST5112 Guru 02 - Basic UI Design React Native UI Components Fitness Tracker
   IIEVC School of Computer Science
   https://www.youtube.com/watch?v=BNzC7QyoPNk&list=PL480DYS-b_kfYdAhBTh7U6fzNlE3ME7MD&index=8&ab_channel=IIEVCSchoolofComputerScience
   [Accessed 28 September 2024]. */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e5ab',
    padding: 20,
  },
  headingContainer: {
    backgroundColor: '#ffb756',
    justifyContent: 'center',
    marginBottom: 20,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#d2691e',
  },
  averagePriceContainer: {
    backgroundColor: '#ffdb13',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  averagePriceText: {
    fontSize: 18,
    color: '#8b4513',
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#800000',
    backgroundColor: '#fdf4e3',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  dishName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d2691e',
    marginBottom: 5,
  },
  dishDescription: {
    fontSize: 16,
    color: '#8b4513',
    marginBottom: 5,
  },
  courseType: {
    fontSize: 16,
    color: '#a0522d',
    fontStyle: 'italic',
  },
  priceContainer: {
    flex: 1,
    alignItems: 'flex-end', 
  },
  priceText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: '#ffe747', 
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5, 
  },
  totalItems: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  navigateButton: {
    backgroundColor: '#ffb74d',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

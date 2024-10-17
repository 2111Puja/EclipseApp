import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ManageMenuScreen from './ManageMenuScreen'; // Import your ManageMenuScreen
import { MenuItem, RootStackParamList } from './types'; // Import types

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
  const [filter, setFilter] = useState<string>(''); // For course filtering

  // Filter menu items based on the selected course
  const filteredMenuItems = filter
    ? menuItems.filter(item => item.course === filter)
    : menuItems;

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

              {/* Filter buttons */}
              <View style={styles.filterContainer}>
                {['Starter', 'Main', 'Dessert', ''].map(course => (
                  <TouchableOpacity
                    key={course}
                    style={styles.filterButton}
                    onPress={() => setFilter(course)}
                  >
                    <Text style={styles.filterText}>{course ? `${course}s` : 'All'}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Display average prices */}
              <View>
                <Text>Average Starters Price: R{averageStartersPrice.toFixed(2)}</Text>
                <Text>Average Mains Price: R{averageMainsPrice.toFixed(2)}</Text>
                <Text>Average Desserts Price: R{averageDessertsPrice.toFixed(2)}</Text>
              </View>

              {/* FlatList for displaying menu items */}
              <FlatList
                data={filteredMenuItems}
                keyExtractor={(item) => item.id} // Use item.id as key
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <Text style={styles.itemText}>
                      {item.name} - {item.description} ({item.course})
                    </Text>
                    <View style={styles.priceContainer}>
                      <Text style={styles.priceText}>R{item.price.toFixed(2)}</Text>
                    </View>
                  </View>
                )}
              />

              <Text style={styles.totalItems}>Total Menu Items: {filteredMenuItems.length}</Text>

              {/* Navigate to Manage Menu screen */}
              <TouchableOpacity
                style={styles.navigateButton}
                onPress={() => navigation.navigate('Manage Menu', { menuItems, setMenuItems })}
              >
                <Text style={styles.buttonText}>Manage Menu</Text>
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: '#ffdb13',
    padding: 10,
    borderRadius: 8,
  },
  filterText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ff6347',
    backgroundColor: '#fff9e6',
    marginBottom: 10,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#d2691e',
  },
  priceContainer: {
    backgroundColor: '#ffdb13',
    padding: 5,
    borderRadius: 10,
  },
  priceText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  totalItems: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  navigateButton: {
    backgroundColor: '#fff301',
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

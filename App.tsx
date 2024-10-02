import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import React from 'react';

// Define the MenuItem types
type MenuItem = {
  name: string;
  description: string;
  course: string;
  price: number;
};

export default function App() {
  const initialDishes: MenuItem[] = [
    { name: 'Smoked Salmon Crostini', description: 'Delicate smoked salmon elegantly placed on toasted crostini, garnished with a touch of lemon zest and a drizzle of dill-infused cream.', course: 'Starters', price: 180 },
    { name: 'Caprese Salad', description: 'A classic Italian dish made with the freshest heirloom tomatoes, creamy buffalo mozzarella, and fragrant basil leaves, finished with a drizzle of extra virgin olive oil.', course: 'Starters', price: 150 },
    { name: 'Lamb Chops', description: 'Tender, herb-crusted lamb chops, grilled to perfection and served with a rosemary and red wine.', course: 'Main', price: 450 },
    { name: 'Chocolate Mudpie', description: 'A decadent, rich chocolate mudpie with a velvety ganache filling, topped with a dusting of cocoa powder and a dollop of freshly whipped cream.', course: 'Desserts', price: 150 },
  ];
 
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialDishes);

  // New dish states
  const [newDishName, setNewDishName] = useState('');
  const [newDishDescription, setNewDishDescription] = useState('');
  const [newDishCourse, setNewDishCourse] = useState('Starters');
  const [newDishPrice, setNewDishPrice] = useState('');

  const totalMenuItems: number = menuItems.length;
  /*Fetch additional menu items from an external source
  Dev community, 2024
  Fetch with TypeScript
  Dev
  https://dev.to/simonireilly/fetch-with-typescript-for-better-http-api-clients-2d71
  [Accessed 14 September 2024]. */

  // Fetch additional menu items from an external source
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('https://api.chefapp.com/menuItems');
        const data = await response.json();

        setMenuItems([...initialDishes, ...data]);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  // Function to add a new dish
  
  const handleAddDish = () => {
    if (!newDishPrice || isNaN(parseFloat(newDishPrice))) {
      alert("Please enter a valid price");
      return;
    }

    const newDish: MenuItem = {
      name: newDishName,
      description: newDishDescription,
      course: newDishCourse,
      price: parseFloat(newDishPrice),
    };

    setMenuItems([...menuItems, newDish]);

    // Clear the input fields after submission
    setNewDishName('');
    setNewDishDescription('');
    setNewDishPrice('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.headingContainer}>
        <Text style={styles.appName}>Eclipse Restaurant Menu</Text>
      </View>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>
              {item.name} - {item.description} ({item.course}) - R{item.price.toFixed(2)}
            </Text>
          </View>
        )}
      />

      <Text style={styles.totalItems}>Total Menu Items: {totalMenuItems}</Text>

      {/* Input Fields to Add a New Dish */}
      <ScrollView style={styles.inputSection}>
        <Text style={styles.sectionTitle}>Add a New Dish</Text>

        <TextInput
          style={styles.input}
          placeholder="Dish Name"
          value={newDishName}
          onChangeText={setNewDishName}
        />
        <TextInput
          style={styles.input}
          placeholder="Dish Description"
          value={newDishDescription}
          onChangeText={setNewDishDescription}
        />
        <Picker
          selectedValue={newDishCourse}
          style={styles.picker}
          onValueChange={(itemValue) => setNewDishCourse(itemValue)}
        >
          <Picker.Item label="Starters" value="Starters" />
          <Picker.Item label="Main" value="Main" />
          <Picker.Item label="Desserts" value="Desserts" />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Price (R)"
          keyboardType="numeric"
          value={newDishPrice}
          onChangeText={setNewDishPrice}
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddDish}>
          <Text style={styles.buttonText}>Add Dish</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
/*IIEVC School of Computer Science, 2024
  MAST5112 Guru 02 - Basic UI Design React Native UI Components Fitness Tracker
  IIEVC School of Computer Science
  https://www.youtube.com/watch?v=BNzC7QyoPNk&list=PL480DYS-b_kfYdAhBTh7U6fzNlE3ME7MD&index=8&ab_channel=IIEVCSchoolofComputerScience
  [Accessed 28 September 2024]. */

  //Styles for the app UI
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e5ab',
    marginVertical: 1, //margin for the container
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
  itemContainer: {
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
  totalItems: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  inputSection: {
    marginTop: 30,
    backgroundColor: '#fff9e6',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#d2691e',
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#d2691e',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 10,
    backgroundColor: '#ffffff',
  },
  picker: {
    height: 50,
    marginBottom: 12,
    borderColor: '#d2691e',
    borderWidth: 1,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#4682b4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
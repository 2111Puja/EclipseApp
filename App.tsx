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
  const initialDishes: MenuItem[] = [];

  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialDishes);

  // New dish states
  const [newDishName, setNewDishName] = useState('');
  const [newDishDescription, setNewDishDescription] = useState('');
  const [newDishCourse, setNewDishCourse] = useState('Starters');
  const [newDishPrice, setNewDishPrice] = useState('');

  const totalMenuItems: number = menuItems.length;
  
  // Function to add a new dish
  const handleAddDish = () => {
    // Validation: Check if any fields are empty
    if (!newDishName || !newDishDescription) {
      alert('Please fill out all fields.');
      return;
    }

    if (!newDishPrice || isNaN(parseFloat(newDishPrice))) {
      alert('Please enter a valid price'); //Enters a new dish to the menu
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

      <FlatList //renders a scrollable view on the screen
        data={menuItems}
        keyExtractor={(item) => item.name + item.price}
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
          <Picker.Item label="Starters" value="Starters" />  //displays starters on the picker
          <Picker.Item label="Main" value="Main" />  //displays mains on the picker
          <Picker.Item label="Desserts" value="Desserts" />  //displays desserts on the picker
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Price (R)"
          keyboardType="numeric"
          value={newDishPrice}
          onChangeText={setNewDishPrice}
        />
{/*Stackoverflow, 2024
  React typescript onClick event typing
  Stackoverflow
  https://stackoverflow.com/questions/70907199/react-typescript-onclick-event-typing
  [Accessed 30 September 2024].*/}

        <TouchableOpacity style={styles.addButton} onPress={handleAddDish}>
          <Text style={styles.buttonText}>Add Dish</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

{/* IIEVC School of Computer Science, 2024
   MAST5112 Guru 02 - Basic UI Design React Native UI Components Fitness Tracker
   IIEVC School of Computer Science
   https://www.youtube.com/watch?v=BNzC7QyoPNk&list=PL480DYS-b_kfYdAhBTh7U6fzNlE3ME7MD&index=8&ab_channel=IIEVCSchoolofComputerScience
   [Accessed 28 September 2024]. */}

// Styles for the app UI
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
    marginBottom: 20, //creates a margin for the heading container
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

  priceContainer: {
    backgroundColor: '#ffdb13',
    padding: 5,
    borderRadius: 10,
    marginTop: 5,
  
  },

  priceText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',

  },

  totalItems: {
    marginTop: 20, //adds a margin to the total items
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
    marginBottom: 12, //creates a margin for the picker container
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

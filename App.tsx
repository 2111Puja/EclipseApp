import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { useState } from 'react';
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
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { name: 'Smoked Salmon Crostini', description: 'Delicate smoked salmon elegantly placed on toasted crostini, garnished with a touch of lemon zest and a drizzle of dill-infused cream.', course: 'Starters', price: 180 },
    { name: 'Caprese Salad', description: 'A classic Italian dish made with the freshest heirloom tomatoes, creamy buffalo mozzarella, and fragrant basil leaves, finished with a drizzle of extra virgin olive oil.', course: 'Starters', price: 150 },
    { name: 'Lamb Chops', description: 'Tender, herb-crusted lamb chops, grilled to perfection and served with a rosemary and red wine jus.', course: 'Main', price: 450 },
    { name: 'Chocolate Mudpie', description: 'A decadent, rich chocolate mudpie with a velvety ganache filling, topped with a dusting of cocoa powder and a dollop of freshly whipped cream.', course: 'Desserts', price: 150 },
  ]);

  // New dish states
  const [newDishName, setNewDishName] = useState('');
  const [newDishDescription, setNewDishDescription] = useState('');
  const [newDishCourse, setNewDishCourse] = useState('Starters');
  const [newDishPrice, setNewDishPrice] = useState('');

  const totalMenuItems: number = menuItems.length;

  const handleAddDish = () => {
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
        <Text style={styles.appTitle}>Chef's Menu</Text>
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

      /* Input Fields to Add a New Dish */
      <View style={styles.inputContainer}>
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
          placeholder="Price"
          keyboardType="numeric"
          value={newDishPrice}
          onChangeText={setNewDishPrice}
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddDish}>
          <Text style={styles.buttonText}>Add Dish</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e5ab',
    padding: 20,
  },
  headingContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d2691e',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ff6347',
  },
  itemText: {
    fontSize: 16,
    color: '#d2691e',
  },
  totalItems: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#d2691e',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  picker: {
    height: 50,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4682b4',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

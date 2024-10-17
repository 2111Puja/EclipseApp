import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MenuItem, RootStackParamList } from './App'; 
import { Picker } from '@react-native-picker/picker';
import { Dispatch, SetStateAction } from 'react';

// Define the props for the ManageMenuScreen
// Define the props for the ManageMenuScreen component
type ManageMenuScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Manage Menu'>; // Handles navigation
  route: RouteProp<RootStackParamList, 'Manage Menu'>; // Handles the route parameters
};

// ManageMenuScreen component
const ManageMenuScreen: React.FC<ManageMenuScreenProps> = ({ route, navigation }) => {
  const { menuItems, setMenuItems } = route.params; // Extract parameters from route


  const [newItem, setNewItem] = useState<MenuItem>({ id: '', name: '', description: '', course: '', price: 0 });

  // Function to handle adding a new menu item
  const addMenuItem = () => {
    if (newItem.name && newItem.course && newItem.price > 0) {
      setMenuItems(prevItems => [...prevItems, newItem]); // Use functional update
      setNewItem({ id: '', name: '', description: '', course: '', price: 0 });
    } else {
      alert('Please fill in all fields with valid values');
    }
  };

  // Function to remove a menu item by index
  const removeMenuItem = (index: number) => {
    const updatedItems = menuItems.filter((item, i) => i !== index);
    setMenuItems(updatedItems);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Menu</Text>

      {/* Input fields for new menu item */}
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={newItem.name}
        onChangeText={(text) => setNewItem({ ...newItem, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={newItem.description}
        onChangeText={(text) => setNewItem({ ...newItem, description: text })}
      />

      {/* Picker for Course selection */}
      <Picker
        selectedValue={newItem.course}
        onValueChange={(itemValue) => setNewItem({ ...newItem, course: itemValue })}
        style={styles.picker}
      >
        <Picker.Item label="Select Course" value="" />
        <Picker.Item label="Starter" value="Starter" />
        <Picker.Item label="Main" value="Main" />
        <Picker.Item label="Dessert" value="Dessert" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Price (R)"
        keyboardType="numeric"
        value={newItem.price ? newItem.price.toString() : ''}
        onChangeText={(text) => setNewItem({ ...newItem, price: parseFloat(text) || 0 })}
      />

      {/* Add button */}
      <Button title="Add Menu Item" onPress={addMenuItem} />

      {/* List of current menu items with delete functionality */}
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>
              {item.name} - {item.description} ({item.course}) - R{item.price.toFixed(2)}
            </Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => removeMenuItem(index)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

// Styles for the ManageMenuScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3e5ab',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#d2691e',
  },
  input: {
    borderColor: '#d2691e',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff9e6',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
    borderColor: '#d2691e',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff9e6',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ff6347',
    backgroundColor: '#fff9e6',
    borderRadius: 10,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#d2691e',
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ManageMenuScreen;

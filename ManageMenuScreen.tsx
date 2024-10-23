import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MenuItem, RootStackParamList } from './types';
import { Picker } from '@react-native-picker/picker';

type ManageMenuScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Manage Menu'>;
  route: RouteProp<RootStackParamList, 'Manage Menu'>;
};

const ManageMenuScreen: React.FC<ManageMenuScreenProps> = ({ route, navigation }) => {
  const { menuItems, setMenuItems } = route.params;

  const [newItem, setNewItem] = useState<MenuItem>({ id: '', name: '', description: '', course: '', price: 0 });

  const addMenuItem = () => {
    if (newItem.name && newItem.course && newItem.price > 0) {
      setMenuItems(prevItems => [...prevItems, newItem]);
      setNewItem({ id: '', name: '', description: '', course: '', price: 0 });
    } else {
      alert('Please fill in all fields with valid values');
    }
  };

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
      <TouchableOpacity style={styles.addButton} onPress={addMenuItem}>
        <Text style={styles.addButtonText}>Add Menu Item</Text>
      </TouchableOpacity>

      {/* List of current menu items with delete functionality */}
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.dishName}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.course}>{item.course}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{`R${item.price.toFixed(2)}`}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => removeMenuItem(index)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

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
    padding: 20,
    backgroundColor: '#f3e5ab',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#3e2723',
  },
  input: {
    borderColor: '#d4a373',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
    borderColor: '#d4a373',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  addButton: {
    backgroundColor: '#ffb74d',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#A0522D',
    borderColor: '#800000',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
  },
  textContainer: {
    flex: 3,
  },
  priceContainer: {
    flex: 1,
    backgroundColor: '#ffe747', 
    padding: 5,
    alignItems: 'flex-end',
    borderRadius: 20,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#795548',
  },
  description: {
    fontSize: 16,
    color: '#6d4c41',
    marginBottom: 5,
  },
  course: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#8d6e63',
  },
  deleteButton: {
    backgroundColor: '#ff7043',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ManageMenuScreen;

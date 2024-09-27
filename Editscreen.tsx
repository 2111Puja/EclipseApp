import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

interface EditScreenProps {
  navigation: any;
  route: {
    params: {
      itemName: string;
      itemDescription: string;
      itemPrice: string;
      onSave: (updatedItem: { itemName: string; itemDescription: string; itemPrice: string }) => void;
    };
  };
}

export default function EditScreen({ navigation, route }: EditScreenProps) {
  const { itemName: initialItemName, itemDescription: initialItemDescription, itemPrice: initialItemPrice, onSave } = route.params;

  // Initialize state with passed parameters
  const [itemName, setItemName] = useState(initialItemName);
  const [itemDescription, setItemDescription] = useState(initialItemDescription);
  const [itemPrice, setItemPrice] = useState(initialItemPrice);

  const handleSave = () => {
    const updatedItem = { itemName, itemDescription, itemPrice };
    onSave(updatedItem); // Call the onSave function from the previous screen
    navigation.goBack(); // Go back to the previous screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Edit Menu Item</Text>

      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={itemName}
        onChangeText={setItemName}
      />

      <TextInput
        style={styles.input}
        placeholder="Dish Description"
        value={itemDescription}
        onChangeText={setItemDescription}
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={itemPrice}
        onChangeText={setItemPrice}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7b546',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#ffd700',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});

/*
  Code attribution:
  - Stack Overflow, 2024
  - TypeScript: onPress type
  - Source: https://stackoverflow.com/questions/59901680/typescript-onpress-type
  - Accessed: 16 September 2024
*/
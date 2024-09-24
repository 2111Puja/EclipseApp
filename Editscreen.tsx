import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function EditScreen({ navigation }: { navigation: any }) {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const handleSave = () => {
    // Handle saving the new item logic here
    // For example, you could send this data to a server or state management solution
    console.log("New Item Saved:", { itemName, itemDescription, itemPrice });
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
  // code attribution
  // Stackflow, 2024
  // Typescript: onPress type
  // Stackflow
  // https://stackoverflow.com/questions/59901680/typescript-onpress-type
  // [Accessed 16 September 2024].
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

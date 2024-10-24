import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FlatList } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';

// Define props type for navigation
type FilterMenuScreenProps = {
  navigation: StackNavigationProp<any>; 
  route: any; 
  items: { id: string; name: string; course: string; }[]; 
};

const FilterMenuScreen: React.FC<FilterMenuScreenProps> = ({ items, navigation }) => {
  const [selectedType, setSelectedType] = useState('Starter');
  const filteredItems = items.filter(item => item.course === selectedType);

  const handleItemPress = (itemId: string) => {
    // Navigate to another screen or handle item press
    navigation.navigate('ItemDetail', { itemId }); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Menu By Course</Text>
      <Picker
        selectedValue={selectedType}
        onValueChange={(itemValue) => setSelectedType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Starter" value="Starter" />
        <Picker.Item label="Main" value="Main" />
        <Picker.Item label="Dessert" value="Dessert" />
      </Picker>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemPress(item.id)}>
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3e5ab',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#d2691e',
  },
  picker: {
    height: 50,
    width: 200,
    backgroundColor: '#ffdb13',
    marginBottom: 20,
  },
  itemContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff9e6',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    color: '#d2691e',
  },
});

export default FilterMenuScreen;

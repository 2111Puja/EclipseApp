import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import React from 'react';

export default function App() {
  const [menuItems, setMenuItems] = useState([
    { name: 'Smoked Salmon Crostini', description: 'Delicate smoked salmon elegantly placed on toasted crostini, garnished with a touch of lemon zest and a drizzle of dill-infused cream.', price: 180 },
    { name: 'Caprese Salad', description: 'A classic Italian dish made with the freshest heirloom tomatoes, creamy buffalo mozzarella, and fragrant basil leaves, finished with a drizzle of extra virgin olive oil.', price: 150 },
    { name: 'Shrimp Cocktail', description: 'Plump, succulent shrimp served chilled with a zesty homemade cocktail sauce and a hint of horseradish, presented on a bed of crisp lettuce.', price: 190 },
    { name: 'Lamb Chops', description: 'Tender, herb-crusted lamb chops, grilled to perfection and served with a rosemary and red wine jus. Accompanied by truffle mashed potatoes and seasonal vegetables.', price: 450 },
    { name: 'Vegetarian Risotto', description: 'A creamy Arborio rice risotto infused with a medley of wild mushrooms, truffle oil, and parmesan cheese, garnished with fresh herbs and a sprinkle of toasted pine nuts.', price: 320 },
    { name: 'Garlic Butter Lobster Tail', description: 'Succulent lobster tail, perfectly baked and smothered in a rich garlic butter sauce, served with a side of saffron-infused risotto and grilled asparagus.', price: 620 },
    { name: 'Chocolate Mudpie', description: 'A decadent, rich chocolate mudpie with a velvety ganache filling, topped with a dusting of cocoa powder and a dollop of freshly whipped cream.', price: 150 },
    { name: 'Lemon Tart', description: 'A zesty lemon tart with a buttery shortcrust pastry, topped with a light meringue and a sprinkle of candied lemon zest. The perfect balance of sweet and tart.', price: 140 },
    { name: 'Caramel Swirl Spongecake', description: 'Light and airy sponge cake marbled with ribbons of caramel, finished with a drizzle of caramel sauce and a side of vanilla bean ice cream.', price: 160 },
  ]);

  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const handleSubmit = () => {
    if (itemName && itemDescription && itemPrice) {
      const newItem = {
        name: itemName,
        description: itemDescription,
        price: parseFloat(itemPrice),
      };
      setMenuItems([...menuItems, newItem]);
      setItemName('');
      setItemDescription('');
      setItemPrice('');
    }
  };

  const totalMenuItems = menuItems.length;

  const handleNextPress = () => {
    console.log('Next button pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Eclipse Restaurant</Text>
      </View>

      <View style={styles.homeButtonContainer}>
        <TouchableOpacity style={styles.homeButton}>
          <Text style={styles.homeButtonText}>Home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuTitleContainer}>
        <Text style={styles.menuTitle}>Menu:</Text>
      </View>

      {/* Menu Items */}
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>
              {item.name} - {item.description} - R{item.price.toFixed(2)}
            </Text>
          </View>
        )}
      />

      <Text style={styles.totalItems}>Total Menu Items: {totalMenuItems}</Text>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7b546',
    padding: 10,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    textShadowColor: '#ffeb3b',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  homeButtonContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  homeButton: {
    backgroundColor: '#ffe478',
    padding: 10,
    borderRadius: 10,
  },
  homeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  menuTitleContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  itemContainer: {
    backgroundColor: '#f3b156',
    padding: 10,
    marginBottom: 5,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  totalItems: {
    marginVertical: 10,
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#ffd700',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});
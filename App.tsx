import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import React from 'react';

// Define the MenuItem types
type MenuItem = {
  name: string;
  description: string;
  price: number;
};

export default function App() {
  // Define the type of the MenuItem
  const [menuItems] = useState<MenuItem[]>([
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

  const totalMenuItems: number = menuItems.length;

  const handleNextPress = (): void => {
    console.log('Next button pressed');
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
              {item.name} - {item.description} - R{item.price.toFixed(2)}
            </Text>
          </View>
        )}
      />

      <Text style={styles.totalItems}>Total Menu Items: {totalMenuItems}</Text>

      <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
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
  nextButton: {
    marginTop: 20,
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

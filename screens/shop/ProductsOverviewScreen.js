import React, { useState, useEffect, useCallback } from 'react';
import { Button, FlatList, Platform, ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';

const ProductsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError])
  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadProducts
    );
    return () => {
      willFocusSub.remove();
    }
  }, [loadProducts])
  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate(
      'ProductDetail', {
      productId: id,
      productTitle: title
    });
  }
  if (error) {
    return <View style={styles.centered}>
      <Text>An error occured!</Text>
      <Button title='Try again' onPress={loadProducts} color={Colors.primary} />
    </View>
  }
  if (isLoading) {
    return <View style={styles.centered}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  }
  if (!isLoading && products.length === 0) {
    return <View style={styles.centered}>
      <Text>Np products found. Maybe start adding some!</Text>
    </View>
  }
  return <FlatList data={products}
    keyExtractor={item => item.id}
    renderItem={itemData => <ProductItem
      image={itemData.item.imageUrl}
      title={itemData.item.title}
      price={itemData.item.price}
      onSelect={() => {
        selectItemHandler(itemData.item.id, itemData.item.title);
      }}
    >
      <Button color={Colors.primary} title="View Detail" onPress={() => {
        selectItemHandler(itemData.item.id, itemData.item.title);
      }} />
      <Button color={Colors.primary} title="To Cart" onPress={() =>
        dispatch(cartActions.addToCart(itemData.item))} />
    </ProductItem>}
  />
}

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All products',
    headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        onPress={() => {
          navData.navigation.toggleDrawer()
        }} />
    </HeaderButtons>,
    headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='Cart' iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        onPress={() => {
          navData.navigation.navigate('Cart')
        }} />
    </HeaderButtons>
  }
}
const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})

export default ProductsOverviewScreen;

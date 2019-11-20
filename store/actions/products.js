import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return dispatch => {
    fetch('https://rn-shop-9cd0d.firebaseio.com/products.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong!');
        }
        return res;
      })
      .then(response => response.json())
      .then(resData => {
        const loadedProducts = [];
        for (const key in resData) {
          loadedProducts.push(new Product(
            key,
            'u1',
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          ));
        }
        dispatch({ type: SET_PRODUCTS, products: loadedProducts })
      })
      .catch(err => { throw err });
  }

  return dispatch => {
    fetch('https://rn-shop-9cd0d.firebaseio.com/products.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong!');
        }
        return res;
      })
      .then(response => response.json())
      .then(resData => {
        const loadedProducts = [];
        for (const key in resData) {
          loadedProducts.push(new Product(
            key,
            'u1',
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          ));
        }
        dispatch({ type: SET_PRODUCTS, products: loadedProducts })
      })
      .catch(err => { throw err });
  }
}

export const deleteProduct = productId => {
  return dispatch => {
    fetch(`https://rn-shop-9cd0d.firebaseio.com/products/${productId}.json`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(res => {
        dispatch({ type: DELETE_PRODUCT, pid: productId });
      })
      .catch(err => { throw new Error('Something went wrong') });
  }

};

export const createProduct = (title, description, imageUrl, price) => {
  return dispatch => {
    fetch('https://rn-shop-9cd0d.firebaseio.com/products.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title, description, imageUrl, price
      })
    })
      .then(response => response.json())
      .then(res =>
        dispatch({
          type: CREATE_PRODUCT,
          productData: {
            id: res.name,
            title,
            description,
            imageUrl,
            price
          }
        }))
      .catch(err => console.log(err));
  }
}

export const updateProduct = (id, title, description, imageUrl) => {
  return dispatch => {
    fetch(`https://rn-shop-9cd0d.firebaseio.com/products/${id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title, description, imageUrl
      })
    })
      .then(response => response.json())
      .then(res =>
        dispatch({
          type: UPDATE_PRODUCT,
          pid: id,
          productData: {
            title,
            description,
            imageUrl
          }
        }
        )
      )
      .catch(err => { throw new Error('Something went wrong') });
  }

}

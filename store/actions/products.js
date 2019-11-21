import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        'https://rn-shop-9cd0d.firebaseio.com/products.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};
// not working as should!!!!
// export const fetchProducts = () => {
//   return (dispatch, getState) => {
//     const userId = getState().auth.userid;
//     fetch('https://rn-shop-9cd0d.firebaseio.com/products.json')
//       .then(response => response.json())
//       .then(resData => {
//         const loadedProducts = [];
//         for (const key in resData) {
//           loadedProducts.push(new Product(
//             key,
//             resData[key].ownerId,
//             resData[key].title,
//             resData[key].imageUrl,
//             resData[key].description,
//             resData[key].price
//           ));
//         }
//         dispatch({
//           type: SET_PRODUCTS,
//           products: loadedProducts,
//           userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
//         })
//       })
//       .catch(err => { throw err });
//   }
// }

export const deleteProduct = productId => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    fetch(`https://rn-shop-9cd0d.firebaseio.com/products/${productId}.json?auth=${token}`, {
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
  return (dispatch, getState) => {
    const token = getState().auth.token;
    const ownerId = getState().auth.userId;
    fetch(`https://rn-shop-9cd0d.firebaseio.com/products.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title, description, imageUrl, price, ownerId
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
            price,
            ownerId
          }
        }))
      .catch(err => console.log(err));
  }
}

export const updateProduct = (id, title, description, imageUrl) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    fetch(`https://rn-shop-9cd0d.firebaseio.com/products/${id}.json?auth=${token}`, {
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

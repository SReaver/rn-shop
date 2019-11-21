export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

// export const fetchOrders = () => {
//   return (dispatch, getState) => {
//     const userId = getState().auth.userId;
//     fetch(`https://rn-shop-9cd0d.firebaseio.com/orders/${userId}.json`)
//       .then(response => response.json())
//       .then((resData) => {
//         const loadedOrders = [];
//         for (const key in resData) {
//           loadedOrders.push(
//             new Order(
//               key,
//               resData[key].cartItems,
//               resData[key].totalAmount,
//               new Date(resData[key].date)
//             )
//           );
//         }
//         dispatch({ type: SET_ORDERS, orders: loadedOrders });
//       })
//       .catch(err => { throw new Error('Something went wrong!') });
//   }
// }
export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://rn-shop-9cd0d.firebaseio.com/orders/${userId}.json`
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedOrders = [];

      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }
      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (err) {
      throw err;
    }
  };
};

// dispatch({ type: SET_ORDERS, orders: [] })
export const addOrder = (cartItems, totalAmount) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    fetch(`https://rn-shop-9cd0d.firebaseio.com/orders/${userId}.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cartItems, totalAmount,
        date: date.toISOString()
      })
    })
      .then(response => response.json())
      .then(res =>
        dispatch({
          type: ADD_ORDER,
          orderData: { id: res.name, items: cartItems, amount: totalAmount, date }
        }
        ))
      .catch(err => { throw new Error('Something went wrong!') });
  }
}
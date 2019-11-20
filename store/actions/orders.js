export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
  return async dispatch => {
    dispatch({ type: SET_ORDERS, orders: [] })
  }
}

export const addOrder = (cartItems, totalAmount) => {
  return async dispatch => {
    const date = new Date();
    fetch('https://rn-shop-9cd0d.firebaseio.com/orders/u1.json', {
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
import React, { createContext, useEffect, useState } from 'react';
export const CartContext=createContext()
const CartProvider = ({children}) => {

  const[cart,setCart]=useState([])
  const[itemAmount,setItemAmount]=useState(0)
  const[total,setTotal]=useState(0)

  useEffect(()=>{
    if(cart){
      const totalAmount=cart.reduce((acc,cur)=>{
        return acc+cur.price*cur.amount
      },0)
      setTotal(totalAmount)
    }
  },[cart])
  useEffect(()=>{
    if(cart){
      const amount=cart.reduce((acc,cur)=>{
        return acc+cur.amount
      },0)
      setItemAmount(amount)
    }
  },[cart])

  const addToCart=(product,id)=>{

    const newItem={...product,amount:1}

    const cartItem=cart.find(item=>{

      return item.id===id
    })
    //.....item already in the card then
    if(cartItem){
      const newCart = [...cart].map(item=>{

        if(item.id === id){

          return {...item,amount: cartItem.amount+1}

        }else{
          return item
        }
      })
      setCart(newCart)
    }else{
      setCart([...cart,newItem])
    }
    console.log(cart,'added to the cart');
  }

  //removing cart

const removeFromCart =(id)=>{
  const newCart=cart.filter((item)=>{
    return item.id !== id
  })
  setCart(newCart)
}

// clear cart
const clearCart =()=>{
  setCart([])
}


// increase amount
const increaseAmount =(id)=>{
  const cartItem=cart.find((item)=>item.id===id)
 addToCart(cartItem,id)
}

// decrease amount
const decreaseAmount =(id)=>{
  const cartItem=cart.find((item)=>{return item.id===id})
 if(cartItem){
  const newCart=cart.map((item)=>{
    if(item.id===id){
      return{...item,amount:cartItem.amount-1}
    }else{
      return item
    }
  })
  setCart(newCart)
 }
  if(cartItem.amount<2){
    removeFromCart(id)
  }
 
}

   
  return <CartContext.Provider value={{addToCart,cart,removeFromCart,clearCart,increaseAmount,decreaseAmount,itemAmount,total}}>
    {children}
  </CartContext.Provider>
};

export default CartProvider;

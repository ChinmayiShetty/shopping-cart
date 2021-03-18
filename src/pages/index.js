import React from 'react';
import Box from '@material-ui/core/Box';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useCart } from "react-use-cart";
import {useRef,useEffect,useState, useReducer} from 'react';
import cookie2 from 'js-cookie';
import {posts} from '../_data';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';






import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
            width: '50%',
                maxWidth: '36ch',
                float: "right",

    },
    spacing: {

    wordSpacing: '12px',
    },
    paper: {
        padding: theme.spacing(5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    tile: {
    backgroundColor: 'white',
    },
    button: {
          backgroundColor: ' #ff66cc',
          margin: '5px',
          "&:hover": {
                  //you want this to be the same as the backgroundColor above
                  backgroundColor: "#ff66cc"
              }
      },
      removeButton: {
                backgroundColor: '#e45a53',
                float: 'right',


                "&:hover": {
                        //you want this to be the same as the backgroundColor above
                        backgroundColor: '#e45a53'

                    }
            },
    imageStyle: {
              width: '85%',
              background: 'lightgrey',
              margin: '20px',
              height: '250px',
              },
      badgeColor: {
      backgroundColor: 'pink',

      },
      margin: {
          margin: theme.spacing.unit * 2
        },

}));

const currencyOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}

function getTotal(total) {
    return total.toLocaleString(undefined, currencyOptions)
  }
function cartReducer(state, product) {
  return [...state, product]
}
 function BackgroundColor({productList}) {

    const classes = useStyles();


  const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState(0);


    const [cartItems, setCartItems] = useState([]);

  /*useEffect(() => {
    setCart(cartItems.reduce((count, { quantity }) => count + quantity, 0));
  }, [cartItems]);*/

  useEffect(() => {
      const val = localStorage.getItem('val-items');
        const tot = localStorage.getItem('total');

      if(val){
        setCartItems(JSON.parse(val));

      }
      if(tot){
              setTotal(JSON.parse(tot));

            }
    }, []);

    useEffect(() => {
      localStorage.setItem('val-items', JSON.stringify(cartItems));
            localStorage.setItem('total', JSON.stringify(total));


    });


 const AddToCart = (e) => {
 const v = e.variants[0];



    setTotal(current => current + parseFloat(v.price));
        setCartItems((items) => {
      if ((items.find(({ id }) => id === e.id))) {
        return items.map((item) =>
          item.id === e.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                price: ((parseFloat(item.variants[0].price))*((item.quantity)+1)).toFixed(2),
                image: item.images[0].src

              }
            : item
        );
      } else {
        return [
          ...items,
          {
            ...e,
            quantity: 1,
            price: (v.price),
            image: e.images[0].src

          }
        ];
      }
    });




};

 const removeFromCart = (e) => {
     //setTotal(current => current - parseFloat(e.price));

setCartItems((items) => {
//const v = items.variants[0];
             //setTotal(current => current - parseFloat(v.price));

      const foundItem = items.find((f) => f.id === e.id);

      if (foundItem?.quantity >0) {
        return items.map((item) =>

          item.id === e.id
            ? {
                ...item,
                quantity: item.quantity - 1,
                price: (parseFloat(item.variants[0].price))*((item.quantity)) - item.variants[0].price,
                image: item.images[0].src,
               total:  setTotal(current => current - parseFloat(item.variants[0].price))

              }
            : item
        );
      } else {
        return items.filter((f) => f.id !== e.id);
      }
    });

};

  const cartTotal = cartItems.reduce((total, { price = 0 }) => total + price, 0);

    return (
            <div>

<Box bgcolor="#efefef" color="black" p={5} m={1} align="center">
         <Typography variant="h3" component="h2" gutterBottom>
     My awesome shopping site
        </Typography>
        <Typography variant="subtitle2" component="h2" gutterBottom>
Men&apos;s t-shirt, Sweatshirt
                </Typography>
    </Box>
    <Box bgcolor="#f3edeb" p={10} m={1} style={{overflow: 'hidden'}}>

        <GridList cellHeight={'auto'}  cols={3} style={{width: '70%', float: 'left'}}>

 {productList.products.map((e,index) => (

            <GridListTile classes={{ tile: classes.tile}} key={index} cols={e.cols || 1} style={{padding: '20px'}}>
            <div>

                <Link as={`/products/${e.handle}`} href="/products/[handle]" style={{textDecoration: 'none', color: 'black',}}>
                        <img src={e.images[0].src} className={classes.imageStyle} />
                </Link>

                        <Typography variant="subtitle1">
                            <span style={{display: 'inline-block', width: '80%', height: '56px'}}>
                                   <Link as={`/products/${e.handle}`} href="/products/[handle]" >
             <span style={{textDecoration: 'none', color: 'black',}}>{e.title}</span></Link>
                            </span>
                         <span style={{float: 'right'}}>&pound;{e.variants[0].price}</span>
                         </Typography>

                <Button className={classes.button} onClick={()=>AddToCart(e)}>
        ADD TO CART
                </Button>

    </div>

    </GridListTile>


        ))};



</GridList>

<div>
<div className={classes.root}>Cart:<Badge badgeContent={cartItems.length} classes={{ badge: classes.badgeColor }} className={classes.margin}  >
 </Badge></div>
<span className={ classes.root} style={{wordSpacing: '76px'}}>Item price quantity<Divider  m={10}/></span>



    <List className={classes.root}>
                {cartItems.map((e) => (

      <ListItem alignItems="flex-start" key={e.id}>
      <ListItemText
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                    <div>
                  <span style={{display:'inline-block', width: '30%', marginRight: '25px'}}><img src={e.image} style={{width: '70%'}}/>{e.title}</span>
                                    <span style={{display:'inline-block', width: '30%', marginRight: '25px', verticalAlign: '3rem'}}>&pound; {e.price}</span>

                  <span style={{ verticalAlign: '3rem'}}>{e.quantity}</span>
                  </div>
                  {<Button className={classes.removeButton} onClick={() => removeFromCart(e) }>Remove</Button>}

                                </Typography>
                                      <Divider style={{marginTop: '60px'}}/>

            </React.Fragment>
}
        />

      </ListItem>
                ))}

    </List>
        <div className={classes.root} style={{backgroundColor: 'lightgrey', paddingTop: '20px'}}>Total:&pound; {getTotal(total)}</div>

            </div>



        </Box>


        </div>



);
}
export default BackgroundColor;

export const getStaticProps = async() => {
   /* const response = await fetch(`http://localhost:8001/products`);
    const productList = await response.json();*/

    return {
    props: {productList: posts}
    }
}


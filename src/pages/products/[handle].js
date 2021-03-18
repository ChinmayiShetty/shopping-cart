import posts from "../../_data";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import {useRef,useEffect,useState, useReducer} from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormHelperText from '@material-ui/core/FormHelperText';



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  container: {
        display: 'flex',
    justifyContent: 'space-around'    },

    divider: {
              borderLeft: '2px solid lightgrey',
  },

}));


// This post argument is passed from getStaticProps
 export default function BackgroundColor({ post })  {
   const classes = useStyles();

   const [age, setAge] = React.useState('');
    const [variant, setVariant] = useState(0);
     const [selected, setSelected] = React.useState("");

       /*function parseSelected(event) {
        const value = event.target.value;
         setSelected(value);
         return;
       }*/


       function parseSelected(sai) {
        const value = sai.available;
         return setSelected(value);

       }

            return(

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
<div className={classes.container}>
          <img src={post.images[0].src} style={{width: "50%", float: 'left'}}/>
            <span className={classes.divider} />
<div style={{float:'right'}}>
    <Typography variant="h5" component="h5">
{post.title}</Typography>
    <div dangerouslySetInnerHTML={{__html:post["body_html"]}}></div>
        <div>{post.vendor}</div>

    <div>

 <Typography variant="subtitle1" component="h5" style= {{display: "contents"}}>
    Variants: </Typography>&nbsp;&nbsp;
          <FormControl variant="filled" className={classes.formControl} style= {{display: "contents"}}>

        <Select native onChange={(e) => setVariant(e.target.options.selectedIndex)}>
             {post.options[0].values.map((val,i) =>
                 <option value={val} key={post.variants[i].id}>{val}</option>)}
        </Select>
        </FormControl>
        <Typography variant='subtitle1' style={{fontSize: '16px'}}>
            Available: {post.variants[variant].available? 'Yes': 'No'} &nbsp;&nbsp;&nbsp;
            Price: &pound;{post.variants[variant].price}
        </Typography>

    </div>
    </div>
    </div>
   </Box>
</div>
  )
}

export async function getStaticPaths() {
  return {
    // Map all the posts to objects with the slug in the params object
    // since we want all our pages to be accessible, the paths array
    // needs to contain a list of all the posts slugs
    paths: posts.products.map((post) => ({ params: { handle: post.handle } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      // Since our slug should be unique we can use
      // it to find the post with the matching slug,
      // this will be the post we need to render
      post: posts.products.find((post) => post.handle === params.handle),
    },
  };
}
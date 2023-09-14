import React from 'react';
import pro from './Post.module.css';
const Post = (props) => {
  // console.log(props.message)
  // debugger;
    return (

   <div className= {pro.item}>
    <img src="https://mobimg.b-cdn.net/v3/fetch/d3/d3c75b8f4bcc1eee8767ff9d013fd679.jpeg?w=1470&r=0.5625" alt="" />
    {props.message}
    <div>   
    {props.count}
       <span>like</span> 
</div>
    </div>
    );

}

export default Post;
import React from 'react';
import pro from './Post.module.css';

type PropsType = {
    message: string
    count: number
}

const Post: React.FC<PropsType> = (props) => {
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
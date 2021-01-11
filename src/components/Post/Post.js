import React from 'react';
import './Post.css';

const post = (props) => {
const tags = props.tags.map(i =>  <div className="tag"> {i} </div> );
return (
    <div className="post" onClick={props.popup}>
        <h3>Title: {props.title}</h3>
        <div className="data">
        <img src={require('../../assets/images/calendar.png')} alt="created date"/>
        {props.createDate}  {" "}  
        <img src={require('../../assets/images/writer.png')} alt="author"/>   
        by: {props.author}
        <img src={props.profileImage} alt="profile-image"/> {" "}     
        <img src={require('../../assets/images/eye.png')} alt="views"/>    
        {props.views} {" "}
        <img src={require('../../assets/images/like.png')} alt="votes"/>
        {props.upVotes} {" "}
        <img src={require('../../assets/images/reply.png')} alt="replies"/>
        {props.answers}
        </div><br/>
        Tags: {tags}
    </div>
);
}

export default post;
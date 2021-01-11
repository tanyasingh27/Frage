import React, {Component} from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import Popup from '../../components/Popup/Popup';
import parse from 'html-react-parser';
import InfiniteScroll from "react-infinite-scroller";
import './Content.css';

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

class Content extends Component{
    state = {
        items: [],
        page: 1,
        more: true,
        showPopup: false,
        popupTitle: null,
        popupBody: null,
        popupLink: null,
        tag: "tags",
        updateTag: false
    }

    componentDidUpdate(){
        return this.state.updateTag;
    }

    callApiHandler = () => {
        if(this.state.page < 2){
        axios.get(`https://api.stackexchange.com/2.2/tags/${this.state.tag}/faq?page=${this.state.page}&site=stackoverflow&filter=!ILqlfNIvmNcZuDUcY6KxQa)WoOP(w5EMI6k0yXQqb*LBlnI`)
        .then( response => {
            this.setState({items: this.state.items.concat(response.data.items), page: response.data.page + 1 , more: response.data.has_more, updateTag: false});
        });
        }
    }

    closePopupHandler = () =>{
        this.setState({showPopup:false});
    }

    showPopupHandler = (title, body, link) => {
        this.setState({showPopup: true, popupTitle: title, popupBody: body, popupLink: link});
    }

    newTagHandler = (e) => {
        this.setState({tag: e.target.value});
    }

    fetchTagHandler = () => {
        this.setState({items: [], page: 1 , more: true, updateTag: true});
    }

    render(){   
        return (
            <div id="content">
            <div id="filter">
                <div id="search-card">
                    <p id="text"> Search questions by tag </p>
                    <input id="search-box" type="text" placeholder="Ex: java..." onChange={(event) => this.newTagHandler(event)}/>
                    <img id="icon" src={require('../../assets/images/search.png')} onClick={this.fetchTagHandler} alt="searchicon"/>
                </div>
                <div id="about">About</div>   
            </div>
            <div id="main-content">
                <Popup show= {this.state.showPopup} close={this.closePopupHandler} title={decodeHtml(this.state.popupTitle)} text={parse(this.state.popupBody+'')} link={this.state.popupLink} />
                {(this.state.items) ?
                <InfiniteScroll
                key={this.state.page}
                loadMore={this.callApiHandler}
                hasMore={this.state.more}
                loader={<div className="loader"> Loading... </div>}
                useWindow={false}
                >
                {this.state.items.map((i, index) =>
                    <Post 
                     key={i.question_id} 
                     popup={() => this.showPopupHandler(i.title, i.body, i.link)} 
                     title= {decodeHtml(i.title)} 
                     author={i.owner.display_name} 
                     profileImage={i.owner.profile_image} 
                     views={i.view_count}
                     upVotes={i.up_vote_count}
                     tags={i.tags.filter(i => {if(i != "tags") return i})}
                     answers={i.answer_count}
                     createDate={new Date(i.creation_date * 1000).toLocaleDateString()}/>
                )}
              </InfiniteScroll> : null }
            </div>
          
            </div>
        );
    }
}

export default Content;
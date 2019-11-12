import React, { Component } from "react";
import Post from "../../components/Post/Post";
import { Loading } from "../../components/UI/Loading/Loading.js";
import loadingGif from "../../assets/img/loading.gif";
import { Pagination } from "../../components/UI/Pagination/Pagination";

class Posts extends Component {
  state = {
    showLoading: true,
    posts: null,
    search: "",
    activePage: 1,
    total: null,
    perPage: 10
  };

  componentDidMount() {
    fetch(
      "https://api.unsplash.com/photos?per_page=12&client_id=1e671c8f34db5e89f74ca8a3494def1cb0d608b51d5225605e711da1f6ccf900"
    )
      .then(response => response.json())
      .then(res => {
        this.setState({
          posts: res,
          showLoading: false,
          total: res.length
        });
      });
  }

  SearchChangeHandler = e => {
    this.setState({
      search: e.target.value
    });
  };

  SearchSubmitHandler = e => {
    if (e.which === 13) {
      this.setState({
        showLoading: true
      });

      if (this.state.search) {
        fetch(
          `https://api.unsplash.com/search/photos?` +
            `query=${this.state.search}&` +
            `per_page=12&` +
            `client_id=1e671c8f34db5e89f74ca8a3494def1cb0d608b51d5225605e711da1f6ccf900`
        )
          .then(response => response.json())
          .then(res => {
            this.setState({
              posts: res.results,
              showLoading: false,
              total: res.total
            });
          });
      } else {
        fetch(
          "https://api.unsplash.com/photos?per_page=12&client_id=1e671c8f34db5e89f74ca8a3494def1cb0d608b51d5225605e711da1f6ccf900"
        )
          .then(response => response.json())
          .then(res => {
            this.setState({
              posts: res,
              showLoading: false
            });
          });
      }
    }
  };

  toPage = i => {
    this.setState({
      showLoading: true
    });
    fetch(
      `https://api.unsplash.com/search/photos?` +
        `query=${this.state.search}&` +
        `per_page=12&` +
        `page=${i}&` +
        `client_id=1e671c8f34db5e89f74ca8a3494def1cb0d608b51d5225605e711da1f6ccf900`
    )
      .then(response => response.json())
      .then(res => {
        this.setState({
          posts: res.results,
          showLoading: false
        });
      });
  };

  render() {
    let posts = null;
    let loading = null;
    let pagination = null;

    if (this.state.posts) {
      if (this.state.posts.length) {
        posts = this.state.posts.map(p => {
          return <Post key={p.id} post={p}></Post>;
        });
      } else {
        posts = (
          <p className="no_result">There is no result for your search.</p>
        );
      }
    }

    if (this.state.showLoading) {
      loading = (
        <Loading>
          <img alt="loading" src={loadingGif}></img>
        </Loading>
      );
    }

    if (this.state.total) {
      pagination = (
        <div className="pagination-holder">
          <Pagination toPage={this.toPage} totalPages={this.state.total}></Pagination>
        </div>
      );
    }
    return (
      <React.Fragment>
        <div className="searchHolder">
          <input
            onKeyUp={this.SearchSubmitHandler}
            onChange={this.SearchChangeHandler}
            type="text"
            placeholder="Search image..."
          ></input>
        </div>
        <div className="posts">
          {posts}
          {loading}
        </div>
        {pagination}
      </React.Fragment>
    );
  }
}

export default Posts;

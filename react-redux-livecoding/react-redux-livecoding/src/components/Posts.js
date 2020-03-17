import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../redux/actions/postActions'

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost)
    }
  }

  render() {
    const postItems = this.props.posts.map(post => {
      return (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      )
    })

    return (
      <div>
        <h1>Posts List</h1>
        { postItems }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts.items,
  newPost: state.posts.item
})

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
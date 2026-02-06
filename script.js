// script.js

// Functionality for handling posts
const posts = [];

function createPost(author, content) {
    const post = {
        id: posts.length + 1,
        author: author,
        content: content,
        comments: [],
        createdAt: new Date().toISOString()
    };
    posts.push(post);
    return post;
}

function getPosts() {
    return posts;
}

// Functionality for handling comments
function addComment(postId, author, content) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        const comment = {
            id: post.comments.length + 1,
            author: author,
            content: content,
            createdAt: new Date().toISOString()
        };
        post.comments.push(comment);
        return comment;
    }
    return null;
}

// Exporting functions for external use
module.exports = { createPost, getPosts, addComment };
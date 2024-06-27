  document.addEventListener('DOMContentLoaded', () => {
    const renderDiv = document.getElementById('renderdiv');

    function clearRenderDiv() {
        renderDiv.innerHTML = '';
    }

    function displayResult(data) {
        renderDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    }

    window.getAllPosts = function() {
        clearRenderDiv();
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => displayResult(data))
            .catch(error => console.error('Error:', error));
    }

    window.getPostById = function(id) {
        clearRenderDiv();
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => response.json())
            .then(data => displayResult(data))
            .catch(error => console.error('Error:', error));
    }

    window.createPost = function() {
        clearRenderDiv();
        const newPost = {
            title: 'foo',
            body: 'bar',
            userId: 1
        };

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(newPost),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Created post ID:', data.id);
            displayResult(data);
        })
        .catch(error => console.error('Error:', error));
    }

    window.replacePost = function(id) {
        clearRenderDiv();
        const updatedPost = {
            title: 'Updated Title',
            body: 'Updated Body',
            userId: 1
        };

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedPost),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(data => displayResult(data))
        .catch(error => console.error('Error:', error));
    }

    window.updatePostTitle = function(id) {
        clearRenderDiv();
        const updatedTitle = {
            title: 'New Title'
        };

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedTitle),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(data => displayResult(data))
        .catch(error => console.error('Error:', error));
    }

    window.deletePost = function(id) {
        clearRenderDiv();
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            renderDiv.innerHTML = '<p>Post deleted successfully.</p>';
        })
        .catch(error => console.error('Error:', error));
    }
});

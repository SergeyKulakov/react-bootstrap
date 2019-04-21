import React, { Component } from 'react';
import './App.css';
import './css/posts.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      title: '',
      body: '',
      tags: ''
    };

    this.deletePost = this.deletePost.bind(this);
    this.addPost = this.addPost.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }



  componentDidMount() {
    this.setState({
      posts: require('./json/posts.json')
    })
  }

  deletePost(index) {
    delete this.state.posts[index-1];
    this.setState({ posts : this.state.posts });
  }

  handleChange(key) {
    return function (e) {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);   
  }
  
  addPost(event) {
    var id = this.state.posts.length;
    id++;
    var data = [
      {
          "id": id,
          "title": this.state.title,
          "body": this.state.body,
          "tags": this.state.tags.split(",")
      }
    ] 

    this.setState({posts: this.state.posts.concat(data)});
    event.preventDefault();
  }

  render() {

    return (
      <div className="App">
        <div className="container">
            <header id="header">
                <div className="page-header">
                    <h1>Тестовое задание</h1>
                </div>
                <h2>Задача:</h2>
                <ol>
                    <li>Используя коллекцию <code>json/posts.json</code> заполнить базовыми значениями <code>localStorage</code> пользователя, вывести записи в <code>#posts</code>, взяв за основу разметку <code>#posts article</code>.</li>
                    <li>Возможность удаления записи из <code>localStorage</code>.</li>
                    <li>Форма добавления записи, валидация данных.</li>
                </ol>
                <p className="alert alert-info">Ограничений по использованию библиотек, кроссбраузерности &mdash; нет.</p>
            </header>

            <section>

                <div id="posts" className="well">

                  {this.state.posts
                    .map(posts => 
                        <article key={posts.id}>
                            <header>
                                <h3>{posts.title}</h3>
                            </header>
                            <section>
                                <p>{posts.body}</p>
                            </section>
                            <footer>
                                <div className="tags">
                                    {posts.tags.map((todo) =>
                                      <button className="btn btn-xs btn-default" key={todo}>{todo}</button>
                                    )}
                                </div>
                            </footer>
                            <div className="controls">
                                <button className="btn btn-danger btn-mini" onClick={this.deletePost.bind(this, posts.id)}>удалить</button>
                            </div>
                        </article>
                    )}

                </div>
                
                <form id="post-add" className="col-lg-4" onSubmit={this.addPost}>
                    <div className="form-group">
                        <input type="text" className="form-control" name="title" placeholder="заголовок" value={this.state.title} onChange={this.handleChange('title')} required/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="body" placeholder="запись" value={this.state.body} onChange={this.handleChange('body')} required/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="tags" placeholder="тег, еще тег" value={this.state.tags} onChange={this.handleChange('tags')} required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Добавить</button>
                </form>

            </section>
        </div>

      </div>
    );
  }
}

export default App;

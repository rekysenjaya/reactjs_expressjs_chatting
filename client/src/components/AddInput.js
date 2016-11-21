import React, { Component, PropTypes } from 'react';

export default class AddInput extends Component {
  constructor(props) {
    super(props);
    // state di definisikasikan terlebih dahulu nulainya
    this.state = {
      comment: '',
      name: ''
    }
  }

  // untuk mendapatkan nilai di form  input
  handleCommentChange(e) {
    this.setState({comment: e.target.value})
  }

  // untuk mendapatkan nilai di form  input
  handleNameChange(e) {
    this.setState({name: e.target.value})
  }

  // untuk submit form input chat
  handleSubmit(e) {
    // untuk mengirim data ke server
    e.preventDefault()
    // console.log(this.state.name);
    this.props.addData(this.state.comment, this.state.name)
    // apabila di submit comment akan kosong
    this.setState({
      comment: ''
    })
  }

  render() {
    return (
      // di JSX class harus diganti menjadi className
      <div className="col-md-8 col-md-offset-2 ">
      <div className="rcorners2-form">
      <form className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
      <input type="text" className="form-control" style={{width: "30%"}} placeholder="Name" value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
      <input type="text" className="form-control" style={{width: "50%"}} placeholder="Chat input" value={this.state.comment} onChange={this.handleCommentChange.bind(this)}/>
      <button type="submit" className="btn btn-primary" style={{width: "18%"}} disabled="">Post</button>
      </form>
      </div>
      </div>
    );
  }
}

AddInput.propTypes = {
  addData: PropTypes.func.isRequired
};

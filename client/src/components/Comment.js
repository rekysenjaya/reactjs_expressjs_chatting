import React, { Component, PropTypes } from 'react';
import logoMan from '../images/man.png';

export default class Comment extends Component {
  constructor(props){
    super(props);
    this.state = {
      editing:0,
      comment:this.props.item.comment || ''
    }
  }

  handleEdit(){
    this.setState({
      editing:1,
    })
  }

  handleView(){
    setTimeout(function() { this.setState({editing:0}); }.bind(this) , 3000);
    this.setState({
      editing:2
    })
  }

  // untuk mendapatkan nilai di form  input
  handleCommentChange(e){
    this.setState({comment: e.target.value})
  }

  handleUpdate(e){
    e.preventDefault()
    this.props.editData(this.props.item.id, this.state.comment)
    this.setState({
      comment:this.state.comment,
      editing:0
    })
  }

  render() {
    if (this.state.editing === 1) {
      return (
        <div className="rcorners2">
        <div className="row">
        <div className="col-md-3">
        <img src={logoMan} height="50" width="50" alt="capter" className="img-circle"/>&nbsp;&nbsp;<h5 onClick={this.handleView.bind(this)}>{this.props.item.name}</h5>
        </div>
        <div className="col-md-7">
        </div>
        <div className="col-md-2">
        </div>
        </div>
        <form onSubmit={this.handleUpdate.bind(this)}>
        <div className="rcorners2-in">
        <textarea className="form-control" style={{width:"100%"}} rows="4" onChange={this.handleCommentChange.bind(this)} value={this.state.comment}></textarea>
        </div>
        <button type="submit" className="btn btn-primary" style={{width:"40px"}} onClick={this.handleUpdate.bind(this)}><i className="glyphicon glyphicon-check"/></button>
        </form>
        </div>
      );
    } else if (this.state.editing === 0) {
      return (
        <div className="rcorners2">
        <div className="row">
        <div className="col-md-10">
        <img src={logoMan} height="50" width="50" alt="capter" className="img-circle"/>&nbsp;&nbsp;<h5 onClick={this.handleView.bind(this)}>{this.props.item.name}</h5>
        </div>
        <div className="col-md-2">
        </div>
        </div>
        <div className="rcorners2-in">
        {this.props.item.comment}
        </div>
        <button type="button" className="btn btn-danger" style={{width:"40px"}} onClick={()=>{this.props.deleteData(this.props.item.id)}}><i className="glyphicon glyphicon-trash"/></button>&nbsp;
        <button type="button" className="btn btn-success" style={{width:"40px"}} onClick={this.handleEdit.bind(this)}><i className="glyphicon glyphicon-pencil"/></button>
        </div>
      );
    }else if(this.state.editing === 2){
      return(
        <div className="rcorners2-profile">
        <div className="col-md-4" style={{marginBottom:"20px"}}>
        <img className="img-circle" src={logoMan} alt="capter" width="130" height="130"/>
        </div>
        <div className="col-md-8">
        <address>
        <strong>Username</strong>
        <br/>
        {this.props.item.name}
        <br/>
        <br/>
        <strong>Email</strong>
        <br/>
        <a href="mailto:#">first.last@example.com</a>
        <br/>
        <br/>
        <strong>Gender</strong>
        <br/>
        Female
        <br/>
        <br/>
        </address>
        </div>
        </div>
      );
    }
  }
}

Comment.propTypes={
  item : PropTypes.object.isRequired
}

import React, { Component, PropTypes } from 'react';
import Comment from './Comment';

export default class CommentList extends Component {

  render() {
    let {deleteData, editData} = this.props
    let commentNodes = this.props.data.map(function(data) {
      return(
        <Comment key={data.id} item={data} deleteData={deleteData} editData={editData}/>
      )
    });
    return (
      <div className="col-md-8 col-md-offset-2 ">
      {commentNodes}
      </div>
    );
  }
}

CommentList.propTypes={
  data : PropTypes.array.isRequired,
  deleteData: PropTypes.func.isRequired,
  editData: PropTypes.func.isRequired
};

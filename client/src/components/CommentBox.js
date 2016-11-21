import React, { Component, PropTypes } from 'react';
import CommentList from './CommentList';
import AddInput from './AddInput';

// default export adalah yg pertamakali di export
export default class CommentBox extends Component {
  // constructor untuk pertamakali dijalankan
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.handleGetData()
    // set interval untuk mengecek selalu data ke server
    setInterval(this.handleGetData.bind(this), 2000)
  }

  // getData untuk mendapatkan data di server
  handleGetData() {
    this.props.actions.getData(function (data) {
      this.setState({
        data: data
      })
    }.bind(this));
  }

  // untuk tambah chat
  handleAddData(comment, name) {
    // untuk mendapatkan data sebelum di tambah
    let oldData = this.state.data
    console.log(oldData);
    let id = Date.now().toString()
    let item = {
      id: id,
      name: name,
      comment: comment
    }
    // mendapatkan data terbaru
    let newData = this.state.data
    newData.push(item)
    this.setState({
      data: newData
    })
    // mengirim request ke server untuk mengupdate data
    this.props.actions.addData(item, function (err, data) {
      // jika error
      if (err) {
        console.log(err);
        this.setState({
          data: oldData
        })
      } else {
        // jika berhasil akan di cek ke data
        let newDataRecovery = this.state.data
        let idObject = this.state.data.map(function (x) {
          return x.id
        }).indexOf(id);
        // apabila ada maka
        if (idObject > -1) {
          console.log('data is exist');
          // apabila tidak ada
        } else {
          newDataRecovery.push(item)
          this.setState({
            data: newDataRecovery
          })
        }
      }
      // untuk bisa dipanggil berulang
    }.bind(this))
  }

  handleUpdateData(id, comment) {
    let oldData = this.state.data;
    let newData = this.state.data;
    // untuk mendapatkan object data
    var idObject = newData.map(function (x) {
      return x.id;
    }).indexOf(id);
    // cek index ke berapa
    if (idObject > -1) {
      newData[idObject].comment = comment
      this.setState({
        data: newData
      })
    }
    this.props.actions.editData(newData[idObject], function (err, data) {
      if (err) {
        console.log(err);
        this.setState({
          data: oldData
        })
      } else {
        let idObject = this.state.data.map(function (x) {
          return x.id
        }).indexOf(id);
        if (idObject > -1) {
          console.log('data exist');
        }
      }
    }.bind(this));
  }

  handleDeleteData(id) {
    let oldData = this.state.data;
    let newData = this.state.data;
    // untuk mendapatkan object data
    var idObject = newData.map(function (x) {
      return x.id;
    }).indexOf(id);
    // cek index ke berapa
    if (idObject > -1) {
      newData.splice(idObject, 1);
      this.setState({
        data: newData
      })
    }
    this.props.actions.deleteData(id, function (err, data) {
      if (err) {
        console.log(err);
        this.setState({
          data: oldData
        })
      } else {
        let idObject = this.state.data.map(function (x) {
          return x.id
        }).indexOf(id);
        if (idObject > -1) {
          console.log('data masih ada');
        }
      }
    }.bind(this));
  }

  render() {
    return (
      <div className="container">
      <CommentList data={this.state.data} deleteData={this.handleDeleteData.bind(this)} editData={this.handleUpdateData.bind(this)}/>
      <AddInput addData={this.handleAddData.bind(this)} />
      </div>
    );
  }
}

CommentBox.propTypes = {
  actions: PropTypes.object.isRequired
}

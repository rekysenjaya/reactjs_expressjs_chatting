// superagent adalah library javascript hampir sama dengan jquery
import request from 'superagent'

const SERVER_URL = 'http://localhost:3333/api/data'

// function untuk mendapatkan data dengan superagent
export function getData(callback){
  request
  .get(SERVER_URL)
  .set('Accept', 'application/json')
  .end((err, res) => {
    if (err) {
      console.log(err);
    }else {
      let data = res.body;
      callback(data)
    }
  });
}

// untuk menyimpan data
export function addData(item, callback) {
  request
  .post(SERVER_URL)
  .type('form')
  .send(item)
  .set('Accept', 'application/json')
  .end((err, res) => {
      callback(err, res.data)
  });
}

// untuk update data
export function editData(item, callback) {
  request
  .post(SERVER_URL+"/edit")
  .type('form')
  .send(item)
  .set('Accept', 'application/json')
  .end((err, res) => {
      callback(err, res.data)
  });
}

// untuk menghapus data
export function deleteData(id, callback) {
  request
  .post(SERVER_URL+"/delete")
  .type('form')
  .send({
    id:id
  })
  .set('Accept', 'application/json')
  .end((err, res) => {
      callback(err, res.data)
  });
}

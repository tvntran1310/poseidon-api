import express from 'express';

export default class {
  constructor() {
    this.router = express.Router();
  }

  get(path, handleRequestFunc) {
    this.router.get(path, handleRequestWrapper(handleRequestFunc));
  }

  post(path, handleRequestFunc) {
    this.router.post(path, handleRequestWrapper(handleRequestFunc));
  }

  put(path, handleRequestFunc) {
    this.router.put(path, handleRequestWrapper(handleRequestFunc));
  }

  delete(path, handleRequestFunc) {
    this.router.delete(path, handleRequestWrapper(handleRequestFunc));
  }
}

function handleRequestWrapper(handleRequestFunc) {
  return async (req, res) => {
    return handleRequestFunc({
      data: req.body
    }).then(returnData => {
      res.send(returnData);
    }).catch(err => {
      res.send({
        error: err.error,
        message: err.message,
      });
    });
  }
}

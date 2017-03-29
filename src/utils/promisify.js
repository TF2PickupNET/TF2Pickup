export default function promisify(func, context = null) {
  return (...args) => new Promise((resolve, reject) => {
    // eslint-disable-next-line promise/prefer-await-to-callbacks
    func.bind(context)(...args, (err, res) => {
      if (err) {
        reject(err);
      }

      resolve(res);
    });
  });
}

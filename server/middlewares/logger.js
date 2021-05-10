const moment = require('moment');

exports.logger = async (req, res, next) => {
  const timeLog = moment(new Date()).format('hh:mm:ss');
  console.log(`>> 📞`);
  console.log(`${timeLog}  ${req.method} ${req.route.path}`);
  if (req.headers.authorization) {
    console.log(`${timeLog}  Authorization: true`);
  } else {
    console.log(`${timeLog}  Authorization: false`);
  }
  console.log(`${timeLog}  Params: `, req.params);
  console.log(`${timeLog}  Body: `, req.body);
  console.log(`<< 🛑`);
  next();
};

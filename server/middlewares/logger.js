const moment = require('moment');

exports.logger = async (req, res, next) => {
  const timeLog = moment(new Date()).format('HH:MM:SS');

  console.log(`${timeLog} ${req.method} ${req.route.path}`);
  if (req.headers.authorization.length > 0)
    console.log('Authorization: ', req.headers.authorization.split(' ')[1]);
  if (Object.keys(req.params).length > 0) console.log('Params: ', req.params);
  if (Object.keys(req.body).length > 0) console.log('Body: ', req.body);
  next();
};

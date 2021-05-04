const moment = require('moment');

exports.logger = async (req, res, next) => {
  const timeLog = moment(new Date()).format('HH:MM:SS');
  console.log(`📞`);
  console.log(`${timeLog}  ${req.method} ${req.route.path}`);
  console.log(
    `${timeLog}  Authorization: `,
    req.headers.authorization.split(' ')[0]
  );
  console.log(`${timeLog}  Params: `, req.params);
  console.log(`${timeLog}  Body: `, req.body);
  console.log(`🛑`);
  next();
};

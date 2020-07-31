const _ = require("lodash");
module.exports = obj => _.find(obj[0].component, (s) => {
  return _.find(s.particles, {particleType: "VodTemplate"})
}).particles[0]


module.exports = (obj) => {
  let result = {};
  obj.forEach(s =>
    s.component.forEach(d =>
      d.particles.forEach(g => {
        if (g.particleType === 'VodTemplate') {
          result = g;
        }
      })))
  return result
}
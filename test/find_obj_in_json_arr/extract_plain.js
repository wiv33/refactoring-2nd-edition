module.exports = (obj) => {
  let result = {};
  obj.forEach(s =>
    s.component.forEach(d =>
      result = d.particles.filter(s =>
        s.particleType === 'VodTemplate')[0]
    ))
  return result
}
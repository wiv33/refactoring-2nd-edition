module.exports = (obj) => {
  let result = {};
  obj[0].component.forEach(d =>
    result = d.particles.filter(s =>
      s.particleType === 'VodTemplate')[0]
  )
  return result
}
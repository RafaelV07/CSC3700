function validateCourse(body) {
  const { number, title, credits, prerequisites } = body

  if (!number || !title || credits === undefined || credits === null || credits === '') {
    return 'number, title, and credits are required'
  }
  if (!Number.isInteger(Number(credits)) || Number(credits) < 0) {
    return 'credits must be a whole number'
  }
  if (prerequisites !== undefined && !Array.isArray(prerequisites)) {
    return 'prerequisites must be an array of course ids'
  }
  return null
}

module.exports = validateCourse

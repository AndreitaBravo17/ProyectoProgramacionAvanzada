const hasAuthorization = (req) => {
  // Get headers from request to look for there the authorization
  const headers = Object.keys(req.headers)
  const authExists = headers.includes("authorization")
  // If request has not auth then returns false
  if(!authExists) return { isValid:false, token: undefined }
  // Looks for the token
  let token = req.headers['authorization'].split(' ')[1]
  // If auth has not token then returns false
  if (!token) return { isValid:false, token: undefined }
  // Finally if the request has auth and token will be valid
  return { isValid:true, token }
}

module.exports = { hasAuthorization }
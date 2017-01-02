exception InternalError {
  1: string msg
}

service Auth {
  string generateUrl(1: required string redirectUrl, 2: required string openid) throws (1:InternalError err)
}
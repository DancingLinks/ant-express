exception InternalError {
  1: string msg
}

service Logger {
  void message(1: required string msg) throws (1:InternalError err)
}

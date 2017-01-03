exception InternalError {
	1: string msg
}

service Route {
	list<i32> plan(
		1:i32 sender_address,
		2:i32 receiver_address) throws (1:InternalError err)
}

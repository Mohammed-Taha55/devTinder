# Dev 
# auth/router:
post/signup
post/login
post/logout

# profile/router:
get/profile/view
patch/profile/edit
patch/profile/password

# connection/request/router:
post/request/send/intrested/:user
post/request/send/ignored/:user
post/request/review/accepted/:request
post/request/review/rejected/:request

# user/router:
get/user/connections
get/user/requests
get/feed-gets you the profile of other users 

status: ignore,  intrested, accepted rejected
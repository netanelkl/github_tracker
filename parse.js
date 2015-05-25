function parse_setup(onLogin)
{
	Parse.initialize(credentials.parse_app_id, credentials.parse_key);
	var currentUser = Parse.User.current();
	if (currentUser) {
	    // do stuff with the user
	} else {
	    Parse.User.logIn(credentials.email, credentials.password, {
		success: onLogin,
		error: function(user, error) {
			parse_signup(credentials.email, credentials.password, onLogin);
		}
});
	}
}

function parse_signup(email, password, onDone)
{
	var user = new Parse.User();
	user.set("username", email);
	user.set("password", password);
	user.set("email", email);

	// other fields can be set just like with Parse.Object
	// user.set("phone", "415-392-0202");

	user.signUp(null, {
	  success: onDone,
	  error: function(user, error) {
	    // Show the error message somewhere and let the user try again.
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
}

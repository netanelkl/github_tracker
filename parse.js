ParseManager = function ParseManager() {

	var credentials = com.tracker.credentials;

	var error_handler = function(error){
		alert("Error: " + error.code + " " + error.message);
	};
	var parse_setup = function(onLoginDone) {
		on_login_done = onLoginDone;
		Parse.initialize(credentials.parse_app_id, credentials.parse_key);
		var currentUser = Parse.User.current();
		if (currentUser) {
			onLoginDone(currentUser);
			// do stuff with the user
		} else {
			Parse.User.logIn(credentials.email, credentials.password, {
				success : onLoginDone,
				error : function(user, error) {
					parse_signup(credentials.email, credentials.password,
							onLoginDone);
				}
			});
		}
	};

	var parse_signup = function(email, password, onDone) {
		var user = new Parse.User();
		user.set("username", email);
		user.set("password", password);
		user.set("email", email);

		// other fields can be set just like with Parse.Object
		// user.set("phone", "415-392-0202");

		user.signUp(null, {
			success : onDone,
			error : error_handler
		});
	};
	
	var Project = Parse.Object.extend("Project", {}, {
		create : function(name, owner) {
			var project = new Project();
			project.set("name", name);
			project.set("owner", owner);
			return project;
		}
	});
	var Issue = Parse.Object.extend("Issue", {}, {
		create : function(id, project) {
			var issue = new Issue();
			issue.set("project", project);
			issue.set("id", id);
			return issue;
		}
	});

	var load_project_issues = function(project_name, owner_name, onDone) {
		var query = new Parse.Query(Issue);
		query.equalTo("project.name", project_name);
		query.equalTo("project.owner", owner_name);
		query.find({
			success : function(issues) {
				onDone(issues);
			},
			error : error_handler
		});
	}
	
	var load_issue = function(project_name, owner_name, id, onDone) {
		var query = new Parse.Query(Issue);
		query.equalTo("project.name", project_name);
		query.equalTo("project.owner", owner_name);
		query.equalTo("id", id);
		query.find({
			success : function(issue) {
				onDone(issue);
			},
			error : error_handler
		});
	}
	return {
		Issue : Issue,
		Project : Project,
		setup : parse_setup,
		load_project_issues : load_project_issues,
		load_issue : load_issue
	};
}();
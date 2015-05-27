GitHubTracker = function() {
	var credentials = com.tracker.credentials;
	var obj = {};
	var on_issues_loaded = function(issues) {
		obj.issues = issues;
	}

	var setup = function(onDone) {
		ParseManager.setup(onDone);
		//GitLoader.setup();
	};

	return {
		content : obj,
		setup : setup
	};
}();

GitHubTracker = function() {
	var credentials = com.tracker.credentials;
	var obj = {};
	var on_issues_loaded = function(issues) {
		obj.issues = issues;
	}

	var setup = function(onDone) {
		ParseManager.setup(function(user) {
			ParseManager.load_project_issues(credentials.project,
					credentials.owner, function(issues) {
				on_issues_loaded(issues);
				onDone();
			});
			GitLoader.setup();
		});
	};
	return {content : obj, setup : setup};
}();

GitHubTracker.setup(function(){
});

$( document ).ready(function() {
	  
	});
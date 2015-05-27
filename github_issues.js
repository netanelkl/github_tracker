GitLoader = function() {
	var project_page = 'https://api.github.com/repos/{owner}/{project}/';
	var token_param = 'access_token={access_token}';
	var issues = 'issues';
	var credentials = com.tracker.credentials;

	var Issues = [];
	// var current_req = URI.expand(project_page +
	// issues).addSearch('access_token',
	// access_token);

	var get_path = function(dir, onReceived) {
		current_req = (project_page + dir + "?" + token_param).replace(
				'{owner}', credentials.owner).replace('{project}',
				credentials.project).replace('{access_token}',
				credentials.access_token);
		return current_req;
	};
	var load_issues = function() {
		get_path(issues, function(arIssues) {
			_.map(arIssues, function(issue) {
				tracker.issues.push(issue.number);
			});
		});
	};
	// alert(current_req);
	var setup = function() {
	}
	return {setup: setup};
}();


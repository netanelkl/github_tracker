function load_issues(tracker) {

}

function setup(tracker) {
	ParseManager.setup(function(user) {
		tracker.issues = [];
		$.get(current_req, function(arIssues) {
			_.map(arIssues, function(issue) {
				tracker.issues.push(issue.number);
			});
		});
	});
}
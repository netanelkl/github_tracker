var credentials = com.tracker.credentials;
var load_github = function() {
	var k33g = new Gh3.User("netanelkl");
	var k33gRepositories = new Gh3.Repositories(k33g);
	k33gRepositories.fetch({}, "next", function(err, res) {
		if (err) {
			throw "outch ..."
		}
		console.log("Repositories", k33gRepositories);
	});
}
var current_issue = {};
var tracker_ready = false;
GitHubTracker.setup(function() {
	ParseManager.load_issue(credentials.project, credentials.owner,
			credentials.issue_id, function(issue) {
				if (issue.length == 0) {
					issue = ParseManager.Issue.create(credentials.project,
							credentials.owner, credentials.issue_id);
				} else {
					issue = issue[0];
				}
				current_issue = issue;
				tracker_ready = true;
				check_all_ready();
			});
});

var load_sidebar_app = function() {
	$.get(chrome.extension.getURL('/issue_template.html'), function(data) {
		$(".discussion-sidebar").prepend(data);
		$(".githubtracker-time-taken").text(current_issue.get_taken());
		$(".githubtracker-time-estimated").text(current_issue.get_estimated());
		// alert(data);
	});
}
var dom_loaded = false;
function check_all_ready() {
	if (tracker_ready && dom_loaded) {
		load_sidebar_app();
	}
}
$(document).ready(function() {
	dom_loaded = true;
	check_all_ready();
});
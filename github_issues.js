
var project_page = 'https://api.github.com/repos/{owner}/{project}/';
var token_param = 'access_token={access_token}';
var issues = 'issues';
var credentials = com.tracker.credentials;
var com = {tracker : {}};
var tracker = com.tracker;

function setup()
{
	parse_setup(function(user)
	{
	tracker.issues = [];
	$.get( current_req, 
		function( arIssues ) {
  			_.map(arIssues, function(issue) 
  			{
				tracker.issues.push(issue.number);
			});
		});
	});
}


function add_issue()
{
	var Issue = Parse.Object.extend("Issue");
	var issueObject = new Issue();
	issueObject
	testObject.save({foo: "bar"});
}

//var current_req = URI.expand(project_page + issues).addSearch('access_token', access_token);
current_req = (project_page + issues + "?" + token_param).
	replace('{owner}', 	credentials.owner).
	replace('{project}', credentials.project).
	replace('{access_token}', credentials.access_token);
//alert(current_req);


setup();
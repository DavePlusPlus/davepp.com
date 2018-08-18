apos.define('console-login', {
	
	construct: function(self, options) {
		
		self.options = options;
		
		self.setLogin = function(strusername, strpassword) {
			return $.post("/clogin", {username: strusername, password: strpassword}).done(function(data) {
					location.reload();
				});
		}
		
		apos.login = self.setLogin;
	
	}
	
});
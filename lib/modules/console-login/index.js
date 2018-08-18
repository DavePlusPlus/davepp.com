module.exports = {
 
	alias: 'clogin',
	
	afterConstruct: function(self) {
		
		self.enableSerializeUsers();
		self.enableDeserializeUsers();
		self.enableLocalStrategy();
		self.enableMiddleware();
		self.addRoutes();
		
	},
	
	construct: function(self, options) {
		
		require('./lib/api.js')(self, options);
		
		self.pushAsset('script', 'always');
		self.apos.push.browserCall('always', 'apos.create("console-login")');
		
		self.modulesReady = function() {
			self.apos.users.addSecret('passwordReset');
		};
		
	}
};
var Passport = require('passport').Passport;
var LocalStrategy = require('passport-local');
var _ = require('@sailshq/lodash');

module.exports = function(self, options) {
	
	self.passport = new Passport();
	
	self.enableSerializeUsers = function() {
		self.passport.serializeUser(function(user, done) {
			done(null, user._id);
		});
	};
	
	self.enableDeserializeUsers = function() {
		self.passport.deserializeUser(self.deserializeUser);
	};
	
	self.deserializeUser = function(id, callback) {
		var req = self.apos.tasks.getReq();
		return self.apos.users.find(req, { _id: id }).toObject(function(err, user) {
			if (err) {
				return callback(err);
			}
			if (!user) {
				return callback(null, null);
			}
			return self.apos.callAll('loginDeserialize', user, function(err) {
				return callback(err, err ? null : user);
			});
		});
	};

	self.loginDeserialize = function(user) {
		user._permissions = {};
		_.each(user._groups, function(group) {
			_.each(group.permissions || [], function(permission) {
				user._permissions[permission] = true;
			});
		});
		_.each(user.permissions || [], function(permission) {
			user._permissions[permission] = true;
		});
		if (user._permissions.admin) {
			user._permissions.edit = true;
		}
		if (user._permissions.edit) {
			user._permissions.guest = true;
		}
		if (_.some(user._permissions, function(val, key) {
			return key.match(/^admin-/);
		})) {
			user._permissions.guest = true;
			user._permissions.edit = true;
		}
	};
	
	self.enableLocalStrategy = function() {
		self.passport.use(new LocalStrategy(self.verifyLogin));
	};
	
	self.verifyLogin = function(username, password, callback) {
		var req = self.apos.tasks.getReq();
		return self.apos.users.find(req, {
			$or: [
				{ username: username },
				{ email: username }
			],
			disabled: { $ne: true }
		}).toObject(function(err, user) {
			if (err) {
				return callback(err);
			}
			if (!user) {
				return setTimeout(function () {
					return callback(null, false);
				}, 1000);
			}
			return self.apos.users.verifyPassword(user, password, function(err) {
				if (err) {
					return setTimeout(function () {
						return callback(null, false);
					}, 1000);
				}
				return callback(err, user);
			});
		});
	};
	
	self.enableMiddleware = function() {
		self.expressMiddleware = [
			self.passport.initialize(),
			self.passport.session(),
			self.addUserToData
		];
	};
	
	self.addUserToData = function(req, res, next) {
		if (req.user) {
			req.data.user = req.user;
			return next();
		} else {
			return next();
		}
	};
	
	self.addRoutes = function() {
	
		self.apos.app.post('/clogin',
			self.passport.authenticate('local', {
				failureRedirect: '/'
			}),
			self.afterLogin
		);
		
		self.apos.app.get('/logout', function(req, res) {
			return req.session.destroy(function(err) {
				if (err) {
					self.apos.utils.error(err);
				}
				res.redirect('/');
			});
		});
	};
	
	self.afterLogin = function(req, res) {
		return self.apos.callAll('loginAfterLogin', req, function(err) {
			if (err) {
				self.apos.utils.error(err);
				return res.redirect('/');
			}
			req.redirect = req.redirect || '/';
			return res.redirect(req.redirect);
		});
	};
	
};
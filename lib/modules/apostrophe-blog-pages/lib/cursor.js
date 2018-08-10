module.exports = {
  construct: function(self, options) {
    self.addFilter('tags', {
      def: null,
	  safeFor: 'public',
	  finalize: function(callback) {
        var tags = self.get('tags');
		
        if (!tags) {
          return setImmediate(callback);
        }
        // Get the request object to pass to `find`
        var req = self.get('req');
        return self.apos.docs.getManager('tags').find(req, {
          tags: tags
        }, {
          _id: 1
        }).toObject(function(err, tags) {
          if (err) {
            return callback(err);
          }
          self.and({ tagsId: tags._id });
          return callback(null);
        });
      },
      launder: function(value) {
        return self.apos.launder.string(value);
      }
    });
  }
};
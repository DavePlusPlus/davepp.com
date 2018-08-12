apos.define('apostrophe-areas', {
  construct: function(self, options) {
    var superEnableCkeditor = self.enableCkeditor;
    self.enableCkeditor = function() {
      superEnableCkeditor();
      // Now do as we please
    };
  }
});
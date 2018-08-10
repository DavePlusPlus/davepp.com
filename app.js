var path = require('path');

var apos = require('apostrophe')({
  shortName: 'app',
  title: 'Dave++',
  baseUrl: 'https://davepp.com',

  // See lib/modules for basic project-level configuration of our modules
  // responsible for serving static assets, managing page templates and
  // configuring user acounts.

  bundles: [ 'apostrophe-blog' ],
  modules: {

    // Apostrophe module configuration

    // Note: most configuration occurs in the respective
    // modules' directories. See lib/apostrophe-assets/index.js for an example.
    
    // However any modules that are not present by default in Apostrophe must at
    // least have a minimal configuration here: `moduleName: {}`

    // If a template is not found somewhere else, serve it from the top-level
    // `views/` folder of the project

	'apostrophe-assets': { minify: true },
	'apostrophe-blog': {
		contextual: true,
		restApi: {
			maxPerPage: 10,
			safeFilters: [ 'slug' ]
		}
	},
	'apostrophe-blog-pages': {},
	'apostrophe-blog-widgets': {},
	'apostrophe-pages': {
		types: [
		  {
			name: 'apostrophe-blog-page',
			label: 'Blog'
		  },
		  {
			name: 'default',
			label: 'Default'
		  },
		  {
			name: 'home',
			label: 'Home'
		  }
		],
		deleteFromTrash: true,
		restApi: {
			maxPerPage: 10,
			safeFilters: [ 'slug' ]
		},
		park: [
        {
          title: 'Search',
          slug: '/search',
          type: 'apostrophe-search',
          label: 'Search',
          published: true
        }
      ]
	},
	'apostrophe-templates': { viewsFolderFallback: path.join(__dirname, 'views') },
	'apostrophe-search': {
		 filters: [
			{
			  name: 'apostrophe-blog',
			  label: 'Articles'
			}
		]
	},
	'two-column-widgets': {},
	'separator-widgets': {},
	'apostrophe-site-map': {
		excludeTypes: []
    },
	'apostrophe-open-graph': {},
	'apostrophe-headless': {}
  }
});

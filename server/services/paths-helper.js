'use strict';

const settings = require('../config/settings');

class PathsHelper {
  constructor() {
    this.generateUrlHelpers(['snippet', 'snippets']);
  }

  snippetPath(snippet) {
    let snippetId = Number.isInteger(snippet) ? snippet : snippet.get('id');
    return `snippets/${snippetId}`;
  }

  snippetsPath() {
    return 'snippets';
  }

  rootUrl(path) {
    return path ? `${ settings.host }/#/${ path }` : settings.host;
  }

  // generates url helpers based on relative path helper and resource name
  // e.g. generateUrlHelpers(['snippet']) generates this.snippetUrl(snippet) based on this.snippetPath(snippet)
  generateUrlHelpers(resources) {
    resources.forEach((pathableResource) => {
      this[`${ pathableResource }Url`] = (resource) => {
        return this.rootUrl(this[`${ pathableResource }Path`].call(this, resource));
      };
    });
  }
}

module.exports = new PathsHelper();

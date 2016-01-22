module.exports = function(shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-pm2')(shipit);
  shipit.initConfig({
    default: {
      pm2: {
        json: '/etc/pm2/conf.d/node-app.json'
      }
    }
    staging: {
      servers: ''
    }
  });
};

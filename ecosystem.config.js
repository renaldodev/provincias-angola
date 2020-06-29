module.exports = {
  apps : [{
    name: "app-provincia",
    script: "./dist/app.js",
    instances: "max",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "StoreService",
      cwd: "/var/www/hardware-store/StoreService",
      script: "npm",
      args: "start",
      node_args: "--max-old-space-size=512",
      watch: false
    },
    {
      name: "StoreUI",
      cwd: "/var/www/hardware-store/StoreUI",
      script: "npm",
      args: "start",
      node_args: "--max-old-space-size=412",
      watch: false
    }
  ]
};

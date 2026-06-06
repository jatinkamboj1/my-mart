// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "StoreService",
      cwd: "/var/www/hardware-store/StoreService",
      script: "pnpm",
      args: "run start",
      node_args: "--max-old-space-size=512",
      watch: false
    },
    {
      name: "StoreUI",
      cwd: "/var/www/hardware-store/StoreUI",
      script: "pnpm",
      args: "run start",
      node_args: "--max-old-space-size=412",
      watch: false
    }
  ]
};

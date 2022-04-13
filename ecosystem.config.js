module.exports = {
  apps: [
    {
      name: 'aiworks_2.0_front_home',
      script: 'npm run dev',
      watch: './src',
      watch_options: { followSymlinks: false, usePolling: true },
      max_memory_restart: '300M',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: 'err.log',
      out_file: 'out.log',
    },
  ],
};

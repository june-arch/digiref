module.exports = {
  apps: [{
    name: 'digiref-api',
    script: 'dist/src/index.js',
    cwd: '/home/ubuntu/projects/Arcson-Development/digiref/backend',
    env: {
      NODE_ENV: 'production',
      PORT: 4002,
      HOST: '0.0.0.0',
      DB_URL: 'postgresql://digiref:digiref123@localhost:5432/digiref',
      TOKEN_SECRET: 'tApmW6O4lKGXpmdSMkvSu2yJFYSFKKs2',
      PUBLIC_HOST: 'digiref.duckdns.org',
      MONITORING_UPLOAD: '/home/ubuntu/monitoring-uploads/',
      TRUPHONE_TOKEN: 'd9b835de2c03ce2d4a8aba692619144e79f5478a',
    }
  }]
};

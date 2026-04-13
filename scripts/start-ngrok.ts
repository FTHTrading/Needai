import ngrok from 'ngrok';

async function main() {
  try {
    const port = process.env.PORT ? Number(process.env.PORT) : 3000;
    const authToken = process.env.NGROK_AUTH_TOKEN || undefined;

    const url = await ngrok.connect({ authtoken: authToken, addr: port });

    console.log('ngrok url:', url);
    console.log('Forwarding to http://localhost:' + port);

    // keep process alive
    process.once('SIGINT', async () => { await ngrok.disconnect(); await ngrok.kill(); process.exit(0); });
  } catch (err: any) {
    console.error('ngrok error:', err?.message || err);
    process.exit(1);
  }
}

main();

import app from './app';
import config from './app/config';

import mongoose from 'mongoose';
import { seedSuperAdmin } from './app/DB';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

   // super admin
    await seedSuperAdmin();

    app.listen(config.port, () => {
      console.log(`app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

import { createApp } from "./app";
import { getConfig } from "./utils/config";

const { PORT } = getConfig();

createApp().then((app) => {
  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });
});

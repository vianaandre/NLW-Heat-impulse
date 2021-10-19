import { port, serverHttp } from "./app";

serverHttp.listen(port, () => console.log(`Server runnign port ${port} 🔥`));
import { port, serverHttp } from "./app";
import 'dotenv/config';

serverHttp.listen(process.env.PORT || port, () => console.log(`Server runnign port ${port} 🔥`));
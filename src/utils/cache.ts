import NodeCache from "node-cache";

// TTL = 600 segundos (10 min)
const cache = new NodeCache({ stdTTL: 600 });

export default cache;

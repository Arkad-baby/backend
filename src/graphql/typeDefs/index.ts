import documentTypeDefs from "./document";
import pageTypeDefs from "./document"


var merge = require('lodash.merge');

const typeDefs = merge({}, documentTypeDefs, pageTypeDefs)

export default typeDefs
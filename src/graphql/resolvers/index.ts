
import documentResolver from './document'
import pageResolver from './document'

var merge = require('lodash.merge');

const resolvers = merge({}, documentResolver, pageResolver)

export default resolvers
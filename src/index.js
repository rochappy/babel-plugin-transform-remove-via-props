const _ = require('lodash');

module.exports = () => {
    return {
        name: "transform-remove-via-props",
        visitor: {
            ObjectProperty(nodePath, state) {
                const parent = nodePath.findParent((path) => path.isCallExpression());
                if ( nodePath.node.key.name === 'props') {
                    if (_.get(parent.node, 'callee.object.name') === 'via' &&
                        _.get(parent.node, 'callee.property.name') === 'register') {
                        nodePath.remove();
                    }
                }
            }
        }
    }
};
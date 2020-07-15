const rdfDereferencer = require("rdf-dereference").default;

/**
 * Fetch a specific data stream and add parameters to list
 * @param url: Url that defines the data stream
 * @returns {Promise<void>}
 */
module.exports = {
    load_properties: async function (url) {
        const features = {}
        const nodes = {}
        const properties = {}
        try {
            const {quads} = await rdfDereferencer.dereference(url)
            quads.on('data', (quad) => {
                if (quad.predicate.value === 'https://www.w3.org/ns/shacl#node') {
                    nodes[quad.object.value] = quad.subject.value
                } else if (quad.predicate.value === 'https://www.w3.org/ns/shacl#property') {
                    properties[quad.object.value] = quad.subject.value
                } else if (quad.predicate.value === 'https://www.w3.org/ns/shacl#path') {
                    features[quad.subject.value] = {'subject': quad.object.value, 'grouped': false}
                }
            })
                .on('end', () => {
                    //remove spinner
                    const feature_values = combine(features, nodes, properties)
                    const result = []
                    for (const feature in feature_values) {
                        result.push({text: feature, value: feature_values[feature]})
                    }
                    return result
                })
        } catch (e) {
            console.error(e)
        }
    }
}

/**
 * Combine nested parameters
 * @param features
 * @param nodes
 * @param properties
 * @returns {{}}: parameter: [URI's defining that parameter]
 */
function combine(features, nodes, properties) {

    const parameter_list = {}
    for (const key in features) {
        // Check if feature is not defining
        if (features[key].grouped === false) {
            let current = key;
            let url_list = [features[current].subject]
            let stop = false
            // See if features can be linked together
            while (!stop) {
                if (current !== key) {
                    features[current].grouped = true
                }
                if (current in properties) {
                    if (properties[current] in nodes) {
                        url_list.push(features[nodes[properties[current]]].subject)
                        current = nodes[properties[current]]
                        continue
                    }
                }
                stop = true
            }
            // Determine show value of a feature
            let value = getShowValue(url_list)
            parameter_list[value] = url_list
        }


    }
    return parameter_list
}

/**
 * Generate a display name for a list of property URI's
 * @param url_list
 * @returns {string}: name for the parameter
 */
function getShowValue(url_list) {
    let returnValue = ""
    // Get parameter from every URI and combine them
    url_list.reverse().forEach(url => {
        const split_token = (url.includes('#')) ? '#' : '/'
        const value = url.split(split_token).pop()
        returnValue = returnValue.concat(value + ' - ')
    })
    return returnValue.substring(0, returnValue.length - 3)
}
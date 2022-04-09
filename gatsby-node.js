const path = require("path")

module.exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions

    if (node.internal.type === "CountriesJson") {
        const slug = node.name.replace(/\s+/g, "-").toLowerCase()

        createNodeField({
            node,
            name: "slug",
            value: slug,
        })
    }
}

module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const countryTemplate = path.resolve("./src/templates/country.tsx")

    const res = await graphql(`
        query {
            allCountriesJson {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `)

    res.data.allCountriesJson.edges.forEach(edge => {
        createPage({
            component: countryTemplate,
            path: `/${edge.node.fields.slug}`,
            context: {
                slug: edge.node.fields.slug,
            },
        })
    })
}

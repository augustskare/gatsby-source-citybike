# gatsby-source-citybike

A [Gatsby](https://www.gatsbyjs.org) source plugin for getting city bike station's from Oslo, Bergen, Trondheim and Edinburgh into your Gatsby application.

## Install

`yarn add gatsby-source-citybike`

or with npm

`npm install gatsby-source-citybike`

## How to use

In your `gatsby-config.js`

```
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-citybike',
      options: {
        cities: ['Oslo', 'Bergen'],
      },
    },
  ]
}
```

### Options

#### cities

Type: `array`<br>
Default: `['oslo']`

Available cities: Oslo, Bergen, Trondheim and Edinburgh.

## How to query

```graphql
query {
  allCitybikeStation {
    edges {
      node {
        name
        lat
        lon
        city
        address
        capacity
        station_id
      }
    }
  }
}
```

### Filter stations by city

```graphql
query {
  allCitybikeStation(filter: { city: { eq: "Oslo" } }) {
    edges {
      node {
        name
        lat
        lon
        address
        capacity
        station_id
      }
    }
  }
}
```

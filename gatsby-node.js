const fetch = require("node-fetch");

exports.sourceNodes = (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const options = {
    cities: configOptions.cities || ["oslo"],
  };

  return Promise.all(options.cities.map(cityToRequest).filter(c => c)).then(
    cities => {
      cities.map(({ city, stations }) => {
        stations.map(s => {
          const station = { ...s, city };
          return actions.createNode(
            Object.assign({}, station, {
              id: createNodeId(`citybike-station-${station.station_id}`),
              parent: null,
              children: [],
              internal: {
                type: "CitybikeStation",
                content: JSON.stringify(station),
                contentDigest: createContentDigest(station),
              },
            })
          );
        });
      });
    }
  );
};

function cityToRequest(city) {
  city = city.toLowerCase();
  const { name, url } = cityToUrl[city] || {};

  if (!url) {
    return undefined;
  }

  return request(name, url);
}

async function request(name, url) {
  const request = await fetch(
    `https://gbfs.urbansharing.com/${url}/station_information.json`,
    {
      headers: {
        "client-name": "gatsby-source-citybike",
      },
    }
  );
  const { data } = await request.json();

  return { stations: data.stations, city: name };
}

const cityToUrl = {
  oslo: { url: "oslobysykkel.no", name: "Oslo" },
  "oslo-winter": { url: "oslovintersykkel.no", name: "Oslo Winter" },
  bergen: { url: "bergenbysykkel.no", name: "Bergen" },
  trondheim: { url: "trondheimbysykkel.no", name: "Trondheim" },
  edinburgh: { url: "edinburghcyclehire.com", name: "Edinburgh" },
};

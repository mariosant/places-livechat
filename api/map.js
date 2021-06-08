const fetch = require("node-fetch");
const { staticMapUrl } = require("static-google-map");
const { URL } = require("url");

const { GOOGLE_API_KEY } = process.env;

const fn = async (request, response) => {
  const { query } = request;
  console.log(query);

  const url = new URL(
    staticMapUrl({
      key: GOOGLE_API_KEY,
      scale: 1,
      zoom: 16,
      size: "256x356",
      format: "png",
      maptype: "roadmap",
      language: "en",
      style: "feature:poi.business|visibility:off",
      markers: [
        {
          location: query.location,
          color: "red",
        },
      ],
    })
  );

  const proxyRes = await fetch(url, {
    method: "get",
    headers: {
      ...request.headers,
      "x-forwarded-host": request.headers.host,
      host: url.host,
    },
    compress: false,
    redirect: "manual",
  });

  response.statusCode = proxyRes.status;

  const headers = proxyRes.headers.raw();
  Object.keys(headers).forEach((key) => response.setHeader(key, headers[key]));

  proxyRes.body.pipe(response);
  proxyRes.body.on("error", (err) => {
    console.error(`Error on proxying url: ${newUrl}`);
    console.error(err.stack);
    response.end();
  });

  request.on("abort", () => {
    proxyRes.body.destroy();
  });
};

module.exports = fn;

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
require('dotenv').config();

const fetch = require('node-fetch');
const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 8005;

app.use(express.static(path.join(__dirname, 'public')));

const Prismic = require('@prismicio/client');
const PrismicH = require('@prismicio/helpers');

// Initialize the prismic.io api
const initApi = (req) => {
  return Prismic.createClient(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req,
    fetch,
  });
};

// Link Resolver
const HandleLinkResolver = (doc) => {
  // Define the url depending on the document type
  //   if (doc.type === 'page') {
  //     return '/page/' + doc.uid;
  //   } else if (doc.type === 'blog_post') {
  //     return '/blog/' + doc.uid;
  //   }

  // Default to homepage
  return '/';
};

// Middleware to inject prismic context
app.use((req, res, next) => {
  res.locals.ctx = {
    endpoint: process.env.PRISMIC_ENDPOINT,
    linkResolver: HandleLinkResolver,
  };
  res.locals.PrismicH = PrismicH;

  next();
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.locals.basedir = app.get('views');

const handleRequest = async (api) => {
  const [meta, home, sunlight, preloader, twilight, midnight, abyss] =
    await Promise.all([
      api.getSingle('metadata'),
      api.getSingle('home'),
      api.getSingle('sunlight'),
      api.getSingle('preloader'),
      api.getSingle('twiligh'),
      api.getSingle('midnigh'),
      api.getSingle('abyss'),
    ]);

  const assets = [];

  home.data.body.forEach((media) => {
    if (media.slice_type === 'intro') {
      assets.push(media.primary.image.url);
    }
    if (media.slice_type === 'content') {
      media.items.forEach((item) => {
        assets.push(item.image.url);
      });
    }
  });

  sunlight.data.body.forEach((media) => {
    const slices = ['highlights', 'content'];
    slices.forEach((slice) => {
      if (media.slice_type === slice) {
        media.items.forEach((item) => {
          assets.push(item.image.url);
        });
      }
      if (media.slice_type === 'informations') {
        assets.push(media.primary.image.url);
      }
    });
  });

  twilight.data.body.forEach((media) => {
    const slices = ['content'];
    slices.forEach((slice) => {
      if (media.slice_type === slice) {
        media.items.forEach((item) => {
          assets.push(item.image.url);
        });
      }
      if (media.slice_type === 'informations') {
        assets.push(media.primary.image.url);
      }
    });
  });

  midnight.data.body.forEach((media) => {
    const slices = ['content', 'informations'];
    slices.forEach((slice) => {
      if (media.slice_type === slice) {
        media.items.forEach((item) => {
          assets.push(item.image.url);
        });
      }
    });
  });

  abyss.data.body.forEach((media) => {
    const slices = ['content'];
    slices.forEach((slice) => {
      if (media.slice_type === slice) {
        media.items.forEach((item) => {
          assets.push(item.image.url);
        });
      }
      if (media.slice_type === 'informations') {
        assets.push(media.primary.image.url);
      }
    });
  });

  return {
    assets,
    meta,
    home,
    sunlight,
    twilight,
    midnight,
    abyss,
    preloader,
  };
};

app.get('/', async (req, res) => {
  const api = await initApi(req);
  const defaults = await handleRequest(api);

  res.render('pages/home', {
    ...defaults,
  });
});

app.get('/sunlight', async (req, res) => {
  const api = await initApi(req);
  const defaults = await handleRequest(api);

  res.render('pages/sunlight', {
    ...defaults,
  });
});

app.get('/twilight', async (req, res) => {
  const api = await initApi(req);
  const defaults = await handleRequest(api);

  res.render('pages/twilight', {
    ...defaults,
  });
});

app.get('/midnight', async (req, res) => {
  const api = await initApi(req);
  const defaults = await handleRequest(api);

  res.render('pages/midnight', {
    ...defaults,
  });
});

app.get('/abyss', async (req, res) => {
  const api = await initApi(req);
  const defaults = await handleRequest(api);

  res.render('pages/abyss', {
    ...defaults,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

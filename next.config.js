/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });
    return config;
  },

  images: {
    domains: [
      "utfs.io",
      "images.unsplash.com",
      "api.microlink.io", // Microlink Image Preview

      "assets.aceternity.com",
      "i.ytimg.com",
      "getwallpapers.com",
      "wallpapers.com",
      "wallpaperswide.com",
      "c4.wallpaperflare.com",
      "img.clerk.com",
      "www.lappui.org",
      "www.baltana.com",
      "i0.wp.com",
      "e0.pxfuel.com",
      "encrypted-tbn0.gstatic.com",
      "www.culture.gouv.fr",
      "images.indianexpress.com",
      "wallpapercave.com",
      "wallpaperbat.com",
      "w0.peakpx.com",
      "aceternity.com",
      "live-production.wcms.abc-cdn.net.au",
      "media.npr.org",
      "worldcrunch.com",
      "media.newyorker.com",
      "steamledge.com",
      "qph.cf2.quoracdn.net",
      "miro.medium.com",
      "archive-images.prod.global.a201836.reutersmedia.net",
      "image.savethechildren.org",
      "borgenproject.org",
      "editorially.org",
      "media.npr.org",
      "i.stci.uk",
    ],
  },
};

module.exports = nextConfig;

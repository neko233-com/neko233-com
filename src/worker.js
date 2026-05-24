export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return Response.json({
        ok: true,
        service: "neko233-com",
        assets: "site",
      });
    }

    return env.ASSETS.fetch(request);
  },
};

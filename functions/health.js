export function onRequest() {
  return Response.json({
    ok: true,
    service: "neko233-com-pages",
    assets: "site",
  });
}

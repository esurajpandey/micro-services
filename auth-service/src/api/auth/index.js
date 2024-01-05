import authRoutes from "./auth.route.js";

export default async function (router) {
    for(const route of authRoutes){
        switch (route.method) {
            case 'GET':
              router.get(route.url, route.handler);
              break;
            case 'POST':
              router.post(route.url, route.handler);
              break;
            case 'PUT':
              router.put(route.url, route.handler);
              break;
            case 'DELETE':
              router.delete(route.url, route.handler);
              break;
        }
    }

    return router;
}

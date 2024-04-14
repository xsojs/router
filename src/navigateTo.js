import Router from "./Router";

function routerTo(path) {
    history.pushState(null, null, path);
    Router.updatePath(path);
}

export default routerTo;
import com from "@xso/com";
import Route from "./Route";

let instance = null;
let currentPath = '/';

const Router = com(function Router({routes}) {
    com.ensureType(routes, Route);

    instance = this;
    
    const refs = routes.map(()=> this.ref());

    this.updatePath = (newPath)=> {
        for (const route of refs) {
            route.current.updatePath(newPath);
        }
    }

    this.view(()=> {
        const view = [];
        for (const [index, route] of routes.entries()) {
            view.push(refs[index].set(route));
        }
        return view;
    });
});

Router.updatePath = (newPath) => {
    currentPath = newPath;
    instance.updatePath(newPath);
}

Router.currentPath = ()=> {
    return currentPath;
}

window.addEventListener("load", function(event) {
    const path = window.location.pathname;
    Router.updatePath(path);
});

window.addEventListener("popstate", function(event) {
    const path = window.location.pathname;
    Router.updatePath(path);
});

export default Router;
import com from "@xso/com";
import Route from "./Route";

let instance = null;
let currentPath = '/';

const changeListeners = [];

const Router = com(function Router({routes, onChange}) {
    com.ensureType(routes, Route);

    instance = this;
    
    const refs = routes.map(()=> this.ref());

    this.updatePath = (newPath)=> {
        for (const route of refs) {
            route.current.updatePath(newPath);
        }
        window.setTimeout(() => {
            onChange && onChange(newPath);
            for (const listener of changeListeners) {
                listener(newPath);
            }
        }, 0);
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

Router.addOnChange = (func)=> {
    changeListeners.push(func);
}

Router.removeOnChange = (func)=> {
    const index = changeListeners.indexOf(func);
    if (index > -1) {
        changeListeners.splice(index, 1);
    }
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
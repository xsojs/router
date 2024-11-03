import com from "@xso/com";

function Route({path, component}) {
    const visible = this.state(false);
    const params = this.state(null);
    this.updatePath = (newPath)=> {
        const newPathParts = newPath.split('/');
        const pathParts = path.split('/');
        let ok = newPathParts.length == pathParts.length;
        if (ok) {
            params.val = {};
            for (const [i, pathPart] of pathParts.entries()) {
                const newPathPart = newPathParts[i];
                let pathParamStart = pathPart.indexOf('{');
                let pathParamEnd = pathPart.indexOf('}');
                if (pathParamStart == 0 && pathParamStart + 1 < pathParamEnd && pathParamEnd == pathPart.length - 1) {
                    params.val[pathPart.substring(pathParamStart + 1, pathParamEnd)] = newPathPart;
                } else if (pathPart != newPathPart) {
                    ok = false;
                    break;
                }
            }
            if (ok) {
                visible.$val = true;
                return;
            }
        }
        params.val = {};
        visible.$val = false;
    };
    this.view(() => {
        if (visible.val) {
            return [
                {
                    [component]: {
                        route: {
                            params: params.val
                        }
                    }
                }
            ]
        }
        return [];
    });
}

export default com(Route);

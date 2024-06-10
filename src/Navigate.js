import com from "@xso/com";
import { navigateTo } from "./main";

function Navigate(props) {
    const {to, top, onClick} = props;
    const elementProps = {...props};
    delete elementProps.to;
    delete elementProps.top;
    delete elementProps.onClick;
    this.view(() => [
        {
            a: {
                onClick: () => {
                    let link = to;
                    let anchor = null;
                    if (to.indexOf('#') >= 0) {
                        link = to.substring(0, to.indexOf('#'));
                        anchor = to.substring(to.indexOf('#') + 1);
                    }
                    navigateTo(link);
                    if (anchor) {
                        window.setTimeout(() => location.hash = "#"+ anchor, 0);
                    }
                    if (top !== false) {
                        window.scrollTo(0, 0);
                    }
                    if (onClick) {
                        onClick();
                    }
                },
                ...elementProps
            }
        }
    ]);
}

export default com(Navigate);

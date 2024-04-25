import com from "@xso/com";
import { navigateTo } from "./main";

function Navigate(props) {
    const {to, top, onClick} = props;
    delete props.to;
    delete props.top;
    delete props.onClick;
    this.view(() => [
        {
            a: {
                onClick: () => {
                    navigateTo(to);
                    if (top !== false) {
                        window.scrollTo(0, 0);
                    }
                    if (onClick) {
                        onClick();
                    }
                },
                ...props
            }
        }
    ]);
}

export default com(Navigate);

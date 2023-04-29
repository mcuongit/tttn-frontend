import { useEffect } from "react";
import { initFacebookSDK } from "./initFacebookSDK";

export default function Comment(props) {
    useEffect(() => {
        initFacebookSDK();
    }, []);

    let { link } = props;
    return (
        <>
            <div
                className="fb-comments"
                data-href={link}
                data-width={"100%"}
                data-numposts={5}
            ></div>
        </>
    );
}

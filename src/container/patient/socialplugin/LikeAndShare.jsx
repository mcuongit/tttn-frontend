import { useEffect } from "react";
import { initFacebookSDK } from "./initFacebookSDK";

export default function LikeAndShare(props) {
    useEffect(() => {
        initFacebookSDK();
    }, []);
    let { link } = props;
    return (
        <>
            <div
                className="fb-like"
                data-href="https://developers.facebook.com/docs/plugins/"
                data-width=""
                data-layout=""
                data-action=""
                data-size=""
                data-share="true"
            ></div>
        </>
    );
}

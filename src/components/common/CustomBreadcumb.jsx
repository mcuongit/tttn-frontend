import { Breadcrumb } from "flowbite-react";
import { Link } from "react-router-dom";

function CustomBreadcumb(props) {
    const { crumbs } = props;
    return (
        <>
            <Breadcrumb>
                {crumbs.map((item, index) => (
                    <Breadcrumb.Item key={index}>
                        {item.link ? (
                            <Link to={item.link}>{item.name}</Link>
                        ) : (
                            item.name
                        )}
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
        </>
    );
}

export default CustomBreadcumb;

import { Link } from "../Link";

const Page404 = () => {
    return (
        <>
            <div>
                <h1>
                    This is NOT Fine
                </h1>
                <img src="https://i.pinimg.com/originals/c0/4a/ae/c04aae1e761928f630eea80459347c2f.gif" alt="this is not fine"></img>
            </div>
            <Link to='/'> Volver a home </Link>
        </>

    );
}

export default Page404;

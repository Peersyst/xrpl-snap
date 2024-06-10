import { useNavigate } from "react-router-dom";

export default function (path?: string): () => void {
    const navigate = useNavigate();

    return () => {
        if (path) navigate(path, { replace: true });
        //Verify not leaving the site
        else if (!window.history?.state || window.history?.state?.idx === 0) navigate("/", { replace: true });
        else navigate(-1);
    };
}

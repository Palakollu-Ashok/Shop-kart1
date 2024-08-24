import { Link } from "react-router-dom";
import pageNotFound from "../static/assets/404.jpg";

const NotFoundPage = () => (
  <div>
    <div className="grid place-items-center place-content-center h-[60vh] gap-3">
      <img src={pageNotFound} alt="empty bag" className="w-[300px]" />

      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <Link to="/" className="border border-primary p-2  hover:duration-500">
        <p>Go to HomePage</p>
      </Link>
    </div>
  </div>
);

export default NotFoundPage;

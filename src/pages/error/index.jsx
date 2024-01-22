import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="m-auto text-white flex flex-col items-center">
      <h1 className="text-[64px] font-extrabold">Oops!</h1>
      <p className="text-[32px]">Sorry, an unexpected error has occurred.</p>

    </div>
  );
}
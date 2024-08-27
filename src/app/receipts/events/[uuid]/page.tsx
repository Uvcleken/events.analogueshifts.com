import Cookies from "js-cookie";
import GuestLayout from "@/components/application/layouts/guest";
import Receipt from "./components/receipt";

export default async function Page({ params }: { params: any }) {
  const token = Cookies.get("analogueshifts");
  const url =
    process.env.NEXT_PUBLIC_BACKEND_URL + "/event/registration/" + params?.uuid;
  const registration = await getRegistration(url, token);
  const register = registration?.data;

  return (
    <GuestLayout>
      {register ? (
        <Receipt register={register} />
      ) : (
        <div className="w-full h-[calc(100vh-80px)] flex justify-center items-center">
          <h1 className="text-primary-boulder900 text-xl font-bold">
            Not Found
          </h1>
        </div>
      )}
    </GuestLayout>
  );
}

const getRegistration = async (url: string, token?: string) => {
  const res = await fetch(url, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });

  if (res.ok) {
    return res.json();
  }
};

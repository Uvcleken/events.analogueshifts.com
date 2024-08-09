import Pricings from "./components/pricings";

export default function Page({ params }: any) {
  return (
    <>
      <Pricings uuid={params.uuid} />
    </>
  );
}

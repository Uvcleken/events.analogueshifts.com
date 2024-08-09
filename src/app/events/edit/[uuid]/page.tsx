import EditPage from "./components/edit-page";

export default function Page({ params }: any) {
  const uuid = params.uuid;

  return <EditPage uuid={uuid} />;
}

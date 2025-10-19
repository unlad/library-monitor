import DefaultLayout from "@/layouts/default";
import { RecordList } from "@/components/RecordList";
import { Selector } from "@/components/Selector";

import { Divider } from "@heroui/divider";
import { useInterceptor } from "@/hooks/interceptor";

const columns = [
  {
    key: "success",
    label: "STATUS",
  },
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "section",
    label: "SECTION",
  },
  {
    key: "email",
    label: "E-MAIL ADDRESS",
  },
  {
    key: "timestamp",
    label: "TIME IN"
  },
  {
    key: "remarks",
    label: "REMARKS"
  }
];

export default function IndexPage() {
  const { ports, path, logs, getPorts, selectPort } = useInterceptor("127.0.0.1:4567")

  return (
    <DefaultLayout>
      <Selector ports={ports} selected={path} getPorts={getPorts} selectPort={selectPort}/>
      <br /><Divider /><br />
      <RecordList columns={columns} logs={logs}/>
    </DefaultLayout>
  );
}

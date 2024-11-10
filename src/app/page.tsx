import CalendarBody from "@/components/CalendarBody";
import CalendarHeader from "@/components/CalendarHeader";
import DutyFilterContainer from "@/components/DutyFilterContainer";
import ReactQueryProvider from "@/query/Provider";

export default function Home() {
  return (
    <ReactQueryProvider>
      <div className="flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
        <DutyFilterContainer />
        <CalendarHeader />
        <CalendarBody />
      </div>
    </ReactQueryProvider>
  );
}

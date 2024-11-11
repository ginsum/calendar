import CalendarBody from "@/components/calendar/CalendarBody";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import DutyFilterContainer from "@/components/dutyFilter/DutyFilterContainer";
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

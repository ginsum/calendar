import CalendarBody from "@/components/CalendarBody";
import CalendarHeader from "@/components/CalendarHeader";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <CalendarHeader />
      <CalendarBody />
    </div>
  );
}

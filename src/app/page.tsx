import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div className="h-screen flex flex-col">
      <div className="h-[60px] shrink-0 flex items-center gap-2">
        <Button>Create Column</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pb-2">
        <div>Column 1</div>
        <div>Column 2</div>
      </div>
    </div>
  );
}

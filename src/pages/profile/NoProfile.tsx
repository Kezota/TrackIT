import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

export default function NoProfile({ title }: { title: string }) {
  return (
    <div className="mb-[150px] flex min-h-[450px] flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Button
        as={Link}
        color="primary"
        href="/login"
        className="relative overflow-visible rounded-lg bg-background/30 bg-primary px-8 shadow-xl after:absolute after:inset-0 after:z-[-1] after:rounded-lg after:bg-background/40 after:transition after:!duration-500 after:content-[''] hover:-translate-y-1 hover:after:scale-150 hover:after:opacity-0"
      >
        Login Now!
      </Button>
    </div>
  );
}

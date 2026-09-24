import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="on-dark adire bg-forest text-ivory">
      <div className="mx-auto max-w-page px-5 py-24 sm:px-8">
        <h1 className="font-display text-[clamp(3rem,9vw,7rem)] font-extrabold leading-none">That page isn't here.</h1>
        <p className="mt-5 max-w-lg text-lg text-ivory/90">The link may be old or mistyped. Try one of these instead.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="gold">Back to the homepage</Button>
          <Button href="/services" variant="ghost-light">See our services</Button>
          <Button href="/contact" variant="ghost-light">Let's Talk Growth</Button>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

interface ImageSectionProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  reverse?: boolean;
}

export default function ImageSection({
  image,
  title,
  description,
  buttonText,
  buttonLink,
  reverse = false,
}: ImageSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">

      <div
        className={`grid items-center gap-12 lg:grid-cols-2 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >

        <div>
          <img
            src={image}
            alt={title}
           className="w-full rounded-3xl border border-zinc-800 object-cover shadow-2xl transition duration-500 hover:scale-[1.02]"
          />
        </div>

        <div>
          <h2 className="text-4xl font-black md:text-5xl">
            {title}
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            {description}
          </p>

          <Link
            href={buttonLink}
            className="mt-8 inline-block rounded-xl bg-orange-500 px-6 py-3 font-medium text-black transition hover:bg-orange-400"
          >
            {buttonText}
          </Link>
        </div>

      </div>

    </section>
  );
}
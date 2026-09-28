import { Instagram } from "lucide-react";

const instagramPosts = [
  {
    image: "/images/home/insta-1.jpg",
    href: "#",
  },
  {
    image: "/images/home/insta-2.jpg",
    href: "#",
  },
  {
    image: "/images/home/insta-3.jpg",
    href: "#",
  },
  {
    image: "/images/home/insta-4.jpg",
    href: "#",
  },
  {
    image: "/images/home/insta-5.jpg",
    href: "#",
  },
  {
    image: "/images/home/insta-6.jpg",
    href: "#",
  },
];

export function InstagramGallery() {
  return (
    <section className="py-8 md:py-12 xl:py-16 bg-muted/30">
      <div className="w-full max-w-390 mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            @aryalsiringems
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-2">
            Shop the Look
          </h2>
          <p className="text-muted-foreground">
            Follow us for daily inspiration
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
          {instagramPosts.map((post, index) => (
            <a
              key={index}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-muted"
            >
              <img
                src={post.image}
                alt="Instagram post"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="w-8 h-8 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://instagram.com/aryalsiringems"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase hover:text-muted-foreground transition-colors"
          >
            <Instagram className="w-4 h-4" />
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

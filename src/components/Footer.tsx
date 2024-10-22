type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type Links = {
  title: string;
  url: string;
};

type ColumnLinks = {
  links: Links[];
};

type SocialMediaLinks = {
  url: string;
  icon: React.ReactNode;
};

type FooterLink = {
  title: string;
  url: string;
};

type Props = {
  logo: ImageProps;
  columnLinks: ColumnLinks[];
  socialMediaLinks: SocialMediaLinks[];
  footerText: string;
  footerLinks: FooterLink[];
};

export type Footer4Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Footer = (props: Footer4Props) => {
  const { footerLinks } = {
    ...Footer4Defaults,
    ...props,
  } as Props;
  return (
    <footer className="mt-auto px-[5%] py-8 md:py-13 lg:px-[10%] lg:py-14">
      <div className="h-px w-[100%] bg-black" />
      <div className="flex flex-col-reverse items-center justify-center justify-items-center pb-4 pt-6 text-sm md:flex-row md:gap-x-6 md:pb-0 md:pt-8">
        <p className="mt-8 md:mt-0">
          © <strong className="text-primary">TrackIT</strong>. All rights
          reserved.
        </p>
        <ul className="grid grid-flow-row grid-cols-[max-content] items-center justify-center justify-items-center gap-x-0 gap-y-4 text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0">
          {footerLinks.map((link, index) => (
            <li
              key={index}
              className="underline decoration-black underline-offset-1"
            >
              <a href={link.url}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export const Footer4Defaults: Footer4Props = {
  footerLinks: [
    { title: "Privacy Policy", url: "#" },
    { title: "Terms of Service", url: "#" },
    { title: "Cookies Settings", url: "#" },
  ],
};

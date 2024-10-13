import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { FlipWords } from "./ui/flip-words";
import heroImage from "../data/images/hero.png";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  buttons: ButtonProps[];
  image: ImageProps;
};

export type Header1Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Header = (props: Header1Props) => {
  const { heading, buttons, image } = {
    ...Header1Defaults,
    ...props,
  } as Props;
  return (
    <section className="page px-[2%] md:px-[6%] lg:px-[8%]">
      <div id="relume" className="px-[5%] py-3 md:py-4 lg:py-1">
        <div className="container">
          <div className="lg:grid-cols-55 grid grid-cols-1 gap-y-8 md:gap-y-16 lg:items-center">
            <div className="order-2 md:order-1 lg:ml-8">
              <h1 className="mb-5 text-3xl font-bold md:mb-6 md:text-6xl lg:text-5xl">
                {heading}
                <div className="flex items-center lg:items-start">
                  <span className="lg:inline-block">—</span>
                  <FlipWords
                    className="lg:inline-block"
                    words={["Track Effortlessly", "Simple, Fast, Reliable"]}
                  />
                </div>
              </h1>
              <p className="md:text-md lg:max-w-[90%]">
                Track attendance with ease and precision using{" "}
                <strong>TrackIT</strong>'s intuitive, user-friendly system.
                Designed for students and lecturers, it simplifies classroom
                management effortlessly, ensuring accurate, reliable records
                every time.
              </p>
              <div className="mt-6 flex gap-x-4 md:mt-8">
                {buttons.map((button, index) => (
                  <Button key={index} {...button}>
                    {button.title}
                  </Button>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img
                src={image.src}
                className="w-full object-cover"
                alt={image.alt}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Header1Defaults: Header1Props = {
  heading: "Smart Attendance System ",
  buttons: [{ title: "Login now!" }],
  image: {
    src: heroImage,
    alt: "Hero image",
  },
};

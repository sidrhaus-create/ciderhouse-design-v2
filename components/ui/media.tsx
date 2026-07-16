import Image from "next/image";

type ImageMediaProps = {
  kind: "image";
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

type VideoMediaProps = {
  kind: "video";
  desktopSrc: string;
  mobileSrc?: string;
  poster: string;
  fallbackText: string;
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
};

export type MediaProps = ImageMediaProps | VideoMediaProps;

export function Media(props: MediaProps) {
  if (props.kind === "image") {
    return (
      <figure className={`media-frame ${props.className ?? ""}`.trim()}>
        <Image
          alt={props.alt}
          height={props.height}
          priority={props.priority}
          sizes={props.sizes}
          src={props.src}
          width={props.width}
        />
      </figure>
    );
  }

  return (
    <figure className={`media-frame ${props.className ?? ""}`.trim()}>
      <video
        aria-label={props.fallbackText}
        autoPlay={props.autoPlay}
        className="media-frame__video"
        loop={props.loop}
        muted
        playsInline
        poster={props.poster}
        preload="metadata"
      >
        {props.mobileSrc ? (
          <source media="(max-width: 767px)" src={props.mobileSrc} />
        ) : null}
        <source src={props.desktopSrc} />
        {props.fallbackText}
      </video>
    </figure>
  );
}

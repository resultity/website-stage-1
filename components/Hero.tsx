import React from 'react';

interface HeroProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  backgroundClassName?: string;
  containerClassName?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgroundClassName = '',
  containerClassName = '',
  children,
  style = {},
}) => {
  return (
    <section className={`hero is-fullheight-with-navbar has-text-centered ${backgroundClassName}`} style={style}>
      <div className={containerClassName}>
        {title && (
          <h1 className="title is-2 has-text-weight-bold mb-2">{title}</h1>
        )}
        {subtitle && (
          <p className="subtitle is-4 has-text-weight-light mb-4">{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  );
};

export default Hero; 